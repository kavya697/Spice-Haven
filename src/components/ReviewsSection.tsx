import React, { useState } from 'react';
import { Star, Plus, X, Check } from 'lucide-react';
import { CUSTOMER_REVIEWS, CustomerReview, MENU_ITEMS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [roleOrContext, setRoleOrContext] = useState('');
  const [dishOrdered, setDishOrdered] = useState(MENU_ITEMS[0].name);
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !headline.trim() || !comment.trim()) {
      setFormError('Please provide your name, a brief headline, and your dining reflection.');
      return;
    }

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      guestName: guestName.trim(),
      roleOrContext: roleOrContext.trim() || 'Verified Dining Room Guest, SoHo',
      visitDate: 'September 2026',
      dishOrdered,
      rating,
      headline: headline.trim(),
      comment: comment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setGuestName('');
    setRoleOrContext('');
    setHeadline('');
    setComment('');
    setFormError('');
    setShowReviewModal(false);
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 5000);
  };

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-[#F4EFE6] text-[#1C1613] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm text-[#8C3A1B] font-medium tracking-wide">
              Critical Acclaim & Verified Guest Ledger
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1613] mt-2 leading-[1.1] text-balance">
              Voices From Our Tables
            </h2>
            <p className="mt-3 text-[15px] sm:text-base text-[#54463E] leading-relaxed">
              Read reflections from culinary critics, anniversary tables at the copper tandoor counter, and regular guests across New York.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1C1613] bg-[#EAE1D3] border border-[#D4C7B4] rounded-lg hover:bg-[#DFD3C0] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {submittedNotice && (
          <div className="mt-6 p-4 rounded-lg bg-[#E6F0E8] border border-[#B8D4BE] text-[#1E4628] text-sm flex items-center gap-2.5">
            <Check className="w-4 h-4 shrink-0" />
            <span>
              Thank you. Your reflection has been added to the Spice Haven Guest Ledger below.
            </span>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-7">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-[#FAF6F0] rounded-xl border border-[#E3DACB] p-7 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Unboxed Metadata */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-1 text-[#C84B21]"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#7A665A] font-mono tabular-nums">
                    {review.visitDate}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#1C1613] mt-4 leading-snug">
                  “{review.headline}”
                </h3>

                <p className="mt-3 text-sm text-[#54463E] leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E0D2]">
                <p className="font-semibold text-sm text-[#1C1613]">
                  {review.guestName}
                </p>
                <p className="text-xs text-[#6E5D53] mt-0.5">
                  {review.roleOrContext}
                </p>
                <p className="text-xs text-[#8C3A1B] mt-1.5">
                  Ordered: {review.dishOrdered}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Add Guest Review Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <div className="bg-[#FAF6F0] border border-[#DED4C6] rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
              <div>
                <h3
                  id="review-modal-title"
                  className="font-display text-2xl font-semibold text-[#1C1613]"
                >
                  Sign the Guest Ledger
                </h3>
                <p className="text-xs text-[#6E5D53] mt-0.5">
                  Share your tableside or takeaway experience at Spice Haven
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                aria-label="Close review modal"
                className="w-8 h-8 rounded-lg text-[#54463E] hover:text-[#1C1613] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              {formError && (
                <p className="text-xs text-[#A82A1E] bg-[#FBEAE8] border border-[#F0C2BD] rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="rev-name"
                    className="block text-xs font-semibold text-[#1C1613] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="rev-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g., Priya Nair"
                    className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rev-context"
                    className="block text-xs font-semibold text-[#1C1613] mb-1"
                  >
                    Dining Occasion / Context
                  </label>
                  <input
                    id="rev-context"
                    type="text"
                    value={roleOrContext}
                    onChange={(e) => setRoleOrContext(e.target.value)}
                    placeholder="e.g., Friday Evening Tasting"
                    className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="rev-dish"
                    className="block text-xs font-semibold text-[#1C1613] mb-1"
                  >
                    Favorite Dish Ordered
                  </label>
                  <select
                    id="rev-dish"
                    value={dishOrdered}
                    onChange={(e) => setDishOrdered(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613]"
                  >
                    {MENU_ITEMS.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1613] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        aria-label={`Rate ${num} stars`}
                        className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                          rating >= num
                            ? 'text-[#C84B21] border-[#D4B8A8] bg-[#F2ECE1]'
                            : 'text-[#B5A496] border-transparent'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rev-headline"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Review Headline *
                </label>
                <input
                  id="rev-headline"
                  type="text"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Summarize your dining impression in one sentence"
                  className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613]"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-comment"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Your Reflection *
                </label>
                <textarea
                  id="rev-comment"
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details on the flavors, service, and atmosphere..."
                  className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#DED4C6] rounded-lg text-[#1C1613]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#54463E] hover:text-[#1C1613] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Publish Guest Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
