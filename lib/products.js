export const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "diffusers", label: "Diffusers" },
  { id: "refills", label: "Refills" },
  { id: "bundles", label: "Bundles" },
  { id: "kits", label: "Starter kits" },
];

export const SCENT_FAMILIES = [
  { id: "all", label: "All scents" },
  { id: "forest", label: "Forest" },
  { id: "kitchen", label: "Kitchen" },
  { id: "citrus", label: "Citrus" },
  { id: "floral", label: "Floral" },
  { id: "fresh", label: "Fresh linen" },
];

export const COLORWAYS = [
  { name: "Sage", hex: "#8b9a7d", soft: "#dbe3d0" },
  { name: "Oat", hex: "#e7ddc9", soft: "#f3ecdf" },
  { name: "Clay", hex: "#c49176", soft: "#edd6c8" },
];

export const PRODUCTS = [
  {
    id: "p_trail_diffuser",
    slug: "scenttrail-diffuser",
    name: "The ScentTrail Diffuser",
    shortName: "Trail Diffuser",
    tagline: "A quiet, analog scent machine for rooms that deserve a ritual.",
    description:
      "Our signature diffuser turns a compostable scent pod into a slow, even release of fragrance. No cords, no app, no blue light. Turn the dial, choose a rhythm and let the room change around you.",
    price: 89,
    compareAt: null,
    category: "diffusers",
    family: "forest",
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 214,
    colors: COLORWAYS,
    notes: ["Cedar leaf", "Roasted peanut", "Wet moss"],
    includes: ["1 ScentTrail Diffuser", "1 Wild Forest scent pod", "USB-C rechargeable battery", "Quick-start trail card"],
    specs: [
      ["Run time", "Up to 45 days per pod"],
      ["Coverage", "Rooms up to 450 sq ft"],
      ["Charge", "USB-C, 8 hours per charge"],
      ["Materials", "Recycled aluminium & bio-resin"],
    ],
    art: { kind: "diffuser", bg: "sage", base: "#8b9878", accent: "#6c7a5b", label: "#f2ead8" },
    featured: true,
    span: "large",
  },
  {
    id: "p_ultimate_bundle",
    slug: "ultimate-trail-bundle",
    name: "Ultimate Trail Bundle",
    shortName: "Ultimate Bundle",
    tagline: "The full trail: one diffuser, two refill packs and a starter set.",
    description:
      "Everything you need to begin, keep going and wander a little further. The Ultimate Trail Bundle pairs our diffuser with two full refill packs and the three-pod starter set, wrapped in our recycled paper travel box.",
    price: 149,
    compareAt: 189,
    category: "bundles",
    family: "forest",
    badge: "Save $40",
    rating: 4.9,
    reviewCount: 96,
    colors: COLORWAYS,
    notes: ["Wild Forest", "Savory Broth", "Golden Hour"],
    includes: ["1 ScentTrail Diffuser", "2 refill packs (6 pods)", "3-pod starter set", "Travel pouch"],
    specs: [
      ["Pods included", "9 compostable pods"],
      ["Scent range", "Three signature trails"],
      ["Packaging", "100% recycled & recyclable"],
      ["Gift ready", "Yes, with hand-pressed seal"],
    ],
    art: { kind: "bundle", bg: "sand", base: "#8b9878", accent: "#c49176", label: "#f2ead8" },
    featured: true,
    photo: "/with.png",
    span: "wide",
  },
  {
    id: "p_wild_forest",
    slug: "wild-forest-refill-pack",
    name: "Wild Forest Refill Pack",
    shortName: "Wild Forest",
    tagline: "Cedar leaf, roasted peanut and wet moss after rain.",
    description:
      "A walk under a cool canopy. Wild Forest opens with leaf-green freshness, softens into roasted peanut and settles on damp moss. Three compostable pods, roughly 45 days each.",
    price: 24,
    compareAt: null,
    category: "refills",
    family: "forest",
    badge: "Signature",
    rating: 4.8,
    reviewCount: 187,
    colors: [],
    notes: ["Cedar leaf", "Roasted peanut", "Wet moss"],
    includes: ["3 compostable scent pods", "Scent notes card", "Refill guide"],
    specs: [
      ["Pods", "3 per pack"],
      ["Run time", "Up to 45 days per pod"],
      ["Materials", "Plant-based compostable shell"],
      ["Made in", "Portland, Oregon"],
    ],
    art: { kind: "refill", bg: "forest", base: "#5e6b50", accent: "#9caa7e", label: "#f2ead8" },
    featured: true,
    span: "small",
  },
  {
    id: "p_savory_broth",
    slug: "savory-broth-refill-pack",
    name: "Savory Broth Refill Pack",
    shortName: "Savory Broth",
    tagline: "Shiitake, miso and bay leaf for the kitchen table.",
    description:
      "A warm, savory trail for the room where everything happens. Shiitake and bay leaf meet a gentle miso base for a scent that feels like a pot on the stove, without the smoke.",
    price: 24,
    compareAt: null,
    category: "refills",
    family: "kitchen",
    badge: "New",
    rating: 4.7,
    reviewCount: 84,
    colors: [],
    notes: ["Shiitake", "Miso", "Bay leaf"],
    includes: ["3 compostable scent pods", "Scent notes card", "Refill guide"],
    specs: [
      ["Pods", "3 per pack"],
      ["Run time", "Up to 45 days per pod"],
      ["Materials", "Plant-based compostable shell"],
      ["Made in", "Portland, Oregon"],
    ],
    art: { kind: "refill", bg: "clay", base: "#a36e55", accent: "#d3a285", label: "#f7eddf" },
    featured: true,
    span: "small",
  },
  {
    id: "p_golden_hour",
    slug: "golden-hour-refill-pack",
    name: "Golden Hour Refill Pack",
    shortName: "Golden Hour",
    tagline: "Amber, orange blossom and a curl of cedar smoke.",
    description:
      "Late light through the window: warm amber, orange blossom and a quiet curl of cedar smoke. Golden Hour is our softest, most golden trail.",
    price: 24,
    compareAt: null,
    category: "refills",
    family: "citrus",
    badge: null,
    rating: 4.9,
    reviewCount: 132,
    colors: [],
    notes: ["Amber", "Orange blossom", "Cedar smoke"],
    includes: ["3 compostable scent pods", "Scent notes card", "Refill guide"],
    specs: [
      ["Pods", "3 per pack"],
      ["Run time", "Up to 45 days per pod"],
      ["Materials", "Plant-based compostable shell"],
      ["Made in", "Portland, Oregon"],
    ],
    art: { kind: "refill", bg: "gold", base: "#c08a4d", accent: "#e3bd80", label: "#fff4df" },
    featured: false,
    span: "small",
  },
  {
    id: "p_quiet_morning",
    slug: "quiet-morning-refill-pack",
    name: "Quiet Morning Refill Pack",
    shortName: "Quiet Morning",
    tagline: "Sun-warmed linen, bergamot and white tea.",
    description:
      "The first ten minutes of the day. Crisp linen and bergamot drift into white tea and a trace of soft powder. Light enough for a bedroom, interesting enough to notice.",
    price: 24,
    compareAt: null,
    category: "refills",
    family: "fresh",
    badge: null,
    rating: 4.6,
    reviewCount: 61,
    colors: [],
    notes: ["Warm linen", "Bergamot", "White tea"],
    includes: ["3 compostable scent pods", "Scent notes card", "Refill guide"],
    specs: [
      ["Pods", "3 per pack"],
      ["Run time", "Up to 45 days per pod"],
      ["Materials", "Plant-based compostable shell"],
      ["Made in", "Portland, Oregon"],
    ],
    art: { kind: "refill", bg: "linen", base: "#b9b6a6", accent: "#ddd9c8", label: "#fbf7ee" },
    featured: false,
    span: "small",
  },
  {
    id: "p_starter_set",
    slug: "starter-cartridge-set",
    name: "Starter Cartridge Set",
    shortName: "Starter Set",
    tagline: "Three small cartridges to find the trail you love.",
    description:
      "Not sure where to begin? Start with three. Wild Forest, Savory Broth and Golden Hour arrive in small trial cartridges, enough to live with each scent for a week.",
    price: 29,
    compareAt: 36,
    category: "kits",
    family: "forest",
    badge: "Best first buy",
    rating: 4.8,
    reviewCount: 158,
    colors: [],
    notes: ["Wild Forest", "Savory Broth", "Golden Hour"],
    includes: ["3 trial cartridges", "Scent journal", "Free refill credit"],
    specs: [
      ["Cartridges", "3 x 7-day trial"],
      ["Scents", "Three signature trails"],
      ["Journal", "32 recycled pages"],
      ["Credit", "$45 off your first refill pack"],
    ],
    art: { kind: "starter", bg: "sand", base: "#8b9878", accent: "#c49176", label: "#f2ead8" },
    featured: true,
    span: "small",
  },
  {
    id: "p_discovery",
    slug: "scent-discovery-set",
    name: "Scent Discovery Set",
    shortName: "Discovery Set",
    tagline: "Five tiny vials. Five different rooms to live in.",
    description:
      "A low-commitment introduction to the ScentTrail library: five 2ml vials of our signature scents, each with a note card and a suggestion for where it belongs in your home.",
    price: 18,
    compareAt: null,
    category: "kits",
    family: "floral",
    badge: null,
    rating: 4.7,
    reviewCount: 73,
    colors: [],
    notes: ["Five signature scents", "2ml each", "Note cards"],
    includes: ["5 x 2ml scent vials", "Five note cards", "Scent map"],
    specs: [
      ["Vials", "5 x 2ml"],
      ["Scents", "All five signature trails"],
      ["Packaging", "Recycled paper wallet"],
      ["Gift ready", "Yes"],
    ],
    art: { kind: "discovery", bg: "blush", base: "#b88a86", accent: "#d9b0aa", label: "#fff4ec" },
    featured: false,
    span: "small",
  },
  {
    id: "p_travel_case",
    slug: "trail-travel-case",
    name: "Trail Travel Case",
    shortName: "Travel Case",
    tagline: "A felt-wrapped home for your diffuser and two pods.",
    description:
      "For weekends away. A dense recycled-felt case with a molded cradle for the diffuser and two pod pockets. Small enough for a carry-on, sturdy enough for the back seat.",
    price: 34,
    compareAt: null,
    category: "kits",
    family: "fresh",
    badge: null,
    rating: 4.5,
    reviewCount: 39,
    colors: [],
    notes: ["Recycled felt", "Two pod pockets", "Carry handle"],
    includes: ["1 felt travel case", "2 pod pockets", "Recycled-fiber fill"],
    specs: [
      ["Materials", "Recycled wool felt"],
      ["Fits", "1 diffuser + 2 pods"],
      ["Closure", "Brass zip"],
      ["Care", "Spot clean"],
    ],
    art: { kind: "case", bg: "sage", base: "#7d8168", accent: "#a7ab8e", label: "#f3eddf" },
    featured: false,
    span: "small",
  },
  {
    id: "p_subscription",
    slug: "scenttrail-refill-club",
    name: "Refill Club",
    shortName: "Refill Club",
    tagline: "A fresh pack every 45, 60 or 90 days. Cancel whenever.",
    description:
      "The easiest way to keep a room in good company. Choose your rhythm and your scent, and a compostable refill pack arrives before you run out. Members save 15% and get first pick of limited trails.",
    price: 20,
    compareAt: 24,
    category: "refills",
    family: "forest",
    badge: "Save 15%",
    rating: 4.9,
    reviewCount: 221,
    colors: [],
    notes: ["Choose any trail", "Flexible rhythm", "Free shipping"],
    includes: ["3 compostable pods per delivery", "15% member price", "Pause or cancel anytime"],
    specs: [
      ["Delivery", "Every 45, 60 or 90 days"],
      ["Member price", "15% off every pack"],
      ["Shipping", "Always free"],
      ["Cancel", "Anytime, no fee"],
    ],
    art: { kind: "club", bg: "forest", base: "#5e6b50", accent: "#b8c29c", label: "#f2ead8" },
    featured: false,
    span: "small",
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((product) => [product.slug, product]));
export const PRODUCT_ID_MAP = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]));

export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_RATE = 6;
export const TAX_RATE = 0.08;
export const SUBSCRIPTION_DISCOUNT = 0.15;

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function getProduct(slug) {
  return PRODUCT_MAP[slug] || null;
}

export function getProductById(id) {
  return PRODUCT_ID_MAP[id] || null;
}

export function linePrice(product, plan = "once") {
  if (!product) return 0;
  const price = plan === "subscribe" ? product.price * (1 - SUBSCRIPTION_DISCOUNT) : product.price;
  return Math.round(price * 100) / 100;
}

export function getRecommendation(mood) {
  const match = PRODUCTS.find((product) => product.family === mood && product.category === "refills");
  return match || PRODUCTS[2];
}

export const TESTIMONIALS = [
  {
    quote:
      "It has replaced three candles and a plug-in. The trail card is a nice touch — our living room smells like the first cold morning of the year.",
    name: "Maya R.",
    detail: "Wild Forest · Portland",
    rating: 5,
  },
  {
    quote:
      "I bought the starter set on a whim. Two weeks later I ordered the Ultimate Bundle. It is the rare object that looks better in person than online.",
    name: "Jonah K.",
    detail: "Ultimate Bundle · Brooklyn",
    rating: 5,
  },
  {
    quote:
      "The Savory Broth pod lives in our kitchen. Guests always ask what is cooking. It is nothing. It is everything.",
    name: "Priya S.",
    detail: "Savory Broth · Austin",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "How long does one scent pod last?",
    a: "Each pod is designed for around 45 days at the everyday setting, or about 30 days on the strongest setting. Your room's temperature and airflow will move that a little either way.",
  },
  {
    q: "Do I need an app or a cable?",
    a: "No. The diffuser is intentionally analog: a dial, a button and a rechargeable battery. One USB-C charge lasts around eight hours of active diffusion.",
  },
  {
    q: "What are the pods made of?",
    a: "The shell is a plant-based, home-compostable blend of PLA and sugarcane fiber. The scent core is a natural carrier wax. Toss spent pods in your home compost or return them to us in any refill pack.",
  },
  {
    q: "Can I use it around pets?",
    a: "Our scents are free from phthalates and synthetic musks. That said, every animal is different — if you have a sensitive pet, start on the low setting in a ventilated room.",
  },
  {
    q: "What is the return policy?",
    a: "Live with it for 30 days. If the trail is not right, send it back — even opened — and we will refund the order in full.",
  },
];

export const TRAIL_MOODS = [
  {
    id: "forest",
    label: "Forest floor",
    description: "Cedar, moss, roasted peanut",
    productSlug: "wild-forest-refill-pack",
    color: "#5e6b50",
  },
  {
    id: "kitchen",
    label: "Kitchen table",
    description: "Shiitake, miso, bay leaf",
    productSlug: "savory-broth-refill-pack",
    color: "#a36e55",
  },
  {
    id: "citrus",
    label: "Late light",
    description: "Amber, orange blossom, cedar",
    productSlug: "golden-hour-refill-pack",
    color: "#c08a4d",
  },
  {
    id: "fresh",
    label: "Clean sheets",
    description: "Linen, bergamot, white tea",
    productSlug: "quiet-morning-refill-pack",
    color: "#9b9887",
  },
];

export function statusLabel(status) {
  const labels = {
    processing: "Processing",
    confirmed: "Confirmed",
    shipped: "On the trail",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || "Processing";
}
