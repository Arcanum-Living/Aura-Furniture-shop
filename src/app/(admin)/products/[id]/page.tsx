import AdminProductFormPage from "../_form/ProductFormShared";

// Route: /admin/products/[id]  (edit mode)
// The shared component reads the id itself via useParams() from 'next/navigation'.
export default function EditProductPage() {
  return <AdminProductFormPage />;
}
