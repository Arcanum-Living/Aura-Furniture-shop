import type { ReactNode } from "react";
import { AdminProvider } from "@/context/AdminContext";
// import AdminSidebar / AdminTopbar here once you copy those components over

// This layout wraps every route under /admin (all pages below use "use client"
// because they rely on useState/useEffect/context — this file itself can stay
// a Server Component).
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0F0F0E]">
        {/* <AdminSidebar /> <AdminTopbar /> go here, same as your old admin shell */}
        <main className="p-6">{children}</main>
      </div>
    </AdminProvider>
  );
}
