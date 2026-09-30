import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import ProductDetails from './ProductDetails';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
