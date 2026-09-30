import { notFound } from 'next/navigation';
import { initialOrders } from '@/data/adminMockData';
import AdminOrderDetailPage from "../_detail/OrderDetailShared";

// Route: /admin/orders/[id]
// Orders are never created in the mock admin (only their status changes), so
// the seed data is the full set of valid IDs.
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!initialOrders.some((order) => order.id === id)) {
    notFound();
  }

  return <AdminOrderDetailPage />;
}
