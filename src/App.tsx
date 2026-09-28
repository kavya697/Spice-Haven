/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitContactSection } from './components/VisitContactSection';
import { OrderDrawer, CartItem } from './components/OrderDrawer';
import { ReservationModal } from './components/ReservationModal';
import {
  MENU_ITEMS,
  MenuItem,
  SpiceLevel,
  SpecialOffer,
} from './data/restaurantData';

export default function App() {
  // Pre-populate cart with 1 signature dish so guests can immediately inspect or modify the Order Drawer
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'royal-awadhi-biryani-Medium Warmth',
      id: MENU_ITEMS[0].id,
      name: MENU_ITEMS[0].name,
      price: MENU_ITEMS[0].price,
      quantity: 1,
      spiceLevel: 'Medium Warmth',
      image: MENU_ITEMS[0].image,
    },
  ]);

  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationDefaultZone, setReservationDefaultZone] = useState<string | undefined>(
    undefined
  );
  const [reservationDefaultOffer, setReservationDefaultOffer] = useState<string | undefined>(
    undefined
  );
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (
    item: MenuItem,
    chosenSpice: SpiceLevel,
    note?: string
  ) => {
    const cartKey = `${item.id}-${chosenSpice}-${note || ''}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: cartKey,
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          spiceLevel: chosenSpice,
          note,
          image: item.image,
        },
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleClaimOfferOrder = (offer: SpecialOffer) => {
    const cartKey = `offer-${offer.id}`;
    setCartItems((prev) => {
      const exists = prev.find((i) => i.cartItemId === cartKey);
      if (exists) {
        return prev.map((i) =>
          i.cartItemId === cartKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId: cartKey,
          id: offer.id,
          name: offer.title,
          price: offer.offerPrice,
          quantity: 1,
          spiceLevel: 'Medium Warmth',
          note: `Special Offer (${offer.promoCode})`,
          image: offer.image,
        },
      ];
    });
    setAppliedPromo(offer.promoCode);
    setIsOrderDrawerOpen(true);
  };

  const handleClaimOfferReservation = (offer: SpecialOffer) => {
    setReservationDefaultZone('Chef’s Copper Tandoor Counter');
    setReservationDefaultOffer(`${offer.title} (${offer.promoCode})`);
    setIsReservationModalOpen(true);
  };

  const handleOpenTandoorCounterBooking = () => {
    setReservationDefaultZone('Chef’s Copper Tandoor Counter');
    setReservationDefaultOffer(undefined);
    setIsReservationModalOpen(true);
  };

  const handleOpenStandardReservation = () => {
    setReservationDefaultZone('Main Dining Room');
    setReservationDefaultOffer(undefined);
    setIsReservationModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1C1613]">
      {/* Strict 3-Zone Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenReservationModal={handleOpenStandardReservation}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOrderNowClick={() => setIsOrderDrawerOpen(true)}
          onBookTableClick={handleOpenStandardReservation}
        />

        <AboutSection onBookTandoorCounter={handleOpenTandoorCounterBooking} />

        <MenuSection onAddToCart={handleAddToCart} />

        <SpecialOffersSection
          onClaimOfferOrder={handleClaimOfferOrder}
          onClaimOfferReservation={handleClaimOfferReservation}
        />

        <GallerySection />

        <ReviewsSection />

        <VisitContactSection
          onOpenReservationModal={handleOpenStandardReservation}
        />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#14100E] text-[#D5C7B8] border-t border-[#2C241F] py-14">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#28201B]">
            <div className="md:col-span-5 space-y-3">
              <a
                href="#top"
                className="font-display text-3xl font-semibold text-[#FAF6F0] tracking-tight"
              >
                Spice Haven
              </a>
              <p className="text-sm text-[#B5A496] max-w-sm leading-relaxed">
                Fire-kissed heritage, stone-ground single-origin spices, and modern Indian gastronomy in the heart of SoHo.
              </p>
              <p className="text-xs text-[#8C7A6B] font-mono tabular-nums pt-1">
                428 Mercer Street, New York, NY 10013 · (212) 555-0194
              </p>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <p className="text-xs font-semibold text-[#FAF6F0] tracking-wide">
                Navigation
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-[#B5A496]">
                <li>
                  <a href="#about" className="hover:text-[#FAF6F0] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#FAF6F0] transition-colors">
                    Menu & Popular
                  </a>
                </li>
                <li>
                  <a href="#specials" className="hover:text-[#FAF6F0] transition-colors">
                    Special Offers
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#FAF6F0] transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#FAF6F0] transition-colors">
                    Guest Reviews
                  </a>
                </li>
                <li>
                  <a href="#visit" className="hover:text-[#FAF6F0] transition-colors">
                    Hours & Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-semibold text-[#FAF6F0] tracking-wide">
                Direct Reservations & Takeaway
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenStandardReservation}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#FAF6F0] border border-[#4A3C33] rounded-lg hover:bg-[#221B17] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book a Dining Table
                </button>
                <button
                  type="button"
                  onClick={() => setIsOrderDrawerOpen(true)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Order Online ({totalCartCount})
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A6B]">
            <p>© {new Date().getFullYear()} Spice Haven Hospitality LLC. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Stone-Milled Daily in SoHo</span>
              <span aria-hidden="true">·</span>
              <span>Zero Artificial Colorings or Preserved Pastes</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Slide-Over Order Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        appliedPromo={appliedPromo}
        onApplyPromo={(code) => setAppliedPromo(code)}
      />

      {/* Interactive Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        defaultSeatingZone={reservationDefaultZone}
        defaultSpecialOfferTitle={reservationDefaultOffer}
      />
    </div>
  );
}
