import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export const TopProducts: React.FC = () => {
  const { products } = useAdmin();

  // Sort by revenue descending
  const sortedProducts = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1A1A18] dark:text-white">
            Top Performing Products
          </h2>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Highest revenue generating items.
          </p>
        </div>
        <Link
          to="/admin/products"
          className="text-xs font-semibold text-[#1A1A18] dark:text-[#D4AF37] hover:underline uppercase tracking-wider"
        >
          Catalog →
        </Link>
      </div>

      <div className="space-y-3">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2.5 rounded-xs hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] transition-colors border border-transparent hover:border-[#E5E0D8] dark:hover:border-[#333230]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-xs border border-[#E5E0D8] dark:border-[#333230] shrink-0"
              />
              <div className="min-w-0">
                <Link
                  to={`/admin/products/${product.id}`}
                  className="font-medium text-xs text-[#1A1A18] dark:text-white hover:underline truncate block"
                >
                  {product.name}
                </Link>
                <div className="text-[10px] text-[#8C8279] dark:text-[#A0988E]">
                  {product.category} • {product.salesCount} units sold
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-serif text-sm font-semibold text-[#1A1A18] dark:text-[#D4AF37]">
                ${product.revenue.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                ${product.price.toLocaleString()} / unit
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
