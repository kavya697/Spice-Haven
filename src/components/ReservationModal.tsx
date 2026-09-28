import React, { useState, useEffect } from 'react';
import { X, Calendar, Check } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSeatingZone?: string;
  defaultSpecialOfferTitle?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  defaultSeatingZone,
  defaultSpecialOfferTitle,
}) => {
  const [date, setDate] = useState('2026-10-02');
  const [guests, setGuests] = useState('2 Guests');
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [seatingZone, setSeatingZone] = useState(
    defaultSeatingZone || 'Main Dining Room'
  );
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [occasionNote, setOccasionNote] = useState('');
  const [error, setError] = useState('');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  useEffect(() => {
    if (defaultSeatingZone) {
      setSeatingZone(defaultSeatingZone);
    }
    if (defaultSpecialOfferTitle) {
      setOccasionNote(`Requested Tasting: ${defaultSpecialOfferTitle}`);
    }
  }, [defaultSeatingZone, defaultSpecialOfferTitle]);

  if (!isOpen) return null;

  const timeSlots = [
    '12:15 PM',
    '1:30 PM',
    '5:30 PM',
    '6:30 PM',
    '7:30 PM',
    '8:45 PM',
    '9:30 PM',
  ];

  const seatingZones = [
    {
      name: 'Main Dining Room',
      desc: 'Warm Venetian plaster walls & walnut tables',
    },
    {
      name: 'Chef’s Copper Tandoor Counter',
      desc: 'Front-row seats overlooking the 900°F wood-fired ovens',
    },
    {
      name: 'Candlelit Spice Library Alcove',
      desc: 'Intimate semi-private banquette for quiet conversation',
    },
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guestName.trim() || !emailRegex.test(guestEmail.trim()) || !guestPhone.trim()) {
      setError('Please provide your full name, valid email address, and mobile number.');
      return;
    }
    setError('');
    setConfirmedCode(`SH-TBL-${Math.floor(100 + Math.random() * 899)}`);
  };

  const handleClose = () => {
    setConfirmedCode(null);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
    >
      <div className="bg-[#FAF6F0] text-[#1C1613] border border-[#DED4C6] rounded-xl max-w-xl w-full overflow-hidden shadow-2xl my-8">
        {/* Top Bar */}
        <div className="px-6 py-5 bg-[#14100E] text-[#FAF6F0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#E8B88A] shrink-0" />
            <div>
              <h2
                id="reservation-modal-title"
                className="font-display text-2xl font-semibold"
              >
                Reserve a Table at Spice Haven
              </h2>
              <p className="text-xs text-[#B5A496]">
                428 Mercer Street, SoHo · Instant Table Confirmation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close reservation dialog"
            className="w-9 h-9 rounded-lg text-[#D5C7B8] hover:text-white hover:bg-[#261E19] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedCode ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#2D5A3C] text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-xs text-[#8C3A1B]">
                RESERVATION REFERENCE: {confirmedCode}
              </p>
              <h3 className="font-display text-3xl font-semibold text-[#1C1613] mt-1">
                Your Table is Reserved
              </h3>
              <p className="text-sm text-[#54463E] mt-2">
                We look forward to welcoming you, <span className="font-semibold text-[#1C1613]">{guestName}</span>. A calendar invitation has been sent to <span className="font-mono text-xs">{guestEmail}</span>.
              </p>
            </div>

            <div className="bg-[#F2ECE1] rounded-xl border border-[#DED4C6] p-5 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[#6E5D53]">Date & Time:</span>
                <span className="font-mono tabular-nums font-semibold text-[#1C1613]">
                  {date} at {timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E5D53]">Party Size:</span>
                <span className="font-semibold text-[#1C1613]">{guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E5D53]">Seating Sanctuary:</span>
                <span className="font-semibold text-[#1C1613]">{seatingZone}</span>
              </div>
              {occasionNote && (
                <div className="flex justify-between">
                  <span className="text-[#6E5D53]">Kitchen Note:</span>
                  <span className="text-[#1C1613] text-right">{occasionNote}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 px-5 text-sm font-semibold text-white bg-[#1C1613] rounded-lg hover:bg-[#C84B21] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="p-6 sm:p-7 space-y-5">
            {error && (
              <p className="text-xs text-[#A82A1E] bg-[#FBEAE8] border border-[#F0C2BD] rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Date & Party Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="res-date"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Date *
                </label>
                <input
                  id="res-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm font-mono bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
              </div>

              <div>
                <label
                  htmlFor="res-guests"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Party Size *
                </label>
                <select
                  id="res-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5 Guests">5 Guests</option>
                  <option value="6 Guests">6 Guests</option>
                  <option value="8 Guests (Chef’s Table)">8 Guests (Chef’s Table)</option>
                </select>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1C1613] mb-2">
                Select Seating Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2.5 text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                      timeSlot === slot
                        ? 'bg-[#1C1613] text-[#FAF6F0] border-[#1C1613]'
                        : 'bg-[#F2ECE1] text-[#54463E] border-[#D8CEBE] hover:border-[#1C1613]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Area Preference */}
            <div>
              <label className="block text-xs font-semibold text-[#1C1613] mb-2">
                Seating Area Preference
              </label>
              <div className="space-y-2">
                {seatingZones.map((zone) => (
                  <button
                    key={zone.name}
                    type="button"
                    onClick={() => setSeatingZone(zone.name)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                      seatingZone === zone.name
                        ? 'bg-[#F2ECE1] border-[#C84B21]'
                        : 'bg-[#FAF6F0] border-[#E3DACB] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#1C1613]">
                        {zone.name}
                      </p>
                      <p className="text-xs text-[#6E5D53]">{zone.desc}</p>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        seatingZone === zone.name
                          ? 'border-[#C84B21] bg-[#C84B21]'
                          : 'border-[#B5A496]'
                      }`}
                    >
                      {seatingZone === zone.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="res-name"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
              </div>
              <div>
                <label
                  htmlFor="res-email"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Email *
                </label>
                <input
                  id="res-email"
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
              </div>
              <div>
                <label
                  htmlFor="res-phone"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Mobile *
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="(212) 555-0199"
                  className="w-full px-3 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="res-note"
                className="block text-xs font-semibold text-[#1C1613] mb-1"
              >
                Occasion or Dietary Notes (Optional)
              </label>
              <input
                id="res-note"
                type="text"
                value={occasionNote}
                onChange={(e) => setOccasionNote(e.target.value)}
                placeholder="e.g., Anniversary celebration, nut allergy, sommelier pairing..."
                className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-medium text-[#54463E] hover:text-[#1C1613] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
