import type {
  Product,
  Employee,
  Post,
  KanbanCard,
  DashboardMetric,
  RevenueDataPoint,
  CategoryDataPoint,
  WeeklyDataPoint,
  RecentOrder,
} from '../types'

export const products: Product[] = [
  { id: 'p1', name: 'Pro Laptop 16"', price: 1299, category: 'Electronics', description: 'Powerful laptop for professionals with M3 chip.', rating: 4.8, stock: 12, color: 'from-blue-500 to-indigo-600' },
  { id: 'p2', name: 'Wireless Earbuds', price: 149, category: 'Electronics', description: 'True wireless with 30h battery and ANC.', rating: 4.5, stock: 45, color: 'from-violet-500 to-purple-600' },
  { id: 'p3', name: 'Smart Watch', price: 299, category: 'Electronics', description: 'Health tracking, GPS, and 7-day battery life.', rating: 4.6, stock: 30, color: 'from-cyan-500 to-blue-600' },
  { id: 'p4', name: 'Mechanical Keyboard', price: 129, category: 'Electronics', description: 'RGB backlit with tactile Cherry MX switches.', rating: 4.7, stock: 20, color: 'from-orange-500 to-red-600' },
  { id: 'p5', name: 'Classic White Tee', price: 29, category: 'Clothing', description: '100% organic cotton, relaxed fit.', rating: 4.3, stock: 100, color: 'from-slate-400 to-slate-600' },
  { id: 'p6', name: 'Slim Fit Jeans', price: 79, category: 'Clothing', description: 'Premium denim with stretch comfort.', rating: 4.4, stock: 60, color: 'from-blue-700 to-blue-900' },
  { id: 'p7', name: 'Leather Jacket', price: 249, category: 'Clothing', description: 'Genuine leather, vintage brown finish.', rating: 4.9, stock: 8, color: 'from-amber-700 to-amber-900' },
  { id: 'p8', name: 'Running Shoes', price: 119, category: 'Clothing', description: 'Lightweight with responsive cushioning.', rating: 4.6, stock: 35, color: 'from-green-500 to-emerald-600' },
  { id: 'p9', name: 'Pour-Over Coffee Kit', price: 59, category: 'Home', description: 'Complete kit for the perfect pour-over brew.', rating: 4.5, stock: 25, color: 'from-amber-500 to-orange-600' },
  { id: 'p10', name: 'Minimalist Desk Lamp', price: 89, category: 'Home', description: 'Touch dimmer with warm/cool light modes.', rating: 4.4, stock: 18, color: 'from-yellow-400 to-amber-500' },
  { id: 'p11', name: 'Ergonomic Chair', price: 399, category: 'Home', description: 'Lumbar support with breathable mesh back.', rating: 4.7, stock: 7, color: 'from-teal-500 to-cyan-600' },
  { id: 'p12', name: 'Indoor Monstera Plant', price: 45, category: 'Home', description: 'Large tropical houseplant, easy care.', rating: 4.8, stock: 15, color: 'from-green-600 to-green-800' },
]

const depts = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']
const roles = ['Junior Developer', 'Senior Developer', 'Lead Engineer', 'Product Manager', 'Designer', 'Analyst', 'Director']
const statuses: Employee['status'][] = ['Active', 'Inactive', 'On Leave']
const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sam', 'Tara', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zoe']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Lee', 'Walker']

export const employees: Employee[] = Array.from({ length: 50 }, (_, i) => {
  const first = firstNames[i % firstNames.length]
  const last = lastNames[Math.floor(i / firstNames.length) % lastNames.length]
  const dept = depts[i % depts.length]
  const role = roles[i % roles.length]
  const status = statuses[i % 5 === 0 ? 2 : i % 7 === 0 ? 1 : 0]
  const salary = 50000 + (i % 10) * 8000 + Math.floor(i / 10) * 5000
  const year = 2018 + (i % 6)
  const month = String((i % 12) + 1).padStart(2, '0')
  const day = String((i % 28) + 1).padStart(2, '0')
  return {
    id: `e${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@company.com`,
    department: dept,
    role,
    status,
    salary,
    joinedAt: `${year}-${month}-${day}`,
  }
})

const postColors = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-green-500 to-emerald-600',
  'from-indigo-500 to-violet-600',
  'from-red-500 to-pink-600',
]

export const posts: Post[] = [
  { id: 'post1', title: 'Getting Started with React 19', category: 'Tech', excerpt: 'Explore the new features in React 19 including Actions, transitions, and the new compiler.', content: 'React 19 introduces a number of exciting features that make building user interfaces more intuitive. The new React Compiler automatically optimizes your components, eliminating the need for manual memoization with useMemo and useCallback in most cases.\n\nActions are another major addition — they simplify how you handle async state transitions in forms and mutations. Combined with the new useFormStatus and useFormState hooks, submitting forms has never been cleaner.\n\nThe concurrent rendering improvements in React 19 also mean smoother user experiences, especially for data-heavy applications. Transitions allow you to mark updates as non-urgent, keeping the UI responsive while background work completes.\n\nFinally, improved error handling with ErrorBoundary enhancements and better hydration error messages make debugging much easier in production.', author: 'Alice Smith', readTime: 5, createdAt: '2024-11-15', color: postColors[0] },
  { id: 'post2', title: 'Mastering TailwindCSS v4', category: 'Design', excerpt: 'TailwindCSS v4 rewrites the engine from scratch — faster builds, zero config, and a new CSS-first approach.', content: 'TailwindCSS v4 represents a complete reimagining of how the framework works under the hood. The new Oxide engine, built in Rust, delivers dramatically faster build times — up to 5x faster in many projects.\n\nThe biggest change is the shift to a CSS-first configuration model. Instead of a JavaScript config file, you configure Tailwind directly in your CSS using the @theme directive. This makes the configuration more visible and eliminates the need for a separate config file in many cases.\n\nCustom variants, previously requiring plugin code, can now be defined with a simple @custom-variant directive. Dark mode, reduced motion, and other context-aware styles are easier than ever to implement.\n\nThe framework also ships with built-in support for container queries, making responsive design at the component level straightforward without additional plugins.', author: 'Bob Johnson', readTime: 7, createdAt: '2024-10-28', color: postColors[1] },
  { id: 'post3', title: 'TypeScript Patterns for Large Apps', category: 'Tech', excerpt: 'Proven TypeScript patterns that keep large codebases maintainable and type-safe.', content: 'As TypeScript projects grow, certain patterns become essential for maintaining clarity and correctness. Discriminated unions are one of the most powerful tools — by including a literal type field in each variant, TypeScript can narrow types exhaustively in switch statements.\n\nThe "type-safe event emitter" pattern uses generic constraints to ensure event payloads always match their event names, eliminating entire categories of runtime bugs. Similarly, branded types (using intersections with unique symbols) prevent accidentally passing a UserId where a ProductId is expected.\n\nFor API layer design, combining Zod schemas with TypeScript inference means your runtime validation and compile-time types are always in sync — change the schema, and TypeScript will flag every affected call site.\n\nFinally, the "module augmentation" pattern lets you extend third-party types safely, which is particularly useful when adding metadata to framework objects.', author: 'Carol Williams', readTime: 9, createdAt: '2024-10-10', color: postColors[2] },
  { id: 'post4', title: 'Building a Design System from Scratch', category: 'Design', excerpt: 'Step-by-step guide to creating a scalable component library your whole team can use.', content: 'A design system is more than a component library — it is a shared language between designers and developers. The foundation is a design token system: a set of named values for colors, spacing, typography, and shadows that both Figma and your codebase reference.\n\nStart with primitives: base components like Button, Input, and Text that have no business logic. These should accept all native HTML attributes plus a small set of design-system-specific props. Compound components — patterns like Select + Option, or Form + FormField — come next.\n\nDocumentation is half the work. Storybook remains the gold standard, letting you render components in isolation with interactive controls. Adding accessibility tests and visual regression snapshots catches regressions automatically.\n\nVersioning and release strategy matter as much as the code. Semantic versioning, clear changelogs, and codemods for breaking changes make upgrades painless for consumers.', author: 'David Brown', readTime: 12, createdAt: '2024-09-22', color: postColors[3] },
  { id: 'post5', title: 'State Management in 2025', category: 'Tech', excerpt: 'Comparing Zustand, Jotai, TanStack Query, and React Server Components for modern apps.', content: 'The state management landscape in 2025 looks very different from the Redux era. For most applications, the right answer is a combination of tools rather than one solution for everything.\n\nServer state — data fetched from APIs — is best handled by TanStack Query or SWR. These libraries handle caching, revalidation, background updates, and loading/error states out of the box. Trying to manage server state in a client store like Redux leads to unnecessary complexity.\n\nFor client-side global state (user preferences, shopping cart, UI state), Zustand provides a minimal, boilerplate-free API that scales well. Its selector-based subscriptions ensure components only re-render when their specific slice changes.\n\nJotai takes an atomic approach — instead of one global store, you compose individual atoms. This works especially well with React concurrent features and makes code-splitting state natural.\n\nWith React Server Components, much state that previously lived on the client can move to the server, simplifying everything. The client becomes a thin layer for interactivity rather than a data manager.', author: 'Emma Jones', readTime: 8, createdAt: '2024-09-05', color: postColors[4] },
  { id: 'post6', title: 'Supabase as a Full Backend', category: 'Tech', excerpt: 'Auth, database, storage, real-time, and edge functions — everything you need without a backend team.', content: 'Supabase has matured into a production-ready backend platform that covers most application needs. At its core is PostgreSQL, which means your data model is as powerful as your SQL knowledge allows — no NoSQL workarounds for relational data.\n\nRow Level Security (RLS) moves authorization logic into the database itself. Users can only query rows that policies permit, and this is enforced at the database level regardless of how the client is built. Combine RLS with Supabase Auth for a secure-by-default stack.\n\nReal-time subscriptions are built on PostgreSQL logical replication. Any change to a table can be streamed to connected clients in milliseconds. For features like collaborative editing, live dashboards, or chat, this eliminates the need for a separate WebSocket server.\n\nEdge Functions bring server-side logic close to users without managing infrastructure. Written in TypeScript and deployed globally on Deno Deploy, they are ideal for webhooks, scheduled tasks, and API proxying.', author: 'Frank Garcia', readTime: 10, createdAt: '2024-08-18', color: postColors[5] },
  { id: 'post7', title: 'Accessibility in Modern React', category: 'Design', excerpt: 'Practical guide to building inclusive interfaces — beyond just adding aria-label.', content: 'Accessibility is not an afterthought — it is a fundamental quality of well-built software. The starting point is semantic HTML: using <button> for buttons, <nav> for navigation, and heading levels in logical order. Semantic elements carry implicit ARIA roles that screen readers understand without extra attributes.\n\nFocus management is critical for dynamic interfaces. When a modal opens, focus should move inside it. When it closes, focus should return to the trigger element. The useRef and useEffect combination in React makes this straightforward, but libraries like Radix UI handle it automatically.\n\nColor contrast ratios matter more than aesthetics. WCAG 2.1 AA requires 4.5:1 for normal text and 3:1 for large text. Tools like the axe DevTools browser extension catch contrast failures before they ship.\n\nKeyboard navigation testing is essential — tab through every interactive element and ensure you can reach, activate, and escape every control without a mouse. This also catches logical focus order issues that users of linear navigation experience.', author: 'Grace Miller', readTime: 6, createdAt: '2024-08-02', color: postColors[6] },
  { id: 'post8', title: 'Vite: The Build Tool Revolution', category: 'Tech', excerpt: 'Why Vite has become the default choice for modern web development.', content: 'Vite transformed front-end development by rethinking the dev server from first principles. Instead of bundling your entire application on startup, Vite serves source files directly as ES modules and only transforms files as the browser requests them. This means dev server startup is nearly instant regardless of project size.\n\nIn production, Vite uses Rollup for bundling, which produces optimized, tree-shaken output. The plugin ecosystem is broad and compatible — most Rollup plugins work in Vite without modification.\n\nVite\'s HMR (Hot Module Replacement) is significantly faster than Webpack\'s because it only updates the modules that changed. React component state is often preserved across hot updates, making the development experience feel like live editing.\n\nWith Vite 5 and 6, the team has focused on performance improvements, better error messages, and expanded framework support. The Vite plugin for React uses the new SWC-based transformer for even faster refresh times.', author: 'Henry Davis', readTime: 5, createdAt: '2024-07-14', color: postColors[7] },
  { id: 'post9', title: 'CSS Grid vs Flexbox: When to Use What', category: 'Design', excerpt: 'A practical decision guide for choosing the right layout tool for every situation.', content: 'The "Grid vs Flexbox" debate often misses the point — these tools solve different problems and work best together. Understanding when to reach for each eliminates the confusion.\n\nFlexbox is a one-dimensional layout tool. It distributes space along a single axis — either a row or a column. It excels at aligning items within a container, handling variable-size content, and building components like navigation bars, button groups, and card headers.\n\nCSS Grid is two-dimensional. It manages both rows and columns simultaneously, making it ideal for page-level layouts, image galleries, and any scenario where items need to align across both axes. Named grid areas make complex layouts readable and easy to modify.\n\nA practical rule: if you\'re thinking about the relationships between items in a single line, use Flexbox. If you\'re thinking about the layout of a region with both rows and columns, use Grid. Most complex UIs use both — Grid for the macro layout, Flexbox inside the grid cells.', author: 'Iris Wilson', readTime: 7, createdAt: '2024-06-30', color: postColors[8] },
  { id: 'post10', title: 'Optimizing React Performance', category: 'Tech', excerpt: 'Profile first, then optimize — practical techniques for actually slow React apps.', content: 'The most important rule of React performance optimization is: measure before you change anything. The React DevTools Profiler shows exactly which components render, how long they take, and what triggered the render. Without this data, optimization is guesswork.\n\nThe most common real-world performance issues are unnecessary re-renders caused by unstable references. Creating objects, arrays, or functions inline in JSX creates a new reference on every render, causing child components to re-render even when the data has not changed. useMemo and useCallback stabilize these references, but should only be applied where the Profiler shows an actual problem.\n\nFor large lists, virtualization is transformative. react-window or TanStack Virtual render only the visible portion of a list, making 10,000-row tables feel instant. This is almost always faster than memoization for list performance.\n\nCode splitting with React.lazy and Suspense keeps initial bundle size small. Routes are the natural split points — each route imports only the code it needs, and users only download the JavaScript for pages they visit.', author: 'Jack Moore', readTime: 11, createdAt: '2024-06-12', color: postColors[9] },
]

export const kanbanCards: KanbanCard[] = [
  { id: 'k1', title: 'Design new onboarding flow', column: 'todo', priority: 'High', tag: 'Design', position: 0 },
  { id: 'k2', title: 'Write unit tests for auth module', column: 'todo', priority: 'Medium', tag: 'Testing', position: 1 },
  { id: 'k3', title: 'Update API documentation', column: 'todo', priority: 'Low', tag: 'Docs', position: 2 },
  { id: 'k4', title: 'Fix mobile nav overflow bug', column: 'todo', priority: 'High', tag: 'Bug', position: 3 },
  { id: 'k5', title: 'Add CSV export feature', column: 'todo', priority: 'Medium', tag: 'Feature', position: 4 },
  { id: 'k6', title: 'Implement dark mode', column: 'in_progress', priority: 'High', tag: 'Feature', position: 0 },
  { id: 'k7', title: 'Migrate to TanStack Query v5', column: 'in_progress', priority: 'Medium', tag: 'Refactor', position: 1 },
  { id: 'k8', title: 'Performance audit with Lighthouse', column: 'in_progress', priority: 'Medium', tag: 'Performance', position: 2 },
  { id: 'k9', title: 'Set up CI/CD pipeline', column: 'in_progress', priority: 'High', tag: 'DevOps', position: 3 },
  { id: 'k10', title: 'Design token system', column: 'in_progress', priority: 'Low', tag: 'Design', position: 4 },
  { id: 'k11', title: 'User research interviews', column: 'done', priority: 'High', tag: 'Research', position: 0 },
  { id: 'k12', title: 'Figma component library', column: 'done', priority: 'High', tag: 'Design', position: 1 },
  { id: 'k13', title: 'Database schema design', column: 'done', priority: 'Medium', tag: 'Backend', position: 2 },
  { id: 'k14', title: 'Landing page copy', column: 'done', priority: 'Low', tag: 'Content', position: 3 },
  { id: 'k15', title: 'Set up Supabase project', column: 'done', priority: 'High', tag: 'Backend', position: 4 },
]

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total Revenue', value: '$47,820', change: '+12.5%', positive: true, icon: 'dollar' },
  { label: 'Total Users', value: '3,248', change: '+8.2%', positive: true, icon: 'users' },
  { label: 'Total Orders', value: '1,893', change: '+5.1%', positive: true, icon: 'shopping' },
  { label: 'Avg Order Value', value: '$89.50', change: '-2.3%', positive: false, icon: 'chart' },
]

export const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 32000, orders: 980 },
  { month: 'Feb', revenue: 28500, orders: 856 },
  { month: 'Mar', revenue: 38200, orders: 1120 },
  { month: 'Apr', revenue: 41000, orders: 1230 },
  { month: 'May', revenue: 44500, orders: 1380 },
  { month: 'Jun', revenue: 47820, orders: 1500 },
]

export const categoryData: CategoryDataPoint[] = [
  { name: 'Electronics', value: 35, color: '#6366f1' },
  { name: 'Clothing', value: 25, color: '#8b5cf6' },
  { name: 'Home', value: 20, color: '#06b6d4' },
  { name: 'Food', value: 12, color: '#10b981' },
  { name: 'Other', value: 8, color: '#f59e0b' },
]

export const weeklyData: WeeklyDataPoint[] = [
  { day: 'Mon', orders: 245 },
  { day: 'Tue', orders: 310 },
  { day: 'Wed', orders: 280 },
  { day: 'Thu', orders: 390 },
  { day: 'Fri', orders: 420 },
  { day: 'Sat', orders: 180 },
  { day: 'Sun', orders: 68 },
]

export const recentOrders: RecentOrder[] = [
  { id: 'ord-001', customer: 'Alice Smith', product: 'Pro Laptop 16"', amount: 1299, status: 'Completed', date: '2024-06-14' },
  { id: 'ord-002', customer: 'Bob Johnson', product: 'Wireless Earbuds', amount: 149, status: 'Pending', date: '2024-06-14' },
  { id: 'ord-003', customer: 'Carol Williams', product: 'Ergonomic Chair', amount: 399, status: 'Completed', date: '2024-06-13' },
  { id: 'ord-004', customer: 'David Brown', product: 'Leather Jacket', amount: 249, status: 'Cancelled', date: '2024-06-13' },
  { id: 'ord-005', customer: 'Emma Jones', product: 'Smart Watch', amount: 299, status: 'Completed', date: '2024-06-12' },
]
