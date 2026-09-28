import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { IMAGES } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onOrderNowClick: () => void;
  onBookTableClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderNowClick,
  onBookTableClick,
}) => {
  return (
    <section
      id="top"
      className="relative bg-[#14100E] text-[#F5EFE6] overflow-hidden border-b border-[#2C241F]"
    >
      {/* Background 16:9 Feast Photography with Measured Contrast Scrim */}
      <div className="relative min-h-[620px] lg:min-h-[720px] flex items-end">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.heroFeast}
            alt="Lavish Indian feast at Spice Haven with hammered copper handi curries, char-grilled lamb chops, and artisanal garlic naan"
            fallbackTitle="Spice Haven Culinary Table"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
          {/* Measured scrims ensuring WCAG AA contrast across all media luminance frames */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-[#14100E]/75 to-[#14100E]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14100E]/90 via-[#14100E]/55 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 pt-24 pb-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Quiet Unboxed Editorial Kicker (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#D5C7B8] tracking-wide mb-4">
              <span>SoHo Culinary District, New York</span>
              <span aria-hidden="true">·</span>
              <span>Stone-Ground Heirloom Spices</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2019</span>
            </div>

            {/* Restaurant Name & Tagline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-semibold text-[#FAF6F0] leading-[1.06] tracking-tight text-balance">
              Spice Haven
            </h1>
            <p className="font-display italic text-2xl sm:text-3xl text-[#E8B88A] mt-2 leading-snug text-balance">
              Fire-kissed heritage, slow-simmered craft, and modern Indian gastronomy.
            </p>

            <p className="mt-5 text-base sm:text-[17px] text-[#DED2C5] leading-relaxed max-w-[60ch]">
              Every evening begins in our stone spice mill—toasting single-estate Tellicherry peppercorns, Kashmiri saffron, and wild black cardamom before firing our custom copper tandoors to 900°F.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOrderNowClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-all duration-150 cursor-pointer whitespace-nowrap shadow-lg shadow-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C84B21]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onBookTableClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-[#FAF6F0] bg-[#1C1613]/80 border border-[#54443A] rounded-lg hover:bg-[#28201B] hover:border-[#8C7362] transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C84B21]"
              >
                <Calendar className="w-4 h-4 text-[#E8B88A] shrink-0" />
                <span>Book a Table</span>
              </button>
            </div>

            {/* Unboxed Architectural Proof Row */}
            <div className="mt-12 pt-6 border-t border-[#362C25] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-mono tabular-nums text-xl sm:text-2xl font-medium text-[#FAF6F0]">
                  36 hrs
                </p>
                <p className="text-xs text-[#B5A496] mt-0.5">
                  Charcoal-simmered black lentil dal
                </p>
              </div>
              <div>
                <p className="font-mono tabular-nums text-xl sm:text-2xl font-medium text-[#FAF6F0]">
                  24 spices
                </p>
                <p className="text-xs text-[#B5A496] mt-0.5">
                  Roasted & stone-milled daily in house
                </p>
              </div>
              <div>
                <p className="font-mono tabular-nums text-xl sm:text-2xl font-medium text-[#FAF6F0]">
                  4.9 / 5.0
                </p>
                <p className="text-xs text-[#B5A496] mt-0.5">
                  Across 1,420+ verified dining tables
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
