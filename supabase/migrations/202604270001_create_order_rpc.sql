create or replace function public.create_order_with_items(
  p_items jsonb,
  p_shipping_name text,
  p_shipping_phone text,
  p_shipping_address text,
  p_shipping_city text,
  p_shipping_postal_code text,
  p_courier text,
  p_shipping_cost numeric,
  p_payment_method text
)
returns table (
  order_id uuid,
  order_number text,
  subtotal numeric,
  total numeric
)
language plpgsql
as $$
declare
  v_user_id uuid;
  v_order_number text;
  v_subtotal numeric(12, 2);
  v_total numeric(12, 2);
  v_requested_count int;
  v_matched_count int;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Unauthenticated';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Empty items';
  end if;

  with requested as (
    select
      (item->>'product_slug')::text as product_slug,
      greatest((item->>'quantity')::int, 0) as quantity
    from jsonb_array_elements(p_items) as item
  )
  select count(*) into v_requested_count
  from requested;

  if exists (
    select 1
    from jsonb_array_elements(p_items) as item
    where (item->>'quantity')::int <= 0
  ) then
    raise exception 'Invalid quantity';
  end if;

  with requested as (
    select
      (item->>'product_slug')::text as product_slug,
      greatest((item->>'quantity')::int, 0) as quantity
    from jsonb_array_elements(p_items) as item
  ),
  products as (
    select id, slug, name, price
    from public.products
    where slug in (select product_slug from requested)
      and is_active = true
  ),
  merged as (
    select r.product_slug, r.quantity, p.id as product_id, p.name, p.price
    from requested r
    join products p on p.slug = r.product_slug
  )
  select count(*) into v_matched_count
  from merged;

  if v_matched_count <> v_requested_count then
    raise exception 'Invalid products';
  end if;

  with requested as (
    select
      (item->>'product_slug')::text as product_slug,
      greatest((item->>'quantity')::int, 0) as quantity
    from jsonb_array_elements(p_items) as item
  ),
  products as (
    select id, slug, name, price
    from public.products
    where slug in (select product_slug from requested)
      and is_active = true
  ),
  merged as (
    select r.product_slug, r.quantity, p.id as product_id, p.name, p.price
    from requested r
    join products p on p.slug = r.product_slug
  )
  select sum(m.price * m.quantity) into v_subtotal
  from merged m;

  if v_subtotal is null then
    raise exception 'Subtotal not available';
  end if;

  v_total := v_subtotal + coalesce(p_shipping_cost, 0);

  v_order_number := 'SB-' || to_char(now(), 'YYYYMMDDHH24MISS') || '-' || upper(substr(md5(random()::text), 1, 4));

  insert into public.orders (
    order_number,
    user_id,
    status,
    shipping_name,
    shipping_phone,
    shipping_address,
    shipping_city,
    shipping_postal_code,
    courier,
    shipping_cost,
    subtotal,
    discount,
    total,
    payment_method,
    payment_status
  )
  values (
    v_order_number,
    v_user_id,
    'pending_payment',
    p_shipping_name,
    p_shipping_phone,
    p_shipping_address,
    p_shipping_city,
    p_shipping_postal_code,
    p_courier,
    coalesce(p_shipping_cost, 0),
    v_subtotal,
    0,
    v_total,
    p_payment_method,
    'unpaid'
  )
  returning id into order_id;

  with requested as (
    select
      (item->>'product_slug')::text as product_slug,
      greatest((item->>'quantity')::int, 0) as quantity
    from jsonb_array_elements(p_items) as item
  ),
  products as (
    select id, slug, name, price
    from public.products
    where slug in (select product_slug from requested)
      and is_active = true
  ),
  merged as (
    select r.product_slug, r.quantity, p.id as product_id, p.name, p.price
    from requested r
    join products p on p.slug = r.product_slug
  )
  insert into public.order_items (
    order_id,
    product_id,
    product_name,
    unit_price,
    quantity,
    subtotal
  )
  select
    order_id,
    product_id,
    name,
    price,
    quantity,
    price * quantity
  from merged;

  order_number := v_order_number;
  subtotal := v_subtotal;
  total := v_total;
  return next;
end;
$$;

create or replace function public.confirm_order_paid(
  p_order_number text
)
returns table (
  order_id uuid,
  points_earned int,
  points_balance int
)
language plpgsql
as $$
declare
  v_user_id uuid;
  v_order public.orders%rowtype;
  v_points int;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Unauthenticated';
  end if;

  select *
  into v_order
  from public.orders
  where order_number = p_order_number
    and user_id = v_user_id
  for update;

  if v_order.id is null then
    raise exception 'Order not found';
  end if;

  if v_order.payment_status = 'paid' then
    select coalesce(balance, 0)
    into points_balance
    from public.user_points
    where user_id = v_user_id;

    if points_balance is null then
      points_balance := 0;
    end if;

    order_id := v_order.id;
    points_earned := 0;
    return next;
  end if;

  v_points := floor(v_order.total / 10000);

  update public.orders
  set
    payment_status = 'paid',
    status = 'paid',
    paid_at = timezone('utc', now())
  where id = v_order.id;

  if v_points > 0 then
    insert into public.points_ledger (
      user_id,
      source,
      reference_id,
      points_delta,
      note
    )
    values (
      v_user_id,
      'purchase',
      v_order.id,
      v_points,
      'Pembelian #' || v_order.order_number
    );
  end if;

  select coalesce(balance, 0)
  into points_balance
  from public.user_points
  where user_id = v_user_id;

  if points_balance is null then
    points_balance := 0;
  end if;

  order_id := v_order.id;
  points_earned := v_points;
  return next;
end;
$$;
