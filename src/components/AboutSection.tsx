import React from 'react';
import { IMAGES } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  onBookTandoorCounter: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBookTandoorCounter,
}) => {
  const pillars = [
    {
      index: '01.',
      title: 'Single-Origin Whole Spice Mill',
      description:
        'We never purchase pre-ground powders. Every morning at 8:00 AM, whole Tellicherry peppercorns from Malabar, green cardamom from Idukki, and Kashmiri saffron are dry-roasted in cast iron and stone-ground in small batches.',
    },
    {
      index: '02.',
      title: '900°F Hand-Beaten Copper Tandoors',
      description:
        'Fired with white oak and fruitwood charcoal, our custom Moradabad clay-and-copper ovens sear marinades instantaneously—locking natural juices inside lamb chops and house-pressed paneer while imparting unmistakable wood smoke.',
    },
    {
      index: '03.',
      title: 'Royal Dum Pukht Slow Braising',
      description:
        'Rooted in the royal kitchens of Awadh, our biryanis and dals are sealed inside heavy brass handis with whole-wheat pastry dough, allowing bone marrow stocks and aromatics to infuse gently over dying embers.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#FAF6F0] text-[#1C1613] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-[#8C3A1B] font-medium tracking-wide">
              Our Heritage & Culinary Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1613] mt-2 leading-[1.12] text-balance">
              Where ancient spice routes meet modern culinary precision.
            </h2>
            <p className="mt-5 text-[15px] sm:text-base text-[#54463E] leading-relaxed">
              Founded in 2019 by Executive Chef Vikramaditya Sen, Spice Haven was born from a quiet rebellion against homogenized curry-house shortcuts. Each regional recipe is researched from family archives across Lucknow, Old Delhi, Srinagar, and the Malabar Coast.
            </p>
            <div className="mt-6 pt-6 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-xl font-semibold text-[#1C1613]">
                  Chef Vikramaditya Sen
                </p>
                <p className="text-xs text-[#6E5D53] mt-0.5">
                  Executive Chef & Spice Archivist · Former Culinary Director, New Delhi & London
                </p>
              </div>
              <button
                type="button"
                onClick={onBookTandoorCounter}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#1C1613] border border-[#C9BAA8] bg-[#F2ECE1] hover:bg-[#E6DDD0] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                Reserve Chef’s Counter
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Dining Showcase Image */}
          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-[#E5DEC9] bg-[#F2ECE1]">
              <div className="aspect-video w-full overflow-hidden">
                <ResilientImage
                  src={IMAGES.interiorDining}
                  alt="Spice Haven main dining room with warm Venetian plaster walls, amber glass pendant lights, and open copper tandoor kitchen"
                  fallbackTitle="The Dining Room at Spice Haven"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F2ECE1]">
                <div>
                  <p className="font-display text-lg font-semibold text-[#1C1613]">
                    The Main Dining Room & Open Tandoor Hearth
                  </p>
                  <p className="text-xs text-[#6E5D53] mt-0.5">
                    428 Mercer Street · Hand-troweled ochre plaster, American walnut tables, and live wood-fired copper ovens
                  </p>
                </div>
                <span className="font-mono tabular-nums text-xs text-[#54463E] whitespace-nowrap">
                  68 Dining Seats · 8 Counter Seats
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Numbered Culinary Pillars */}
        <div className="mt-16 pt-12 border-t border-[#E5DEC9] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar) => (
            <div key={pillar.index} className="space-y-2.5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-sm font-medium text-[#C84B21]">
                  {pillar.index}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#1C1613]">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-[15px] text-[#54463E] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
