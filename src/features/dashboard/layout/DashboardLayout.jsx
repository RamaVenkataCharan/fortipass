/**
 * FortiPass — Dashboard Layout
 * Scaffold for future dashboard page with grid layout
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}
