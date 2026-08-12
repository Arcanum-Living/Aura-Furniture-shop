'use client'
import { ToastNotification } from '../../components/ui/ToastNotification'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastNotification />
    </>
  )
}