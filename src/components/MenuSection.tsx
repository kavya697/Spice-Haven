import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, SlidersHorizontal, X } from 'lucide-react';
import {
  MENU_ITEMS,
  MenuItem,
  MenuCategory,
  SpiceLevel,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, chosenSpice: SpiceLevel, note?: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<'popular' | MenuCategory>('popular');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegetarian' | 'gf'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);
  const [modalSpiceLevel, setModalSpiceLevel] = useState<SpiceLevel>('Medium Warmth');
  const [modalNote, setModalNote] = useState('');

  const categoryTabs: { id: 'popular' | MenuCategory; label: string }[] = [
    { id: 'popular', label: 'Popular Dishes' },
    { id: 'all', label: 'Full Menu' },
    { id: 'tandoor', label: 'Tandoor & Starters' },
    { id: 'curries', label: 'Slow-Simmered Curries' },
    { id: 'biryani_breads', label: 'Biryani & Breads' },
    { id: 'desserts_drinks', label: 'Desserts & Chai' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory === 'popular' && !item.isPopular) return false;
      if (
        activeCategory !== 'all' &&
        activeCategory !== 'popular' &&
        item.category !== activeCategory
      ) {
        return false;
      }
      if (dietaryFilter === 'vegetarian' && !item.isVegetarian) return false;
      if (dietaryFilter === 'gf' && !item.isGlutenFree) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.originRegion.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item, item.spiceLevel);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1400);
  };

  const openCustomizeModal = (item: MenuItem) => {
    setSelectedDishForModal(item);
    setModalSpiceLevel(item.spiceLevel);
    setModalNote('');
  };

  const handleConfirmModalAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDishForModal) return;
    onAddToCart(selectedDishForModal, modalSpiceLevel, modalNote.trim() || undefined);
    setRecentlyAddedId(selectedDishForModal.id);
    setSelectedDishForModal(null);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1400);
  };

  return (
    <section
      id="menu"
      className="py-20 lg:py-28 bg-[#FAF6F0] text-[#1C1613] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Title & Lead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm text-[#8C3A1B] font-medium tracking-wide">
              Seasonal Culinary Index · Autumn & Winter 2026
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1613] mt-2 leading-[1.1] text-balance">
              Popular Dishes & Curated Menu
            </h2>
            <p className="mt-3 text-[15px] sm:text-base text-[#54463E] leading-relaxed">
              Explore our most requested house signatures or filter the full kitchen menu by course and dietary preference. Every dish is cooked to order and customizable to your preferred spice warmth.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6E5D53] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, spices, region..."
                aria-label="Search menu items"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613] placeholder:text-[#7D6B60] focus:outline-none focus:border-[#C84B21] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Interactive Filter Controls Bar (Functional Buttons) */}
        <div className="mt-8 pt-6 border-t border-[#E5DEC9] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 p-1 bg-[#EFE8DC] rounded-lg border border-[#E2D9C8]"
          >
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1613] text-[#FAF6F0] shadow-xs'
                      : 'text-[#54463E] hover:text-[#1C1613]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dietary Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 self-start lg:self-auto p-1 bg-[#EFE8DC] rounded-lg border border-[#E2D9C8]">
            <button
              type="button"
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'bg-white text-[#1C1613] shadow-xs'
                  : 'text-[#54463E] hover:text-[#1C1613]'
              }`}
            >
              All Diets
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter('vegetarian')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                dietaryFilter === 'vegetarian'
                  ? 'bg-white text-[#1C1613] shadow-xs'
                  : 'text-[#54463E] hover:text-[#1C1613]'
              }`}
            >
              Vegetarian
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter('gf')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                dietaryFilter === 'gf'
                  ? 'bg-white text-[#1C1613] shadow-xs'
                  : 'text-[#54463E] hover:text-[#1C1613]'
              }`}
            >
              Gluten-Free
            </button>
          </div>
        </div>

        {/* Dish Grid (3-column desktop, 2-column tablet, 1-column mobile) */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 p-12 text-center bg-[#F2ECE1] rounded-xl border border-[#E5DEC9]">
            <p className="font-display text-2xl font-semibold text-[#1C1613]">
              No dishes match your current filter.
            </p>
            <p className="text-sm text-[#6E5D53] mt-1">
              Try clearing your search term or switching back to Full Menu.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item) => {
              const isAdded = recentlyAddedId === item.id;
              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-[#F4EFE6] rounded-xl border border-[#E3DACB] overflow-hidden hover:-translate-y-0.5 hover:border-[#C9B9A6] transition-all duration-150"
                >
                  {/* 4:3 Dish Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#1E1815] relative">
                    <ResilientImage
                      src={item.image}
                      alt={item.name}
                      fallbackTitle={item.name}
                      fallbackSubtitle={item.originRegion}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content — Unboxed Metadata with · separators */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A665A]">
                        <span>{item.originRegion}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.spiceLevel}</span>
                        {item.isVegetarian && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#3E6B48] font-medium">Vegetarian</span>
                          </>
                        )}
                        {item.isGlutenFree && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Gluten-Free</span>
                          </>
                        )}
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-2xl font-semibold text-[#1C1613] leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-mono tabular-nums text-base font-medium text-[#1C1613] shrink-0">
                          ${item.price}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-[#54463E] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E3DACB]">
                      <p className="text-xs text-[#6E5D53] mb-3">
                        {item.pairingSuggestion} · <span className="font-mono tabular-nums">{item.prepTime}</span> prep
                      </p>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(item)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                            isAdded
                              ? 'bg-[#2D5A3C] text-white'
                              : 'bg-[#1C1613] text-[#FAF6F0] hover:bg-[#C84B21]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4 shrink-0" />
                              <span>Added to Order</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 shrink-0" />
                              <span>Add to Order</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => openCustomizeModal(item)}
                          aria-label={`Customize spice level for ${item.name}`}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-[#1C1613] bg-[#EAE1D3] hover:bg-[#DFD3C0] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                          <span>Customize</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Dish Customization & Chef Notes Modal */}
      {selectedDishForModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
        >
          <div className="bg-[#FAF6F0] border border-[#DED4C6] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="relative aspect-[16/9] bg-[#14100E]">
              <ResilientImage
                src={selectedDishForModal.image}
                alt={selectedDishForModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedDishForModal(null)}
                aria-label="Close dish customization"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#14100E]/80 text-[#FAF6F0] flex items-center justify-center hover:bg-[#14100E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmModalAdd} className="p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#7A665A]">
                  <span>{selectedDishForModal.originRegion}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedDishForModal.calories} kcal</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedDishForModal.prepTime} preparation</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 mt-1">
                  <h3
                    id="dish-modal-title"
                    className="font-display text-2xl font-semibold text-[#1C1613]"
                  >
                    {selectedDishForModal.name}
                  </h3>
                  <span className="font-mono tabular-nums text-lg font-semibold text-[#1C1613]">
                    ${selectedDishForModal.price}
                  </span>
                </div>
                <p className="text-xs text-[#6E5D53] mt-2 leading-relaxed">
                  {selectedDishForModal.chefNotes}
                </p>
              </div>

              {/* Spice Level Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1613] mb-2">
                  Select Spice Preparation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    ['Mild & Aromatic', 'Medium Warmth', 'Fiery Heritage'] as SpiceLevel[]
                  ).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setModalSpiceLevel(level)}
                      className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer whitespace-nowrap truncate ${
                        modalSpiceLevel === level
                          ? 'bg-[#1C1613] text-[#FAF6F0] border-[#1C1613]'
                          : 'bg-[#F2ECE1] text-[#54463E] border-[#DED4C6] hover:border-[#1C1613]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kitchen Note */}
              <div>
                <label
                  htmlFor="kitchen-note"
                  className="block text-xs font-semibold text-[#1C1613] mb-1.5"
                >
                  Special Kitchen Instruction (Optional)
                </label>
                <input
                  id="kitchen-note"
                  type="text"
                  value={modalNote}
                  onChange={(e) => setModalNote(e.target.value)}
                  placeholder="e.g., Extra mint chutney, no cilantro, allergy note..."
                  className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613] placeholder:text-[#857367] focus:outline-none focus:border-[#C84B21]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDishForModal(null)}
                  className="px-4 py-2.5 text-xs font-medium text-[#54463E] hover:text-[#1C1613] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Add to Order — ${selectedDishForModal.price}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
