import { notFound } from 'next/navigation';
import { CATEGORIES_DATA } from '@/data/categories';
import CollectionCategory from './CollectionCategory';

export default async function CollectionCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = CATEGORIES_DATA.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return <CollectionCategory category={category} />;
}
