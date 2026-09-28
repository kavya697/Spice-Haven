import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { SPECIAL_OFFERS, SpecialOffer } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface SpecialOffersSectionProps {
  onClaimOfferOrder: (offer: SpecialOffer) => void;
  onClaimOfferReservation: (offer: SpecialOffer) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onClaimOfferOrder,
  onClaimOfferReservation,
}) => {
  return (
    <section
      id="specials"
      className="py-20 lg:py-28 bg-[#14100E] text-[#F5EFE6] border-b border-[#2C241F]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm text-[#E8B88A] font-medium tracking-wide">
            Seasonal Tasting Tables & Curated Privileges
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FAF6F0] mt-2 leading-[1.1] text-balance">
            Special Offers & Feasts
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-[#C9BAA8] leading-relaxed tracking-[0.01em]">
            Experience our multi-course tasting menus and weekday brass thali feasts at preferred seasonal rates, available for both tableside dining and insulated home delivery.
          </p>
        </div>

        {/* 3-Column Offers Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-7">
          {SPECIAL_OFFERS.map((offer) => (
            <article
              key={offer.id}
              className="flex flex-col justify-between bg-[#1D1714] rounded-xl border border-[#332923] overflow-hidden hover:border-[#59473D] transition-colors duration-150"
            >
              <div>
                {/* 16:9 Offer Visual */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#110D0B]">
                  <ResilientImage
                    src={offer.image}
                    alt={offer.title}
                    fallbackTitle={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  {/* Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#E8B88A]">
                    <span className="font-mono tabular-nums">{offer.indexNumber}.</span>
                    <span>{offer.timingLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{offer.savingsText}</span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#FAF6F0] mt-2 leading-snug">
                    {offer.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#C9BAA8] leading-relaxed tracking-[0.01em]">
                    {offer.description}
                  </p>

                  {/* Unboxed Highlights List */}
                  <ul className="mt-5 pt-4 border-t border-[#2E2520] space-y-2 text-xs text-[#DED2C5]">
                    {offer.includedHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-baseline gap-2">
                        <span className="font-mono text-[#C84B21]">0{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Pricing & CTA */}
              <div className="px-6 pb-6 pt-4 border-t border-[#2E2520] flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono tabular-nums text-2xl font-semibold text-[#FAF6F0]">
                      ${offer.offerPrice}
                    </span>
                    <span className="font-mono tabular-nums text-xs text-[#8C7A6B] line-through">
                      ${offer.originalPrice}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9E8C7E] font-mono mt-0.5">
                    Code: {offer.promoCode}
                  </p>
                </div>

                {offer.actionType === 'order' ? (
                  <button
                    type="button"
                    onClick={() => onClaimOfferOrder(offer)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <span>Order Feast</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onClaimOfferReservation(offer)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF6F0] bg-[#2B221D] border border-[#54443A] rounded-lg hover:bg-[#382C26] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#E8B88A] shrink-0" />
                    <span>Reserve Seating</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
