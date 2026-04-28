create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories (id) on delete set null,
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2) check (compare_at_price >= 0),
  stock int not null default 0 check (stock >= 0),
  min_age int,
  max_age int,
  subject text,
  duration_minutes int,
  players_min int,
  players_max int,
  badge text,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_education_values (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  title text not null,
  description text,
  icon text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users (id) on delete set null,
  slug text not null unique,
  title text not null,
  excerpt text,
  content_md text not null,
  cover_url text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percent', 'fixed', 'free_shipping')),
  discount_value numeric(12,2) not null default 0,
  min_purchase numeric(12,2) not null default 0,
  max_discount numeric(12,2),
  quota int,
  used_count int not null default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users (id) on delete restrict,
  status text not null default 'pending_payment' check (status in ('pending_payment', 'paid', 'processing', 'shipped', 'completed', 'cancelled')),
  shipping_name text not null,
  shipping_phone text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal_code text not null,
  courier text,
  shipping_service text,
  shipping_cost numeric(12,2) not null default 0,
  subtotal numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  voucher_id uuid references public.vouchers (id) on delete set null,
  payment_method text,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'failed', 'refunded')),
  paid_at timestamptz,
  midtrans_snap_token text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_name text not null,
  unit_price numeric(12,2) not null,
  quantity int not null check (quantity > 0),
  subtotal numeric(12,2) not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_points (
  user_id uuid primary key references auth.users (id) on delete cascade,
  balance int not null default 0,
  total_earned int not null default 0,
  total_spent int not null default 0,
  level int not null default 1,
  streak int not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source text not null check (source in ('purchase', 'redeem', 'bonus', 'admin_adjustment')),
  reference_id uuid,
  points_delta int not null,
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  points_cost int not null check (points_cost > 0),
  stock int,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  reward_id uuid not null references public.rewards (id) on delete restrict,
  points_spent int not null check (points_spent > 0),
  status text not null default 'requested' check (status in ('requested', 'approved', 'fulfilled', 'rejected')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  icon_url text,
  points_bonus int not null default 0,
  rule jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id uuid not null references public.badges (id) on delete cascade,
  awarded_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, badge_id)
);

create index if not exists idx_products_category_id on public.products (category_id);
create index if not exists idx_products_is_active on public.products (is_active);
create index if not exists idx_orders_user_id on public.orders (user_id);
create index if not exists idx_orders_status on public.orders (status);
create index if not exists idx_order_items_order_id on public.order_items (order_id);
create index if not exists idx_blog_posts_is_published on public.blog_posts (is_published);
create index if not exists idx_blog_posts_published_at on public.blog_posts (published_at desc);
create index if not exists idx_points_ledger_user_id on public.points_ledger (user_id);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger trg_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create trigger trg_vouchers_updated_at
before update on public.vouchers
for each row execute function public.set_updated_at();

create trigger trg_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create trigger trg_user_points_updated_at
before update on public.user_points
for each row execute function public.set_updated_at();

create trigger trg_rewards_updated_at
before update on public.rewards
for each row execute function public.set_updated_at();

create trigger trg_reward_redemptions_updated_at
before update on public.reward_redemptions
for each row execute function public.set_updated_at();

create or replace function public.apply_points_ledger()
returns trigger
language plpgsql
as $$
begin
  insert into public.user_points (user_id, balance, total_earned, total_spent)
  values (
    new.user_id,
    new.points_delta,
    case when new.points_delta > 0 then new.points_delta else 0 end,
    case when new.points_delta < 0 then abs(new.points_delta) else 0 end
  )
  on conflict (user_id)
  do update set
    balance = public.user_points.balance + new.points_delta,
    total_earned = public.user_points.total_earned + case when new.points_delta > 0 then new.points_delta else 0 end,
    total_spent = public.user_points.total_spent + case when new.points_delta < 0 then abs(new.points_delta) else 0 end,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

create trigger trg_points_ledger_apply
after insert on public.points_ledger
for each row execute function public.apply_points_ledger();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_media enable row level security;
alter table public.product_education_values enable row level security;
alter table public.blog_posts enable row level security;
alter table public.vouchers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.user_points enable row level security;
alter table public.points_ledger enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_redemptions enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "categories_public_read" on public.categories
for select using (true);

create policy "products_public_read" on public.products
for select using (is_active = true);

create policy "product_media_public_read" on public.product_media
for select using (true);

create policy "product_edu_values_public_read" on public.product_education_values
for select using (true);

create policy "blog_posts_public_read" on public.blog_posts
for select using (is_published = true);

create policy "vouchers_public_read_active" on public.vouchers
for select using (is_active = true);

create policy "orders_select_own" on public.orders
for select using (auth.uid() = user_id);

create policy "orders_insert_own" on public.orders
for insert with check (auth.uid() = user_id);

create policy "orders_update_own" on public.orders
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "order_items_select_own" on public.order_items
for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and o.user_id = auth.uid()
  )
);

create policy "order_items_insert_own" on public.order_items
for insert with check (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and o.user_id = auth.uid()
  )
);

create policy "user_points_select_own" on public.user_points
for select using (auth.uid() = user_id);

create policy "points_ledger_select_own" on public.points_ledger
for select using (auth.uid() = user_id);

create policy "rewards_public_read" on public.rewards
for select using (is_active = true);

create policy "reward_redemptions_select_own" on public.reward_redemptions
for select using (auth.uid() = user_id);

create policy "reward_redemptions_insert_own" on public.reward_redemptions
for insert with check (auth.uid() = user_id);

create policy "badges_public_read" on public.badges
for select using (true);

create policy "user_badges_select_own" on public.user_badges
for select using (auth.uid() = user_id);
