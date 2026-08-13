import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, PackageX } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const LowStockAlert: React.FC = () => {
  const { products } = useAdmin();

  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold);

  return (
    <div className="bg-white dark:bg-[#1A1A18] border border-amber-200 dark:border-amber-900/40 p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-normal text-[#1A1A18] dark:text-white">
              Inventory Alert
            </h2>
            <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
              {lowStockItems.length} products require restocking attention.
            </p>
          </div>
        </div>

        <Link
          to="/admin/inventory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] hover:opacity-90 rounded-xs transition-opacity"
        >
          <span>View Inventory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lowStockItems.slice(0, 4).map((product) => {
          const percent = Math.min(100, Math.round((product.stock / (product.lowStockThreshold * 2)) * 100));
          const isOut = product.stock === 0;

          return (
            <div
              key={product.id}
              className="p-3 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <img src={product.image} alt={product.name} className="w-7 h-7 object-cover rounded-xs shrink-0" />
                  <span className="font-medium truncate text-[#1A1A18] dark:text-white">
                    {product.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs shrink-0 ${
                    isOut
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {isOut ? 'OUT OF STOCK' : `${product.stock} LEFT`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-[#E5E0D8] dark:bg-[#333230] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isOut ? 'bg-rose-600' : 'bg-amber-600'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-[#8C8279] dark:text-[#A0988E]">
                  <span>Threshold: {product.lowStockThreshold} units</span>
                  <span>SKU: {product.sku}</span>
                </div>
              </div>
            </div>
          );
        })}

        {lowStockItems.length === 0 && (
          <div className="col-span-2 py-4 text-center text-xs text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-2">
            <PackageX className="w-4 h-4" />
            All inventory levels are healthy! No low stock warnings.
          </div>
        )}
      </div>
    </div>
  );
};
