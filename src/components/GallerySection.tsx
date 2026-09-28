import React, { useState } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'culinary' | 'atmosphere'>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = GALLERY_ITEMS.filter((item) =>
    filter === 'all' ? true : item.category === filter
  );

  const openLightbox = (item: GalleryItem) => {
    const idx = visibleItems.findIndex((i) => i.id === item.id);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + visibleItems.length) % visibleItems.length);
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % visibleItems.length);
  };

  const currentItem = activeIndex !== null ? visibleItems[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-[#FAF6F0] text-[#1C1613] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm text-[#8C3A1B] font-medium tracking-wide">
              Visual Study · Hearth, Vessels & Plating
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1613] mt-2 leading-[1.1] text-balance">
              Inside Spice Haven
            </h2>
            <p className="mt-3 text-[15px] sm:text-base text-[#54463E] leading-relaxed">
              From hand-beaten Moradabad brassware to the amber glow of our evening dining room, inspect the craft behind every table.
            </p>
          </div>

          {/* Interactive Gallery Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#EFE8DC] rounded-lg border border-[#E2D9C8] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setActiveIndex(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#1C1613] text-[#FAF6F0]'
                  : 'text-[#54463E] hover:text-[#1C1613]'
              }`}
            >
              All Frames
            </button>
            <button
              type="button"
              onClick={() => {
                setFilter('culinary');
                setActiveIndex(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'culinary'
                  ? 'bg-[#1C1613] text-[#FAF6F0]'
                  : 'text-[#54463E] hover:text-[#1C1613]'
              }`}
            >
              Culinary Craft
            </button>
            <button
              type="button"
              onClick={() => {
                setFilter('atmosphere');
                setActiveIndex(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'atmosphere'
                  ? 'bg-[#1C1613] text-[#FAF6F0]'
                  : 'text-[#54463E] hover:text-[#1C1613]'
              }`}
            >
              Dining Room
            </button>
          </div>
        </div>

        {/* Asymmetric Bento Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openLightbox(item)}
              className={`group relative text-left rounded-xl overflow-hidden border border-[#E3DACB] bg-[#14100E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C84B21] cursor-pointer ${
                filter === 'all' ? item.spanClass : 'col-span-1'
              }`}
            >
              <div className="aspect-[16/10] w-full h-full overflow-hidden">
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              {/* Measured Gradient Scrim for Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#E8B88A]">{item.caption}</p>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FAF6F0] mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <span className="w-9 h-9 rounded-lg bg-[#14100E]/70 border border-[#4A3C33] text-[#FAF6F0] flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity shrink-0">
                    <Expand className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <div className="max-w-4xl w-full bg-[#181310] border border-[#362C25] rounded-xl overflow-hidden text-[#FAF6F0] shadow-2xl">
            <div className="relative aspect-[16/9] bg-black">
              <ResilientImage
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close gallery viewer"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#14100E]/85 text-[#FAF6F0] flex items-center justify-center hover:bg-[#C84B21] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#E8B88A]">
                  {currentItem.categoryLabel} · {currentItem.caption}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FAF6F0] mt-1">
                  {currentItem.title}
                </h3>
                <p className="text-sm text-[#C9BAA8] mt-1.5 max-w-2xl">
                  {currentItem.craftDetail}
                </p>
              </div>

              {visibleItems.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="w-10 h-10 rounded-lg border border-[#3D312A] flex items-center justify-center text-[#FAF6F0] hover:bg-[#2A211C] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-mono tabular-nums text-xs text-[#B5A496] px-2">
                    {(activeIndex ?? 0) + 1} / {visibleItems.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="w-10 h-10 rounded-lg border border-[#3D312A] flex items-center justify-center text-[#FAF6F0] hover:bg-[#2A211C] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
