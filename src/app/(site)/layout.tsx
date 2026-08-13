'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { QuickViewModal } from '@/components/shop/QuickViewModal'
import { SearchOverlay } from '@/components/shop/SearchOverlay'
import { ToastNotification } from '@/components/ui/ToastNotification'
import { GlobalLoader } from '@/components/ui/GlobalLoader'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalLoader />
      <Navbar />
      <MobileMenu />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <ToastNotification />
    </>
  )
}