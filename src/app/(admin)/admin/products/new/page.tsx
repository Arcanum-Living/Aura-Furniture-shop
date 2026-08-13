import AdminProductFormPage from "../_form/ProductFormShared";

// Route: /admin/products/new
// useParams() in the shared component returns no "id" here,
// so AdminProductFormPage's `isEditing` check evaluates to false (create mode).
export default function NewProductPage() {
  return <AdminProductFormPage />;
}
