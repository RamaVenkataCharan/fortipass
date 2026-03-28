import Providers from '@/app/providers'
import AppRoutes from '@/app/routes'

/**
 * FortiPass — Root Application Component
 * CLEAN: No business logic here. Just providers + routing.
 */
export default function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  )
}
