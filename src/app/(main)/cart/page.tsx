import Cart from '@/components/cart/Cart'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.session) {
    redirect('/login?redirectTo=/cart')
  }

  return <Cart />
}
