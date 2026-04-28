insert into public.categories (name, slug, type, description)
values
  ('Board Game', 'board-game', 'subject', 'Permainan papan edukatif untuk keluarga'),
  ('Buku Edukatif', 'buku-edukatif', 'subject', 'Buku belajar interaktif untuk anak'),
  ('Strategi', 'strategi', 'subject', 'Kategori permainan strategi dan logika')
on conflict (slug) do update
set name = excluded.name,
    type = excluded.type,
    description = excluded.description;

insert into public.products (
  name,
  slug,
  tagline,
  description,
  price,
  discount_price,
  weight_gram,
  stock,
  is_published,
  is_featured
)
values (
  'Ruang Angkasa Matematika',
  'ruang-angkasa-matematika',
  'Belajar numerasi lewat misi antariksa',
  'Board game tematik untuk melatih numerasi, strategi, dan kolaborasi anak.',
  169000,
  199000,
  500,
  120,
  true,
  true
)
on conflict (slug) do update
set name = excluded.name,
    tagline = excluded.tagline,
    description = excluded.description,
    price = excluded.price,
    discount_price = excluded.discount_price,
    weight_gram = excluded.weight_gram,
    stock = excluded.stock,
    is_published = excluded.is_published,
    is_featured = excluded.is_featured;

insert into public.blog_posts (
  slug,
  title,
  excerpt,
  content,
  cover_image,
  author,
  is_published,
  published_at
)
values (
  'mengapa-board-game-penting',
  'Mengapa Board Game Penting untuk Anak?',
  'Board game membantu pengembangan logika, sosial, dan fokus anak.',
  '## Mengapa penting?\nBoard game mendorong interaksi, konsentrasi, dan kemampuan problem solving anak.',
  '/images/blog/cover-placeholder.webp',
  'Sebangku Store',
  true,
  timezone('utc', now())
)
on conflict (slug) do update
set title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content,
    cover_image = excluded.cover_image,
    author = excluded.author,
    is_published = excluded.is_published,
    published_at = excluded.published_at;

insert into public.rewards (name, description, points_cost, stock, is_active, created_at, updated_at)
values
  ('Voucher Ongkir 10rb', 'Voucher potongan ongkir sebesar Rp10.000', 80, 1000, true, timezone('utc', now()), timezone('utc', now())),
  ('Diskon Produk 20rb', 'Potongan langsung Rp20.000 untuk pembelian berikutnya', 150, 500, true, timezone('utc', now()), timezone('utc', now()))
on conflict do nothing;

insert into public.badges (code, name, description, points_bonus, rule, created_at)
values
  ('FIRST_PURCHASE', 'Pembeli Pertama', 'Berhasil melakukan pembelian pertama', 10, '{}'::jsonb, timezone('utc', now())),
  ('LOYAL_LEARNER', 'Loyal Learner', 'Melakukan 5 transaksi edukatif', 25, '{}'::jsonb, timezone('utc', now()))
on conflict (code) do update
set name = excluded.name,
    description = excluded.description,
    points_bonus = excluded.points_bonus,
    rule = excluded.rule;
