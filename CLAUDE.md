# React Showcase Portfolio — Project Spec

## Mục tiêu
Một React app deploy trên Vercel, dùng như portfolio kỹ thuật thể hiện các UI pattern khác nhau mà tác giả có thể làm. Link có thể chia sẻ được cho nhà tuyển dụng.

---

## Tech Stack

| Layer | Công nghệ |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Routing | React Router v6 |
| Styling | TailwindCSS + shadcn/ui |
| Server state | TanStack Query (React Query) |
| Client state | Zustand |
| Backend / Auth | Supabase (Auth thật, Database, Realtime) |
| Charts | Recharts |
| Drag & Drop | @dnd-kit |
| Forms | react-hook-form + zod |
| Table | TanStack Table |
| Deploy | Vercel (connect GitHub repo) |

---

## Danh sách trang (10 trang)

| Route | Trang | Kỹ thuật nổi bật |
|---|---|---|
| `/` | Landing page | Hero section, feature list, CTA |
| `/dashboard` | Analytics Dashboard | Recharts, KPI cards, skeleton loading |
| `/shop` | E-commerce Shop | Filter, search, debounce, Zustand cart |
| `/kanban` | Kanban Board | @dnd-kit drag & drop |
| `/form-wizard` | Multi-step Form | react-hook-form + zod, step state |
| `/data-table` | Data Table | TanStack Table, sort, filter, pagination |
| `/chat` | Chat UI | Supabase Realtime subscriptions |
| `/auth` | Auth Flow | Supabase Auth, login/register/logout |
| `/blog` | Blog | Listing + detail page, TanStack Query |
| `/settings` | Settings | Dark/light theme (Zustand), profile UI |

---

## Cấu trúc thư mục

```
src/
  components/
    ui/           ← shadcn/ui components
    layout/       ← Sidebar, Header, Layout wrapper
  pages/
    Landing.tsx
    Dashboard.tsx
    Shop.tsx
    Kanban.tsx
    FormWizard.tsx
    DataTable.tsx
    Chat.tsx
    Auth.tsx
    Blog.tsx
    Settings.tsx
  stores/
    cartStore.ts  ← Zustand: giỏ hàng
    themeStore.ts ← Zustand: dark/light mode
  hooks/
    useAuth.ts    ← Supabase Auth hook
  lib/
    supabase.ts   ← Supabase client
    queryClient.ts
  types/
    index.ts
```

---

## Supabase — Bảng cần tạo

```sql
-- Blog posts (mock data seed)
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  category text,
  created_at timestamptz default now()
);

-- Chat messages (Realtime)
create table messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  username text,
  content text not null,
  created_at timestamptz default now()
);

-- Kanban cards
create table kanban_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  column text not null, -- 'todo' | 'in_progress' | 'done'
  position int,
  created_at timestamptz default now()
);
```

---

## Environment Variables

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Lưu trong `.env.local` (không commit). Thêm vào Vercel Environment Variables khi deploy.

---

## Layout chung

- Sidebar navigation cố định bên trái (trên desktop)
- Header với avatar + theme toggle
- Tất cả trang đều wrap trong `<Layout>` component
- Trang `/auth` và `/` không có sidebar

---

## Quy tắc code

- Dùng TypeScript strict mode
- Không dùng `any`
- Mỗi page là một file riêng trong `src/pages/`
- Mock data đặt trong `src/lib/mockData.ts` nếu không có Supabase data
