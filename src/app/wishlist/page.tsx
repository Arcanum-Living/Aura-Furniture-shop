import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MOCK_PRODUCTS } from '../../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const wishlistedProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#E5E0D8] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
          Saved Curation
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
          Your Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-[#8C8279] font-light">
          Pieces saved for future spatial considerations ({wishlistedProducts.length} items).
        </p>
      </div>

      {/* Empty State */}
      {wishlistedProducts.length === 0 ? (
        <div className="bg-[#F0EBE1] border border-[#E5E0D8] rounded-xs p-16 text-center space-y-6 max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#8C8279] mx-auto shadow-xs">
            <Heart className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h2 className="font-serif text-3xl text-[#1A1A18] font-medium">
            Your wishlist is waiting.
          </h2>
          <p className="text-xs text-[#8C8279] font-light max-w-sm mx-auto leading-relaxed">
            As you browse our collections, tap the heart icon on any piece to save it to your personal architectural moodboard.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.2em] py-4 px-8 rounded-xs transition-colors shadow-md"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="bg-white border border-[#E5E0D8] rounded-xs overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-4/5 w-full bg-[#F0EBE1] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1A1A18] flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8C8279] font-medium">
                    {product.category}
                  </span>
                  <Link href={`/shop/${product.slug}`} className="block">
                    <h3 className="font-serif text-lg font-medium text-[#1A1A18] hover:text-[#8C8279] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#8C8279] font-light line-clamp-1">
                    {product.material}
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A18] mt-2">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-semibold uppercase tracking-wider py-2.5 rounded-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
