import heroFeastImg from '../assets/images/hero_spice_haven_feast_1790580500820.jpg';
import dishBiryaniImg from '../assets/images/dish_saffron_biryani_1790580513282.jpg';
import dishButterChickenImg from '../assets/images/dish_smoked_butter_chicken_1790580526022.jpg';
import dishPaneerTikkaImg from '../assets/images/dish_charred_paneer_tikka_1790580539599.jpg';
import interiorDiningImg from '../assets/images/interior_spice_haven_dining_1790580550951.jpg';

export type MenuCategory =
  | 'all'
  | 'tandoor'
  | 'curries'
  | 'biryani_breads'
  | 'desserts_drinks';

export type SpiceLevel = 'Mild & Aromatic' | 'Medium Warmth' | 'Fiery Heritage';

export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<MenuCategory, 'all'>;
  categoryLabel: string;
  price: number;
  isPopular: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  spiceLevel: SpiceLevel;
  prepTime: string;
  originRegion: string;
  description: string;
  chefNotes: string;
  pairingSuggestion: string;
  image: string;
  calories: number;
}

export interface SpecialOffer {
  id: string;
  indexNumber: string;
  title: string;
  timingLabel: string;
  originalPrice: number;
  offerPrice: number;
  savingsText: string;
  description: string;
  includedHighlights: string[];
  promoCode: string;
  image: string;
  actionType: 'order' | 'reserve';
}

export interface CustomerReview {
  id: string;
  guestName: string;
  roleOrContext: string;
  visitDate: string;
  dishOrdered: string;
  rating: number;
  headline: string;
  comment: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'culinary' | 'atmosphere';
  categoryLabel: string;
  caption: string;
  craftDetail: string;
  image: string;
  spanClass: string;
}

export const IMAGES = {
  heroFeast: heroFeastImg,
  biryani: dishBiryaniImg,
  butterChicken: dishButterChickenImg,
  paneerTikka: dishPaneerTikkaImg,
  interiorDining: interiorDiningImg,
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'royal-awadhi-biryani',
    name: 'Royal Awadhi Saffron Lamb Biryani',
    subtitle: 'Dum-sealed in hammered brass with two-year aged Himalayan basmati',
    category: 'biryani_breads',
    categoryLabel: 'Biryani & Breads',
    price: 34,
    isPopular: true,
    isVegetarian: false,
    isGlutenFree: true,
    spiceLevel: 'Medium Warmth',
    prepTime: '30 min',
    originRegion: 'Lucknow, Uttar Pradesh',
    description:
      'Pasture-raised lamb shoulder braised for six hours in bone marrow stock, layered with Pampore saffron-steeped basmati rice, caramelized rose-water shallots, and wild mint. Sealed with whole-wheat dough and slow-steamed over glowing embers.',
    chefNotes:
      'Served tableside with roasted garlic burani raita and house-fermented green chili achar.',
    pairingSuggestion: 'Pairs with Smoked Cardamom Old Fashioned or Pinot Noir',
    image: dishBiryaniImg,
    calories: 780,
  },
  {
    id: 'old-delhi-butter-chicken',
    name: 'Old Delhi Smoked Butter Chicken Makhani',
    subtitle: 'Char-grilled heirloom chicken in 24-hour simmered San Marzano & fenugreek reduction',
    category: 'curries',
    categoryLabel: 'Slow-Simmered Curries',
    price: 29,
    isPopular: true,
    isVegetarian: false,
    isGlutenFree: true,
    spiceLevel: 'Mild & Aromatic',
    prepTime: '20 min',
    originRegion: 'Daryaganj, Old Delhi',
    description:
      'Free-range chicken thighs marinated twice in hung yogurt, ginger juice, and Kashmiri Deggi Mirch, blistered in our 900°F copper tandoor, then folded into a velvety tomato-cashew gravy finished with dhungar clove smoke and cultured white butter.',
    chefNotes:
      'Our signature curry uses zero refined sugar—sweetness comes strictly from slow-roasted vine tomatoes.',
    pairingSuggestion: 'Best enjoyed with Flaky Ghee Lachha Paratha',
    image: dishButterChickenImg,
    calories: 710,
  },
  {
    id: 'kashmiri-paneer-tikka',
    name: 'Tandoor-Charred Kashmiri Paneer & Black Mission Figs',
    subtitle: 'House-pressed organic milk paneer glazed with saffron yogurt & black cardamom',
    category: 'tandoor',
    categoryLabel: 'Tandoor & Starters',
    price: 24,
    isPopular: true,
    isVegetarian: true,
    isGlutenFree: true,
    spiceLevel: 'Medium Warmth',
    prepTime: '18 min',
    originRegion: 'Srinagar Valley',
    description:
      'Hand-cut blocks of fresh daily paneer stuffed with roasted pistachio-fig chutney, basted in mustard-oil and saffron curd, and skewered over white oak charcoal until golden and smoky.',
    chefNotes:
      'Plated with charred heirloom bell peppers, pickled pearl onions, and stone-ground coriander-mint chutney.',
    pairingSuggestion: 'Pairs with Darjeeling First Flush Sparkling Tea',
    image: dishPaneerTikkaImg,
    calories: 520,
  },
  {
    id: 'gunpowder-lamb-chops',
    name: 'Char-Grilled Nilgiri Spice Lamb Chops',
    subtitle: 'Prime rack chops crusted with toasted Tellicherry peppercorn & curry leaf',
    category: 'tandoor',
    categoryLabel: 'Tandoor & Starters',
    price: 38,
    isPopular: true,
    isVegetarian: false,
    isGlutenFree: true,
    spiceLevel: 'Fiery Heritage',
    prepTime: '22 min',
    originRegion: 'Nilgiri Hills, Tamil Nadu',
    description:
      'Frenched Colorado lamb rack chops marinated for 24 hours in raw papaya, stone-ground black pepper, roasted fennel, and cold-pressed gingelly oil, seared over open birch embers for a crisp spice crust and rosy center.',
    chefNotes:
      'Accompanied by smoked tamarind-jaggery reduction and crispy lotus root chips.',
    pairingSuggestion: 'Pairs with Syrah or Masala Tamarind Sour',
    image: heroFeastImg,
    calories: 690,
  },
  {
    id: 'dal-spice-haven',
    name: '36-Hour Black Lentil Dal Spice Haven',
    subtitle: 'Whole urad lentils simmered overnight on dying tandoor embers',
    category: 'curries',
    categoryLabel: 'Slow-Simmered Curries',
    price: 23,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: true,
    spiceLevel: 'Mild & Aromatic',
    prepTime: '15 min',
    originRegion: 'Amritsar, Punjab',
    description:
      'Heirloom black urad lentils slowly coaxed over low charcoal heat for 36 hours with fresh ginger juliennes, crushed garlic, tomato puree, and hand-churned artisanal butter.',
    chefNotes:
      'A non-negotiable centerpiece on every traditional North Indian feast table.',
    pairingSuggestion: 'Essential alongside Truffle & Black Garlic Naan',
    image: dishButterChickenImg,
    calories: 580,
  },
  {
    id: 'malabar-prawn-moilee',
    name: 'Malabar Wild Tiger Prawn Coconut Moilee',
    subtitle: 'Simmered in first-press coconut milk, kokum petal & crackled mustard seed',
    category: 'curries',
    categoryLabel: 'Slow-Simmered Curries',
    price: 35,
    isPopular: false,
    isVegetarian: false,
    isGlutenFree: true,
    spiceLevel: 'Medium Warmth',
    prepTime: '20 min',
    originRegion: 'Fort Kochi, Kerala',
    description:
      'Wild-caught jumbo tiger prawns gently poached in a fragrant coastal reduction of freshly pressed coconut milk, green bird’s-eye chilies, fresh turmeric root, and crisp curry leaves.',
    chefNotes:
      'Balanced with tangy coastal kokum fruit and served with steamed red matta rice.',
    pairingSuggestion: 'Pairs with dry Riesling or Grüner Veltliner',
    image: heroFeastImg,
    calories: 610,
  },
  {
    id: 'truffle-garlic-naan-basket',
    name: 'Artisanal Tandoor Bread Basket',
    subtitle: 'Truffle & Black Garlic Naan, Flaky Ghee Lachha Paratha, and Rosemary Kulcha',
    category: 'biryani_breads',
    categoryLabel: 'Biryani & Breads',
    price: 16,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: false,
    spiceLevel: 'Mild & Aromatic',
    prepTime: '12 min',
    originRegion: 'North Indian Craft Bakery',
    description:
      'Three warm, blistered breads slapped onto the clay wall of our copper tandoor to order: fermented sourdough garlic naan brushed with black truffle ghee, multi-layered whole-wheat lachha paratha, and goat cheese kulcha.',
    chefNotes:
      'Fermented for 48 hours using our house yogurt starter for airy lightness.',
    pairingSuggestion: 'Ideal for mopping up Smoked Butter Chicken and 36-Hour Dal',
    image: heroFeastImg,
    calories: 640,
  },
  {
    id: 'wild-morel-jackfruit-biryani',
    name: 'Himalayan Morel & Young Jackfruit Biryani',
    subtitle: 'Foraged Kashmiri guchhi mushrooms & tender kathal under saffron crust',
    category: 'biryani_breads',
    categoryLabel: 'Biryani & Breads',
    price: 31,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: true,
    spiceLevel: 'Medium Warmth',
    prepTime: '25 min',
    originRegion: 'Kashmir & Awadh',
    description:
      'Earthy wild Himalayan morels stuffed with spiced khoya and slow-braised young green jackfruit layered with aged basmati rice, kewra essence, toasted mace, and crispy shallots.',
    chefNotes:
      'Served with smoked eggplant mirchi ka salan and pomegranate mint raita.',
    pairingSuggestion: 'Pairs with Nebbiolo or Rosewater Lassi',
    image: dishBiryaniImg,
    calories: 650,
  },
  {
    id: 'saffron-pistachio-kulfi-falooda',
    name: 'Pampore Saffron & Iranian Pistachio Kulfi',
    subtitle: 'Reduced buffalo-milk ice cream with rosewater vermicelli & 24k gold leaf',
    category: 'desserts_drinks',
    categoryLabel: 'Artisanal Desserts & Chai',
    price: 17,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: true,
    spiceLevel: 'Mild & Aromatic',
    prepTime: '10 min',
    originRegion: 'Royal Mughal Kitchens',
    description:
      'Whole milk slowly reduced for four hours with green cardamom pods, steeped with Grade-A Kashmiri saffron and roasted green pistachios, set in traditional conical molds and crowned with Damascus rose syrup.',
    chefNotes:
      'Finished with sweet basil seeds, candied rose petals, and edible silver-gold leaf.',
    pairingSuggestion: 'Pairs with Artisanal Clay-Cup Masala Chai',
    image: dishPaneerTikkaImg,
    calories: 440,
  },
  {
    id: 'clay-cup-masala-chai',
    name: 'Kettle-Brewed Assam Masala Chai & Cardamom Shortbread',
    subtitle: 'Single-estate Assam CTC crushed with fresh ginger, green cardamom & cinnamon',
    category: 'desserts_drinks',
    categoryLabel: 'Artisanal Desserts & Chai',
    price: 11,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: false,
    spiceLevel: 'Mild & Aromatic',
    prepTime: '8 min',
    originRegion: 'Upper Assam & Kolkata',
    description:
      'Bold malty Assam tea leaves boiled in whole farm milk with freshly pounded mortar-and-pestle spices—green cardamom, Tellicherry black pepper, cloves, and crushed ginger root. Served in unglazed terracotta kulhads alongside two warm jaggery-pistachio shortbreads.',
    chefNotes:
      'Poured from height for a natural frothy crema that unlocks the roasted spice aromatics.',
    pairingSuggestion: 'The quintessential conclusion to any Spice Haven feast',
    image: interiorDiningImg,
    calories: 260,
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'royal-tasting-for-two',
    indexNumber: '01',
    title: 'The Royal Awadhi Tasting Table for Two',
    timingLabel: 'Available Nightly · 5-Course Curated Feast',
    originalPrice: 145,
    offerPrice: 118,
    savingsText: 'Save $27 per couple',
    description:
      'Our flagship shared culinary journey across Northern & Coastal India. Includes Tandoor-Charred Kashmiri Paneer Tikka, Nilgiri Lamb Chops, Old Delhi Smoked Butter Chicken, Royal Saffron Biryani, Artisanal Bread Basket, and Saffron Kulfi for two.',
    includedHighlights: [
      '2 Tandoor Starters & 2 Signature Mains',
      'Artisanal Truffle Naan Basket & Raita',
      'Complimentary Welcome Masala Chai or Spiced Aperitif',
    ],
    promoCode: 'ROYALFEAST',
    image: heroFeastImg,
    actionType: 'order',
  },
  {
    id: 'weekday-express-thali',
    indexNumber: '02',
    title: 'The Silk Route Executive Lunch Thali',
    timingLabel: 'Tue–Fri · 12:00 PM – 2:45 PM',
    originalPrice: 44,
    offerPrice: 32,
    savingsText: 'Save $12 on weekday lunch',
    description:
      'Served on a traditional hand-beaten brass platter: choose one signature curry (Butter Chicken, Malabar Prawn, or Kashmiri Paneer), paired with 36-Hour Black Dal, aged basmati pulao, warm garlic naan, kachumber salad, and sweet gulab jamun.',
    includedHighlights: [
      'Guaranteed 20-minute tableside or pickup cadence',
      'Includes 6 balanced brass katori accompaniments',
      'Available for dine-in or priority online pickup',
    ],
    promoCode: 'THALI32',
    image: dishButterChickenImg,
    actionType: 'order',
  },
  {
    id: 'chefs-tandoor-counter-supper',
    indexNumber: '03',
    title: 'Chef’s Copper Tandoor Counter & Spice Pairing',
    timingLabel: 'Thu–Sun · 6:30 PM & 8:45 PM Seatings',
    originalPrice: 135,
    offerPrice: 110,
    savingsText: 'Complimentary Spice Tin Gift ($25 value)',
    description:
      'Intimate 8-seat counter overlooking our glowing copper tandoor ovens. Watch Executive Chef Vikramaditya Sen roast, smoke, and plate seven seasonal tasting courses paired with botanical elixirs and take home our custom hand-ground garam masala tin.',
    includedHighlights: [
      '7-course interactive chef counter menu',
      'Direct view of the live wood-fired copper tandoors',
      'Take-home signed heirloom garam masala blend',
    ],
    promoCode: 'TANDOORCOUNTER',
    image: interiorDiningImg,
    actionType: 'reserve',
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    guestName: 'Eleanor Vance',
    roleOrContext: 'Senior Dining Critic, Manhattan Culinary Review',
    visitDate: 'August 2026',
    dishOrdered: 'Royal Awadhi Saffron Lamb Biryani',
    rating: 5,
    headline: 'When the pastry seal was cracked tableside, the entire table fell silent.',
    comment:
      'Most modern Indian restaurants choose between traditional soul and contemporary finesse. Spice Haven refuses to compromise. Cracking open the dough-sealed brass handi of Awadhi Lamb Biryani released a cloud of Pampore saffron and charred bone marrow aroma I have not experienced outside of Old Lucknow. Our table of four ordered a second bread basket just to finish every drop of the 36-hour black lentil dal.',
  },
  {
    id: 'rev-2',
    guestName: 'Arjun & Maya Mehta',
    roleOrContext: 'Anniversary Guests · Chef’s Copper Tandoor Counter',
    visitDate: 'September 2026',
    dishOrdered: 'Old Delhi Smoked Butter Chicken & Kashmiri Paneer Tikka',
    rating: 5,
    headline: 'Freshly stone-ground spices make an unmistakable difference on the palate.',
    comment:
      'We booked the 7:30 PM Tandoor Counter seating for our fifth anniversary. Watching the chefs slap truffle garlic naan inside the glowing copper oven while explaining the difference between Kashmiri Deggi Mirch and Tellicherry pepper turned dinner into theatre. The Smoked Butter Chicken had zero cloying sweetness—only deep roasted tomato, fenugreek leaf, and real charcoal smoke.',
  },
  {
    id: 'rev-3',
    guestName: 'Marcus Thorne',
    roleOrContext: 'Verified Online Pickup & Private Dining Host, SoHo',
    visitDate: 'September 2026',
    dishOrdered: 'The Royal Awadhi Tasting Table for Two',
    rating: 5,
    headline: 'Even our online takeaway arrived piping hot in insulated brass-lined packaging.',
    comment:
      'After dining in the main room twice, we ordered The Royal Awadhi Tasting Table for a Friday night at home. Every chutney was labeled with pairing notes, the Nilgiri Lamb Chops were still medium-rare and smoky, and the saffron kulfi held its texture. Easily the most reliable luxury dining experience in downtown New York.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Grand Spice Table',
    category: 'culinary',
    categoryLabel: 'Culinary Craft',
    caption: 'Evening Tasting Spread · Hammered Copper & Honed Slate',
    craftDetail: 'Whole star anise, green cardamom pods, and Pampore saffron threads toasted fresh before every service.',
    image: heroFeastImg,
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'gal-2',
    title: 'The Main Dining Room at Dusk',
    category: 'atmosphere',
    categoryLabel: 'Dining Room & Atmosphere',
    caption: 'Warm Ochre Venetian Plaster & Hand-Blown Amber Glass',
    craftDetail: 'Designed for unhurried conversation with acoustic walnut paneling and view of the glowing open tandoor kitchen.',
    image: interiorDiningImg,
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-3',
    title: 'Dum Pukht Saffron Lamb Biryani',
    category: 'culinary',
    categoryLabel: 'Culinary Craft',
    caption: 'Sealed in Brass · 6-Hour Slow Ember Braise',
    craftDetail: 'Two-year aged Himalayan basmati grains steamed over lamb stock, kewra water, and crispy shallots.',
    image: dishBiryaniImg,
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-4',
    title: 'Old Delhi Smoked Makhani',
    category: 'culinary',
    categoryLabel: 'Culinary Craft',
    caption: 'Clove-Smoke Infused · Cultured White Butter',
    craftDetail: '24-hour simmered vine tomatoes finished with crushed Kasuri methi and flaky multi-layered lachha paratha.',
    image: dishButterChickenImg,
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-5',
    title: 'Tandoor-Charred Kashmiri Paneer',
    category: 'culinary',
    categoryLabel: 'Culinary Craft',
    caption: '900°F White Oak Charcoal · Fig & Pistachio Filling',
    craftDetail: 'House-pressed organic curds marinated in saffron yogurt and plated with stone-ground mint chutney.',
    image: dishPaneerTikkaImg,
    spanClass: 'md:col-span-2 md:row-span-1',
  },
];

export interface OpeningHourRow {
  days: string;
  lunchService: string;
  dinnerService: string;
  note: string;
}

export const OPENING_HOURS: OpeningHourRow[] = [
  {
    days: 'Tuesday – Thursday',
    lunchService: '12:00 PM – 2:45 PM',
    dinnerService: '5:30 PM – 10:30 PM',
    note: 'Silk Route Express Thali available at lunch',
  },
  {
    days: 'Friday',
    lunchService: '12:00 PM – 3:00 PM',
    dinnerService: '5:00 PM – 11:30 PM',
    note: 'Live classical sarod performance 7:30 PM',
  },
  {
    days: 'Saturday',
    lunchService: '11:30 AM – 3:30 PM',
    dinnerService: '5:00 PM – 11:30 PM',
    note: 'Weekend Royal Brunch & Evening Tasting',
  },
  {
    days: 'Sunday',
    lunchService: '11:30 AM – 3:30 PM',
    dinnerService: '5:00 PM – 10:00 PM',
    note: 'Family Feast Handi service all evening',
  },
  {
    days: 'Monday',
    lunchService: 'Closed for Spice Roasting',
    dinnerService: 'Private Events Only',
    note: 'Weekly whole-spice grinding & stock preparation',
  },
];
