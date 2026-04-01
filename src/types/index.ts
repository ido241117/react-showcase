export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  rating: number
  stock: number
  color: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: 'Active' | 'Inactive' | 'On Leave'
  salary: number
  joinedAt: string
}

export interface Post {
  id: string
  title: string
  content: string
  category: string
  excerpt: string
  readTime: number
  author: string
  createdAt: string
  color: string
}

export interface KanbanCard {
  id: string
  title: string
  column: 'todo' | 'in_progress' | 'done'
  priority: 'High' | 'Medium' | 'Low'
  tag: string
  position: number
}

export interface Message {
  id: string
  user_id: string
  username: string
  content: string
  created_at: string
}

export interface DashboardMetric {
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  orders: number
}

export interface CategoryDataPoint {
  name: string
  value: number
  color: string
}

export interface WeeklyDataPoint {
  day: string
  orders: number
}

export interface RecentOrder {
  id: string
  customer: string
  product: string
  amount: number
  status: 'Completed' | 'Pending' | 'Cancelled'
  date: string
}
