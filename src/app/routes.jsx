import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Analyzer from '@/pages/Analyzer'
import Settings from '@/pages/Settings'

/**
 * App Routes — React Router configuration
 * All routes wrapped in MainLayout for consistent chrome
 */
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Analyzer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
