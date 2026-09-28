import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenOrderDrawer: () => void;
  onOpenReservationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenOrderDrawer,
  onOpenReservationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Specials', href: '#specials' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit & Contact', href: '#visit' },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#14100E]/95 backdrop-blur-md border-b border-[#2C241F] text-[#F5EFE6]">
      <div className="max-w-[1240px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-[#F5EFE6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C84B21]"
        >
          Spice Haven
        </a>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#D5C7B8]"
        >
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#F5EFE6] border-b border-transparent hover:border-[#C84B21] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
          <a
            href={navLinks[5].href}
            className="hidden xl:inline-block whitespace-nowrap shrink-0 py-1 hover:text-[#F5EFE6] border-b border-transparent hover:border-[#C84B21] transition-colors duration-150"
          >
            {navLinks[5].label}
          </a>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenReservationModal}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-[#F5EFE6] border border-[#4A3C33] rounded-lg hover:border-[#D5C7B8] hover:bg-[#221B17] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C84B21]"
          >
            Book a Table
          </button>

          <button
            type="button"
            onClick={onOpenOrderDrawer}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C84B21]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Order Now</span>
            {cartCount > 0 && (
              <span className="font-mono tabular-nums text-xs bg-[#14100E]/35 px-1.5 py-0.5 rounded">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#382E27] text-[#F5EFE6] hover:bg-[#221B17] transition-colors duration-150 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#14100E] border-b border-[#2C241F] px-5 pt-3 pb-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-base font-medium text-[#E5D9CC] hover:text-white border-b border-[#241D18] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservationModal();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-[#F5EFE6] border border-[#4A3C33] rounded-lg hover:bg-[#221B17] transition-colors whitespace-nowrap"
            >
              Book a Table
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderDrawer();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors whitespace-nowrap"
            >
              Order Online ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
