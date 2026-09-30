import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_ARTICLES } from '@/data/articles';
import type { JournalArticle } from '@/types';
import { ImageReveal, Reveal, Stagger, StaggerItem, DURATION, STAGGER } from '@/components/motion';

function ArticleBlock({ block }: { block: JournalArticle['content'][number] }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A18] font-medium pt-4">{block.text}</h2>;
    case 'quote':
      return (
        <blockquote className="border-l-2 border-[#D4AF37] pl-6 font-serif text-xl sm:text-2xl italic text-[#1A1A18] leading-snug">
          &ldquo;{block.text}&rdquo;
        </blockquote>
      );
    case 'image':
      return block.url ? (
        <figure className="space-y-2">
          <img src={block.url} alt={block.caption ?? ''} className="w-full rounded-xs bg-[#F0EBE1]" />
          {block.caption && <figcaption className="text-xs text-[#8C8279]">{block.caption}</figcaption>}
        </figure>
      ) : null;
    case 'list':
      return (
        <ul className="list-disc pl-5 space-y-1 text-sm text-[#8C8279] font-light leading-relaxed">
          {block.items?.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    default:
      return <p className="text-sm sm:text-base text-[#8C8279] font-light leading-relaxed">{block.text}</p>;
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <nav className="text-xs uppercase tracking-widest text-[#8C8279] flex items-center space-x-2">
        <Link href="/journal" className="hover:text-[#1A1A18] transition-colors">
          Journal
        </Link>
        <span>/</span>
        <span className="text-[#1A1A18] font-semibold">{article.category}</span>
      </nav>

      <Stagger onMount gap={STAGGER.loose} className="space-y-4">
        <StaggerItem>
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8C8279]">
            <span className="font-semibold text-[#1A1A18]">{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </StaggerItem>
        <StaggerItem duration={DURATION.slow}>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium leading-tight">
            {article.title}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-sm sm:text-base text-[#8C8279] font-light leading-relaxed">{article.subtitle}</p>
        </StaggerItem>
        <StaggerItem className="flex items-center gap-3 pt-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-10 h-10 rounded-full object-cover border border-[#E5E0D8]"
          />
          <div className="text-xs">
            <div className="font-semibold text-[#1A1A18]">{article.author.name}</div>
            <div className="text-[#8C8279]">{article.author.role}</div>
          </div>
        </StaggerItem>
      </Stagger>

      <ImageReveal
        src={article.image}
        alt={article.title}
        loading="eager"
        className="relative aspect-16/10 w-full rounded-xs bg-[#F0EBE1]"
      />

      <Reveal className="max-w-3xl space-y-6">
        {article.content.map((block, index) => (
          <ArticleBlock key={index} block={block} />
        ))}
      </Reveal>

      <div className="border-t border-[#E5E0D8] pt-8">
        <Link
          href="/journal"
          className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18] hover:text-[#8C8279]"
        >
          ← All Stories
        </Link>
      </div>
    </article>
  );
}
