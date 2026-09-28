import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { SpiceLevel } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  spiceLevel: SpiceLevel;
  note?: string;
  image: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedPromo,
  onApplyPromo,
}) => {
  const [fulfillmentMode, setFulfillmentMode] = useState<'pickup' | 'delivery'>('pickup');
  const [promoInput, setPromoInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'confirmed'>('cart');

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPostal, setCustomerPostal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card_at_counter' | 'cod'>('card_at_counter');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('SH-2048');
  const [confirmedReceiptTotal, setConfirmedReceiptTotal] = useState(0);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount =
    appliedPromo === 'ROYALFEAST'
      ? 15
      : appliedPromo === 'THALI32'
      ? 10
      : 0;

  const deliveryFee =
    fulfillmentMode === 'delivery' ? (subtotal >= 75 ? 0 : 6) : 0;

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.08875 * 100) / 100;
  const finalTotal = Math.round((taxableAmount + tax + deliveryFee) * 100) / 100;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    onApplyPromo(promoInput.trim().toUpperCase());
    setPromoInput('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setCheckoutError('Please provide your full name and phone number.');
      return;
    }
    if (
      fulfillmentMode === 'delivery' &&
      (!customerAddress.trim() || !customerPostal.trim())
    ) {
      setCheckoutError('Please provide your delivery street address and postal code.');
      return;
    }

    setCheckoutError('');
    setConfirmedOrderNumber(`SH-${Math.floor(1000 + Math.random() * 8999)}`);
    setConfirmedReceiptTotal(finalTotal);
    onClearCart();
    setCheckoutStep('confirmed');
  };

  const resetAndClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
    >
      <div className="bg-[#FAF6F0] text-[#1C1613] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#DED4C6]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5DEC9] flex items-center justify-between gap-4 bg-[#F2ECE1]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C84B21] shrink-0" />
            <h2
              id="order-drawer-title"
              className="font-display text-2xl font-semibold text-[#1C1613]"
            >
              Your Spice Haven Order
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close order bag"
            className="w-9 h-9 rounded-lg text-[#54463E] hover:text-[#1C1613] hover:bg-[#E6DDD0] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {checkoutStep === 'confirmed' ? (
            <div className="py-8 space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-[#2D5A3C] text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="font-mono text-xs text-[#8C3A1B]">
                  ORDER #{confirmedOrderNumber} CONFIRMED
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#1C1613] mt-1">
                  Preparing in Our Tandoor Kitchen
                </h3>
                <p className="text-sm text-[#54463E] mt-2 leading-relaxed">
                  Thank you, <span className="font-semibold text-[#1C1613]">{customerName}</span>. Our chefs have begun roasting spices for your order.
                </p>
              </div>

              <div className="bg-[#F2ECE1] rounded-xl border border-[#DED4C6] p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6E5D53]">Fulfillment:</span>
                  <span className="font-semibold text-[#1C1613] capitalize">
                    {fulfillmentMode} ({fulfillmentMode === 'pickup' ? '25–30 mins' : '35–45 mins'})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E5D53]">Contact Phone:</span>
                  <span className="font-mono tabular-nums text-[#1C1613]">{customerPhone}</span>
                </div>
                {fulfillmentMode === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-[#6E5D53]">Delivery Address:</span>
                    <span className="text-[#1C1613] text-right">
                      {customerAddress}, {customerPostal}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#DED4C6] flex justify-between text-sm font-semibold">
                  <span>Total Authorized:</span>
                  <span className="font-mono tabular-nums">${confirmedReceiptTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1C1613] rounded-lg hover:bg-[#C84B21] transition-colors cursor-pointer"
              >
                Return to Spice Haven
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="font-display text-2xl font-semibold text-[#1C1613]">
                Your order bag is empty
              </p>
              <p className="text-sm text-[#6E5D53] max-w-xs mx-auto leading-relaxed">
                Explore our wood-fired tandoor specialties, slow-simmered curries, and Awadhi biryanis to begin your feast.
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors"
              >
                <span>Browse Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : checkoutStep === 'cart' ? (
            <>
              {/* Fulfillment Mode Toggle */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EFE8DC] rounded-lg border border-[#E2D9C8]">
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('pickup')}
                  className={`py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    fulfillmentMode === 'pickup'
                      ? 'bg-[#1C1613] text-[#FAF6F0]'
                      : 'text-[#54463E] hover:text-[#1C1613]'
                  }`}
                >
                  Pickup · 25 Mins
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('delivery')}
                  className={`py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    fulfillmentMode === 'delivery'
                      ? 'bg-[#1C1613] text-[#FAF6F0]'
                      : 'text-[#54463E] hover:text-[#1C1613]'
                  }`}
                >
                  Delivery · Free over $75
                </button>
              </div>

              {/* Itemized List */}
              <div className="divide-y divide-[#E5DEC9]">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="py-4 flex gap-3.5 items-start">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1E1815] shrink-0 border border-[#DED4C6]">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-[#1C1613] leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-mono tabular-nums text-sm font-medium text-[#1C1613] shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-[#6E5D53] mt-0.5">
                        {item.spiceLevel}
                        {item.note ? ` · Note: ${item.note}` : ''}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#D8CEBE] rounded-md bg-[#F2ECE1]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center text-[#1C1613] hover:bg-[#E5DEC9] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono tabular-nums text-xs px-2.5 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center text-[#1C1613] hover:bg-[#E5DEC9] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="text-xs text-[#8C7A6B] hover:text-[#A82A1E] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handlePromoSubmit} className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g., ROYALFEAST)"
                  aria-label="Promo code"
                  className="flex-1 px-3 py-2 text-xs font-mono uppercase bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold text-[#1C1613] bg-[#EAE1D3] hover:bg-[#DFD3C0] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {appliedPromo && (
                <p className="text-xs text-[#2D5A3C] font-medium">
                  Active privilege code: <span className="font-mono">{appliedPromo}</span> (-${discountAmount.toFixed(2)})
                </p>
              )}
            </>
          ) : (
            /* Step 2: Customer Verification & Delivery Details */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold text-[#1C1613]">
                  Guest Verification & Payment
                </h3>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs font-medium text-[#8C3A1B] hover:underline cursor-pointer"
                >
                  Edit Items
                </button>
              </div>

              {checkoutError && (
                <p className="text-xs text-[#A82A1E] bg-[#FBEAE8] border border-[#F0C2BD] rounded-lg px-3 py-2">
                  {checkoutError}
                </p>
              )}

              <div>
                <label
                  htmlFor="cust-name"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="cust-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
              </div>

              <div>
                <label
                  htmlFor="cust-phone"
                  className="block text-xs font-semibold text-[#1C1613] mb-1"
                >
                  Mobile Phone for Kitchen Updates *
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(212) 555-0142"
                  className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                />
              </div>

              {fulfillmentMode === 'delivery' && (
                <>
                  <div>
                    <label
                      htmlFor="cust-addr"
                      className="block text-xs font-semibold text-[#1C1613] mb-1"
                    >
                      Street Address & Apartment *
                    </label>
                    <input
                      id="cust-addr"
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="140 Greene Street, Apt 4B"
                      className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cust-zip"
                      className="block text-xs font-semibold text-[#1C1613] mb-1"
                    >
                      Postal Code *
                    </label>
                    <input
                      id="cust-zip"
                      type="text"
                      required
                      value={customerPostal}
                      onChange={(e) => setCustomerPostal(e.target.value)}
                      placeholder="10012"
                      className="w-full px-3.5 py-2 text-sm bg-[#F2ECE1] border border-[#D8CEBE] rounded-lg text-[#1C1613]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1C1613] mb-1.5">
                  Payment Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card_at_counter')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center cursor-pointer ${
                      paymentMethod === 'card_at_counter'
                        ? 'bg-[#1C1613] text-[#FAF6F0] border-[#1C1613]'
                        : 'bg-[#F2ECE1] text-[#54463E] border-[#D8CEBE]'
                    }`}
                  >
                    Card on Handover
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#1C1613] text-[#FAF6F0] border-[#1C1613]'
                        : 'bg-[#F2ECE1] text-[#54463E] border-[#D8CEBE]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Sticky Footer Receipt & Action */}
        {cartItems.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="p-5 sm:p-6 border-t border-[#E5DEC9] bg-[#F2ECE1] space-y-4">
            <div className="space-y-1.5 text-xs text-[#54463E] font-mono tabular-nums">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2D5A3C]">
                  <span>Privilege Discount ({appliedPromo})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {fulfillmentMode === 'delivery' && (
                <div className="flex justify-between">
                  <span>Insulated Courier Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>NYC Hospitality Tax (8.875%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#DED4C6] flex justify-between text-base font-semibold text-[#1C1613]">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('details')}
                className="w-full py-3 px-5 text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
              >
                Proceed to Checkout — ${finalTotal.toFixed(2)}
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 px-5 text-sm font-semibold text-white bg-[#C84B21] rounded-lg hover:bg-[#B03E18] transition-colors cursor-pointer whitespace-nowrap"
              >
                Confirm Order — ${finalTotal.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
