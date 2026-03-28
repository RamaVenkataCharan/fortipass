/**
 * FortiPass — Dashboard Stats Card
 * Scaffold for future dashboard analytics
 */
export default function StatsCard({ title, value, icon, trend }) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-center gap-3">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xs text-slate-400 uppercase tracking-widest">{title}</span>
        <span className="text-xl font-bold text-slate-100">{value}</span>
        {trend && (
          <span className={`text-xs ${trend > 0 ? 'text-primary' : 'text-danger'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  )
}
