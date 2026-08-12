import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastNotification: React.FC = () => {
  const { notificationMessage } = useShop();

  return (
    <AnimatePresence>
      {notificationMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 bg-[#1A1A18] text-white px-5 py-3.5 rounded-xs shadow-2xl flex items-center space-x-3 border border-white/10"
        >
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-medium tracking-wide uppercase">
            {notificationMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
