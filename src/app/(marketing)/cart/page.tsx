import Cart from '@/modules/cart/components/Cart'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/infrastructure/auth/auth'

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.session) {
    redirect('/login?redirectTo=/cart')
  }

  return <Cart />
}
