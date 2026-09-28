import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check, Copy, Send } from 'lucide-react';
import { OPENING_HOURS } from '../data/restaurantData';

interface VisitContactSectionProps {
  onOpenReservationModal: () => void;
}

export const VisitContactSection: React.FC<VisitContactSectionProps> = ({
  onOpenReservationModal,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTransitTab, setActiveTransitTab] = useState<'subway' | 'valet' | 'private'>('subway');

  // Contact Us Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTopic, setContactTopic] = useState('Private Dining & Events');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const addressText = '428 Mercer Street, SoHo, New York, NY 10013';

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(addressText).catch(() => {});
    }
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactName.trim() || !emailRegex.test(contactEmail.trim()) || !contactMessage.trim()) {
      setContactError('Please enter your name, a valid email address, and your message.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  return (
    <section
      id="visit"
      className="py-20 lg:py-28 bg-[#FAF6F0] text-[#1C1613] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm text-[#8C3A1B] font-medium tracking-wide">
            Hours, Sanctuary Location & Concierge
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1613] mt-2 leading-[1.1] text-balance">
            Visit Spice Haven & Contact Us
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-[#54463E] leading-relaxed">
            Located in a restored 1890s cast-iron loft in SoHo. Walk-ins are welcomed at our spice bar, though advance reservations are recommended for the main dining room and copper tandoor counter.
          </p>
        </div>

        {/* Two-Column Layout: Opening Hours & Location Left | Contact Us Form Right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Opening Hours + Location & Directions (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Opening Hours Table */}
            <div className="bg-[#F2ECE1] rounded-xl border border-[#E3DACB] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DED4C6]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#C84B21] shrink-0" />
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1613]">
                    Opening Hours
                  </h3>
                </div>
                <span className="text-xs font-medium text-[#2D5A3C]">
                  Kitchen Accepting Orders & Reservations Today
                </span>
              </div>

              <div className="mt-4 divide-y divide-[#E3DACB]">
                {OPENING_HOURS.map((row) => (
                  <div
                    key={row.days}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5"
                  >
                    <div>
                      <p className="font-semibold text-sm text-[#1C1613]">
                        {row.days}
                      </p>
                      <p className="text-xs text-[#6E5D53] mt-0.5">{row.note}</p>
                    </div>
                    <div className="sm:text-right font-mono tabular-nums text-xs sm:text-sm text-[#1C1613] space-y-0.5 shrink-0">
                      <p>Lunch: {row.lunchService}</p>
                      <p className="text-[#54463E]">Dinner: {row.dinnerService}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Interactive Neighborhood Directions Card */}
            <div className="bg-[#F2ECE1] rounded-xl border border-[#E3DACB] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#DED4C6]">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1613]">
                    Location & Getting Here
                  </h3>
                  <p className="text-sm text-[#54463E] mt-1">{addressText}</p>
                  <p className="text-xs text-[#6E5D53] mt-0.5">
                    Between Prince St & Spring St · Ground Floor Cast-Iron Loft
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#1C1613] bg-[#EAE1D3] hover:bg-[#DFD3C0] rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2D5A3C]" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Architectural Neighborhood Map Diagram */}
              <div className="mt-5 rounded-lg overflow-hidden border border-[#D8CEBE] bg-[#181310] text-[#FAF6F0] p-5 relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2 space-y-2">
                    <p className="font-mono text-xs text-[#E8B88A]">
                      40.7248° N, 73.9967° W · SOHO HISTORIC DISTRICT
                    </p>
                    <p className="font-display text-xl font-semibold">
                      428 Mercer Street Sanctuary
                    </p>
                    <p className="text-xs text-[#C9BAA8] leading-relaxed">
                      Look for the hand-forged brass lantern and double walnut doors on the west side of Mercer Street, two blocks north of Spring Street.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <button
                      type="button"
                      onClick={onOpenReservationModal}
                      className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Book Table Now
                    </button>
                    <span className="font-mono tabular-nums text-[11px] text-[#B5A496]">
                      Tel: (212) 555-0194
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Transit / Arrival Tabs */}
              <div className="mt-5">
                <div className="flex items-center gap-1.5 p-1 bg-[#E6DECFE6] rounded-lg border border-[#DED4C6] w-fit">
                  <button
                    type="button"
                    onClick={() => setActiveTransitTab('subway')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeTransitTab === 'subway'
                        ? 'bg-[#1C1613] text-[#FAF6F0]'
                        : 'text-[#54463E] hover:text-[#1C1613]'
                    }`}
                  >
                    Subway & Walking
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTransitTab('valet')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeTransitTab === 'valet'
                        ? 'bg-[#1C1613] text-[#FAF6F0]'
                        : 'text-[#54463E] hover:text-[#1C1613]'
                    }`}
                  >
                    Evening Valet & Parking
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTransitTab('private')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeTransitTab === 'private'
                        ? 'bg-[#1C1613] text-[#FAF6F0]'
                        : 'text-[#54463E] hover:text-[#1C1613]'
                    }`}
                  >
                    Private Dining Vault
                  </button>
                </div>

                <div className="mt-3 text-xs sm:text-sm text-[#54463E] leading-relaxed">
                  {activeTransitTab === 'subway' && (
                    <p>
                      2-minute walk from Prince St Station (R, W trains) or 3-minute walk from Spring St Station (6 train) and Broadway–Lafayette St (B, D, F, M).
                    </p>
                  )}
                  {activeTransitTab === 'valet' && (
                    <p>
                      Dedicated evening valet service is stationed directly at 428 Mercer Street from 5:30 PM nightly ($28 flat evening rate), or use the Mercer-Houston indoor garage 150 feet north.
                    </p>
                  )}
                  {activeTransitTab === 'private' && (
                    <p>
                      Our subterranean Spice Vault seats up to 24 guests around a single live-edge Burmese teak table with dedicated sommelier service and custom printed tasting menus.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Us Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#F2ECE1] rounded-xl border border-[#E3DACB] p-6 sm:p-8">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1613]">
              Contact Us
            </h3>
            <p className="text-sm text-[#54463E] mt-1.5 leading-relaxed">
              Inquire about private dining, dietary accommodations, press visits, or custom catering feasts. Our concierge responds within two hours during service days.
            </p>

            {/* Direct Concierge Channels */}
            <div className="mt-5 pt-4 border-t border-[#DED4C6] space-y-2.5 text-xs sm:text-sm text-[#1C1613]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C84B21] shrink-0" />
                <span className="font-mono tabular-nums">(212) 555-0194</span>
                <span className="text-[#6E5D53]">· Reservations & Takeaway Desk</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C84B21] shrink-0" />
                <span>concierge@spicehaven-nyc.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C84B21] shrink-0" />
                <span>428 Mercer Street, SoHo, New York, NY 10013</span>
              </div>
            </div>

            {contactSubmitted ? (
              <div className="mt-6 p-6 rounded-xl bg-[#FAF6F0] border border-[#C9B9A6] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#2D5A3C] text-white flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-display text-2xl font-semibold text-[#1C1613]">
                  Inquiry Received by Our Concierge
                </h4>
                <p className="text-sm text-[#54463E] leading-relaxed">
                  Thank you, <span className="font-semibold text-[#1C1613]">{contactName}</span>. We have logged your message regarding <span className="font-semibold text-[#1C1613]">{contactTopic}</span> and sent a confirmation copy to <span className="font-mono text-xs">{contactEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactName('');
                    setContactEmail('');
                    setContactPhone('');
                    setContactMessage('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#1C1613] bg-[#EAE1D3] hover:bg-[#DFD3C0] rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-6 pt-5 border-t border-[#DED4C6] space-y-4">
                {contactError && (
                  <p className="text-xs text-[#A82A1E] bg-[#FBEAE8] border border-[#F0C2BD] rounded-lg px-3 py-2">
                    {contactError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#1C1613] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8CEBE] rounded-lg text-[#1C1613] focus:outline-none focus:border-[#C84B21]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1C1613] mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8CEBE] rounded-lg text-[#1C1613] focus:outline-none focus:border-[#C84B21]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#1C1613] mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="(212) 555-0100"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8CEBE] rounded-lg text-[#1C1613] focus:outline-none focus:border-[#C84B21]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-[#1C1613] mb-1"
                  >
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={contactTopic}
                    onChange={(e) => setContactTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8CEBE] rounded-lg text-[#1C1613] focus:outline-none focus:border-[#C84B21]"
                  >
                    <option value="Private Dining & Events">Private Dining & Events (Up to 24 Guests)</option>
                    <option value="Dietary & Allergy Consultation">Dietary & Allergy Consultation</option>
                    <option value="Large Feast Catering Order">Large Feast Catering Order</option>
                    <option value="General Concierge Question">General Concierge Question</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#1C1613] mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your preferred date, guest count, or culinary question..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8CEBE] rounded-lg text-[#1C1613] focus:outline-none focus:border-[#C84B21]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
