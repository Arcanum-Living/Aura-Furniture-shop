"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import type { ReactNode } from "react";

export default function AdminRouteLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
