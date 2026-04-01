import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Shop from './pages/Shop'
import Kanban from './pages/Kanban'
import FormWizard from './pages/FormWizard'
import DataTable from './pages/DataTable'
import Chat from './pages/Chat'
import Auth from './pages/Auth'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/form-wizard" element={<FormWizard />} />
        <Route path="/data-table" element={<DataTable />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
