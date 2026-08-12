import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, clearCart } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 1000;
  const shippingCost = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 150;
  const taxCost = Math.round(cartSubtotal * 0.08);
  const grandTotal = Math.max(0, cartSubtotal + shippingCost + taxCost - promoDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(discount);
      setPromoMessage('10% VIP Private Member discount applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "AURA10"');
    }
  };

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-[#F0EBE1] rounded-full flex items-center justify-center text-[#D4AF37] mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
          Order Confirmed
        </span>
        <h1 className="font-serif text-4xl text-[#1A1A18] font-medium">
          Thank You for Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#8C8279] font-light leading-relaxed">
          Order #AURA-2026-8941 has been received. Our concierge team will reach out within 24 hours to schedule your white glove delivery appointment.
        </p>
        <div className="pt-4">
          <Link
            href ="/shop"
            className="inline-flex items-center space-x-2 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.2em] py-4 px-8 rounded-xs transition-colors"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Title */}
      <div className="border-b border-[#E5E0D8] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
          Shopping Bag
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
          Your Selected Pieces
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-[#F0EBE1] border border-[#E5E0D8] rounded-xs p-16 text-center space-y-6 max-w-xl mx-auto my-8">
          <h2 className="font-serif text-3xl text-[#1A1A18] font-medium">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-[#8C8279] font-light max-w-sm mx-auto">
            Discover our curated furniture collections engineered with timeless aesthetics and artisanal materials.
          </p>
          <Link
            href ="/shop"
            className="inline-flex items-center space-x-2 bg-[#1A1A18] text-white text-xs font-semibold uppercase tracking-[0.2em] py-4 px-8 rounded-xs hover:bg-[#333230] transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Cart Table (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-[#E5E0D8] rounded-xs bg-white divide-y divide-[#E5E0D8]">
              {cart.map((item) => (
                <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <Link href ={`/shop/${item.product.slug}`} className="w-24 h-28 bg-[#F0EBE1] rounded-xs overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#8C8279] font-medium">
                        {item.product.category}
                      </span>
                      <Link href ={`/shop/${item.product.slug}`} className="block">
                        <h3 className="font-serif text-lg font-medium text-[#1A1A18] hover:text-[#8C8279] transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#8C8279] font-light">
                        {item.selectedColor || item.product.color}
                      </p>
                      <p className="text-xs font-semibold text-[#1A1A18] pt-1">
                        ${item.product.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#E5E0D8]">
                    <div className="flex items-center border border-[#E5E0D8] bg-[#F9F8F6] rounded-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-2 text-[#1A1A18] hover:bg-[#E5E0D8] transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#1A1A18]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-2 text-[#1A1A18] hover:bg-[#E5E0D8] transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-base font-bold text-[#1A1A18]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#8C8279] hover:text-[#1A1A18] transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs">
              <Link href ="/shop" className="text-[#1A1A18] font-semibold uppercase tracking-wider hover:underline">
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[#8C8279] hover:text-red-600 uppercase tracking-wider font-light"
              >
                Empty Shopping Bag
              </button>
            </div>
          </div>

          {/* Right Order Summary (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E5E0D8] p-6 rounded-xs space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl text-[#1A1A18] font-medium border-b border-[#E5E0D8] pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-[#1A1A18]">
                <div className="flex justify-between">
                  <span className="text-[#8C8279]">Subtotal</span>
                  <span className="font-semibold">${cartSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#8C8279]">White Glove Delivery</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#8C8279]">Estimated Sales Tax</span>
                  <span className="font-semibold">${taxCost.toLocaleString()}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#D4AF37] font-semibold">
                    <span>VIP Member Discount</span>
                    <span>-${promoDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E5E0D8] flex justify-between text-lg font-bold text-[#1A1A18]">
                  <span>Estimated Total</span>
                  <span>${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (Try AURA10)"
                    className="flex-1 bg-[#F0EBE1] border border-[#E5E0D8] text-xs px-3 py-2 rounded-xs uppercase focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="bg-[#1A1A18] text-white text-xs px-4 py-2 uppercase font-semibold rounded-xs hover:bg-[#333230]"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[11px] font-medium text-[#8C8279]">{promoMessage}</p>
                )}
              </form>

              {/* Checkout CTA */}
              <button
                onClick={handlePlaceOrder}
                disabled={isCheckingOut}
                className="w-full bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-semibold uppercase tracking-[0.2em] py-4 rounded-xs transition-colors flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
              >
                <span>{isCheckingOut ? 'Processing Order...' : 'Proceed to Checkout'}</span>
                {!isCheckingOut && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="pt-4 border-t border-[#E5E0D8] space-y-2 text-[11px] text-[#8C8279]">
                <div className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-[#1A1A18]" />
                  <span>Complimentary White Glove Assembly on orders $1,000+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A18]" />
                  <span>10-Year Framework Warranty Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
