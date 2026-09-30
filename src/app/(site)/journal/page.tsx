import type { Metadata } from 'next';
import Link from 'next/link';
import { MOCK_ARTICLES } from '@/data/articles';
import {
  HoverArrow,
  HoverUnderline,
  Stagger,
  StaggerItem,
  DURATION,
  STAGGER,
} from '@/components/motion';

export const metadata: Metadata = { title: 'Journal — AURA' };

export default function JournalPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <Stagger
        onMount
        gap={STAGGER.loose}
        className="text-center max-w-3xl mx-auto space-y-4 border-b border-[#E5E0D8] pb-10"
      >
        <StaggerItem>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Design Journal
          </span>
        </StaggerItem>
        <StaggerItem duration={DURATION.slow}>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium">
            From the Journal
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-sm text-[#8C8279] font-light leading-relaxed">
            Stories on interior design, natural materials and considered living from the AURA studio.
          </p>
        </StaggerItem>
      </Stagger>

      <Stagger gap={STAGGER.loose} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_ARTICLES.map((article) => (
          <StaggerItem key={article.id} className="group space-y-4">
            <Link href={`/journal/${article.slug}`} className="block aspect-16/10 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </Link>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8C8279]">
                <span className="font-semibold text-[#1A1A18]">{article.category}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <Link href={`/journal/${article.slug}`}>
                <h2 className="font-serif text-xl font-medium text-[#1A1A18] group-hover:text-[#8C8279] transition-colors">
                  {article.title}
                </h2>
              </Link>
              <p className="text-xs text-[#8C8279] font-light line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="pt-2">
                <Link
                  href={`/journal/${article.slug}`}
                  className="group/link inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#1A1A18]"
                >
                  <HoverUnderline>Read Article</HoverUnderline>
                  <HoverArrow className="w-3.5 h-3.5 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
