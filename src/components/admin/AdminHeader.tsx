import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Sun,
  Moon,
  Menu,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  User,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminHeader: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    setIsMobileSidebarOpen,
    settings,
    orders,
    products,
    messages,
  } = useAdmin();

  const location = useLocation();
  const navigate = useNavigate();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Generate breadcrumbs from pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const formatted = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    return { name: formatted, url };
  });

  // Recent Notifications
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing');
  const unreadMessages = messages.filter((m) => m.status === 'Unread');
  const totalNotificationsCount = lowStockProducts.length + pendingOrders.length + unreadMessages.length;

  // Search Results
  const searchResultsProducts = searchQuery
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const searchResultsOrders = searchQuery
    ? orders.filter((o) => o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-[#1A1A18] border-b border-[#E5E0D8] dark:border-[#333230] px-4 sm:px-6 flex items-center justify-between transition-colors">
      
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 text-[#1A1A18] dark:text-white hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] rounded-xs"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="hidden sm:flex items-center space-x-1.5 text-xs text-[#8C8279] dark:text-[#A0988E]">
          <Link to="/admin" className="hover:text-[#1A1A18] dark:hover:text-white transition-colors font-medium">
            AURA Admin
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.url}>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C8279]/60 shrink-0" />
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-[#1A1A18] dark:text-white capitalize">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.url} className="hover:text-[#1A1A18] dark:hover:text-white transition-colors capitalize">
                  {crumb.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Command Search Button Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-xs text-[#8C8279] dark:text-[#A0988E] hover:border-[#1A1A18] dark:hover:border-white transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-[#8C8279]" />
          <span className="hidden md:inline">Search catalog or orders...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#8C8279]">
            ⌘K
          </kbd>
        </button>

        {/* Live Store Quick Link */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-[#E5E0D8] dark:border-[#333230] hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] rounded-xs transition-colors text-[#1A1A18] dark:text-white"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3 h-3 text-[#8C8279]" />
        </Link>

        {/* Dark / Light Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xs border border-[#E5E0D8] dark:border-[#333230] text-[#1A1A18] dark:text-white hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#1A1A18]" />}
        </button>

        {/* Notifications Button & Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xs border border-[#E5E0D8] dark:border-[#333230] text-[#1A1A18] dark:text-white hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {totalNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {totalNotificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-2xl z-50 p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
                <h3 className="font-serif text-sm font-semibold text-[#1A1A18] dark:text-white">
                  Notifications ({totalNotificationsCount})
                </h3>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-[#8C8279] hover:text-[#1A1A18] dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 divide-y divide-[#E5E0D8] dark:divide-[#333230]">
                {lowStockProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/admin/inventory');
                    }}
                    className="pt-2 flex items-start gap-3 cursor-pointer hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] p-1.5 rounded-xs transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-[#1A1A18] dark:text-white">Low Stock Warning</p>
                      <p className="text-[#8C8279] text-[11px]">
                        {prod.name} has only <strong>{prod.stock} items</strong> left in inventory.
                      </p>
                    </div>
                  </div>
                ))}

                {pendingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate(`/admin/orders/${ord.id}`);
                    }}
                    className="pt-2 flex items-start gap-3 cursor-pointer hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] p-1.5 rounded-xs transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-[#1A1A18] dark:text-white">New Order Received</p>
                      <p className="text-[#8C8279] text-[11px]">
                        {ord.orderNumber} from {ord.customerName} (${ord.total.toLocaleString()})
                      </p>
                    </div>
                  </div>
                ))}

                {unreadMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/admin/messages');
                    }}
                    className="pt-2 flex items-start gap-3 cursor-pointer hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] p-1.5 rounded-xs transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-[#1A1A18] dark:text-white">Inquiry Message</p>
                      <p className="text-[#8C8279] text-[11px]">
                        {msg.customerName}: &ldquo;{msg.subject}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}

                {totalNotificationsCount === 0 && (
                  <div className="py-6 text-center text-xs text-[#8C8279]">
                    All notifications caught up!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 border border-[#E5E0D8] dark:border-[#333230] rounded-xs hover:border-[#1A1A18] transition-colors focus:outline-hidden"
          >
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center text-xs font-bold">
              VS
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xl p-2 z-50 text-xs text-[#1A1A18] dark:text-white animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-[#E5E0D8] dark:border-[#333230] mb-1">
                <div className="font-semibold">{settings.adminName}</div>
                <div className="text-[10px] text-[#8C8279]">{settings.adminEmail}</div>
              </div>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/admin/settings');
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#8C8279]" />
                Store Settings
              </button>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-xs flex items-center gap-2 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Return to Store
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Command Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-xl w-full shadow-2xl p-4 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-[#E5E0D8] dark:border-[#333230] pb-3">
              <Search className="w-5 h-5 text-[#8C8279]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, SKUs, order numbers, customers..."
                className="w-full bg-transparent text-sm text-[#1A1A18] dark:text-white placeholder-[#8C8279] focus:outline-hidden"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 text-[#8C8279] hover:text-[#1A1A18] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {searchQuery && (
              <div className="max-h-80 overflow-y-auto space-y-4 text-xs">
                {searchResultsProducts.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[#8C8279] uppercase text-[10px] tracking-wider mb-2">
                      Matching Products ({searchResultsProducts.length})
                    </h4>
                    <div className="space-y-1">
                      {searchResultsProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            navigate(`/admin/products/${p.id}`);
                          }}
                          className="flex items-center justify-between p-2 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-xs" />
                            <div>
                              <div className="font-medium text-[#1A1A18] dark:text-white">{p.name}</div>
                              <div className="text-[10px] text-[#8C8279]">SKU: {p.sku}</div>
                            </div>
                          </div>
                          <div className="font-semibold text-[#1A1A18] dark:text-white">
                            ${p.price.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResultsOrders.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[#8C8279] uppercase text-[10px] tracking-wider mb-2">
                      Matching Orders ({searchResultsOrders.length})
                    </h4>
                    <div className="space-y-1">
                      {searchResultsOrders.map((o) => (
                        <div
                          key={o.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            navigate(`/admin/orders/${o.id}`);
                          }}
                          className="flex items-center justify-between p-2 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs cursor-pointer"
                        >
                          <div>
                            <div className="font-medium text-[#1A1A18] dark:text-white">{o.orderNumber}</div>
                            <div className="text-[10px] text-[#8C8279]">{o.customerName}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-[#1A1A18] dark:text-white">${o.total.toLocaleString()}</div>
                            <div className="text-[10px] text-amber-600">{o.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResultsProducts.length === 0 && searchResultsOrders.length === 0 && (
                  <div className="py-8 text-center text-[#8C8279]">
                    No matching products or orders found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
