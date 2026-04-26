-- Testimonials
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  text text not null,
  stars int default 5,
  tag text default 'Project',
  visible boolean default true,
  created_at timestamptz default now()
);

-- Services
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  icon text default '🔧',
  title_id text not null,
  title_en text not null,
  desc_id text not null,
  desc_en text not null,
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Projects / Gallery
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  link text,
  tags text[],
  visible boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS
alter table testimonials enable row level security;
alter table services enable row level security;
alter table projects enable row level security;

-- Drop existing policies if any
drop policy if exists "public read testimonials" on testimonials;
drop policy if exists "public read services" on services;
drop policy if exists "public read projects" on projects;
drop policy if exists "anon all testimonials" on testimonials;
drop policy if exists "anon all services" on services;
drop policy if exists "anon all projects" on projects;

-- Allow anon to read/write all (admin uses anon key with server-side auth)
create policy "anon all testimonials" on testimonials for all to anon using (true) with check (true);
create policy "anon all services" on services for all to anon using (true) with check (true);
create policy "anon all projects" on projects for all to anon using (true) with check (true);

-- Seed services (run only once)
insert into services (icon, title_id, title_en, desc_id, desc_en, sort_order) values
('🌐', 'Web Development', 'Web Development', 'Landing page, company profile, dashboard, full-stack app. Semua bisa.', 'Landing page, company profile, dashboard, full-stack app. All covered.', 1),
('📱', 'Mobile App', 'Mobile App', 'Flutter atau React Native, dari UI sampai integrasi API.', 'Flutter or React Native, from UI to API integration.', 2),
('🎓', 'Tugas Kuliah', 'College Assignments', 'Deadline mepet? Tenang. Semua mata kuliah programming bisa dihandle.', 'Tight deadline? No worries. All programming courses covered.', 3),
('📄', 'Skripsi / Thesis', 'Thesis', 'Sistem informasi, website, aplikasi — lengkap dengan dokumentasi.', 'Information systems, websites, apps — complete with documentation.', 4),
('🔌', 'API Integration', 'API Integration', 'REST API, GraphQL, third-party services. Integrasi beres.', 'REST API, GraphQL, third-party services. Integration done.', 5),
('🎨', 'UI/UX Implementation', 'UI/UX Implementation', 'Figma to code, pixel perfect, responsive, dan clean.', 'Figma to code, pixel perfect, responsive, and clean.', 6)
on conflict do nothing;

-- Seed testimonials (run only once)
insert into testimonials (name, role, text, stars, tag) values
('Andi Pratama', 'Mahasiswa Teknik Informatika', 'Gila cepet banget, deadline 2 hari langsung beres. Kodenya rapi dan ada penjelasannya juga. Recommended banget!', 5, 'Tugas Kuliah'),
('Siti Rahayu', 'Mahasiswa Sistem Informasi', 'Skripsi gue yang udah stuck berbulan-bulan akhirnya kelar. Raden sabar banget ngejelasin alur sistemnya. 10/10.', 5, 'Skripsi'),
('Budi Santoso', 'Startup Founder', 'Landing page-nya keren abis, persis kayak yang gue mau. Komunikasinya juga enak, nggak ribet. Pasti balik lagi.', 5, 'Web Dev'),
('Dewi Lestari', 'Freelancer', 'Minta integrasi payment gateway, beres dalam sehari. Nggak ada drama, langsung jalan. Mantap.', 5, 'API Integration'),
('Rizky Firmansyah', 'Mahasiswa D3 Komputer', 'Udah coba beberapa joki lain, tapi yang ini beda. Hasilnya beneran bisa dipahami, bukan asal jadi.', 5, 'Mobile App')
on conflict do nothing;
