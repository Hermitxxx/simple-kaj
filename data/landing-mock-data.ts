import type {
  NavItem,
  ValueProp,
  ErrandFeature,
  PricingTier,
  CommunityHelper,
  Testimonial,
  FaqItem,
  FooterLinkGroup,
} from "./types";

export const navItems: NavItem[] = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Errands", href: "#errands" },
  { label: "Pricing", href: "#pricing" },
  { label: "Helpers", href: "#helpers" },
  { label: "FAQ", href: "#faq" },
];

export const heroData = {
  badge: "Hyperlocal task network in Dhaka • Gulshan, Banani, Dhanmondi",
  title: "Outsource Your Daily Errands. Done in Minutes by Trusted Neighbors.",
  subtitle:
    "From grocery runs and document drops to standing in BRTA queues. Connect with vetted, NID-verified Dhaka residents at clear, upfront rates.",
  activeTaskPreview: {
    category: "Grocery & Pharmacy",
    title: "Unimart Gulshan-2 Grocery Run",
    location: "Gulshan-2 to Banani Block D",
    budget: "৳350",
    helperName: "Tanvir A.",
    helperRating: 4.95,
    helperTasks: "142 tasks",
    status: "On the way with groceries",
    progressPercent: 75,
  },
  flankingHelpers: [
    {
      name: "Nusrat J.",
      zone: "Dhanmondi 8/A",
      rating: 5.0,
      tasks: "98 tasks",
      role: "DU Student",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    },
    {
      name: "Farhan K.",
      zone: "Banani Rd 11",
      rating: 4.98,
      tasks: "115 tasks",
      role: "Express Cyclist",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    },
  ],
};

export const valueProps: ValueProp[] = [
  {
    id: "step-1",
    step: "01",
    title: "Post an Errand",
    description:
      "Describe what you need, choose your Dhaka neighborhood or landmark, and set your proposed budget in BDT. Takes under 60 seconds.",
    iconName: "plus-circle",
  },
  {
    id: "step-2",
    step: "02",
    title: "Match with Verified Neighbor",
    description:
      "Nearby vetted helpers get instant alerts. Review their ratings, completed tasks, and accept your preferred worker in one tap.",
    iconName: "zap",
  },
  {
    id: "step-3",
    step: "03",
    title: "Pay on Completion",
    description:
      "Once your errand is finished and verified, pay directly in cash or via bKash/Nagad. Zero upfront deposit required.",
    iconName: "shield-check",
  },
];

export const errandFeatures: ErrandFeature[] = [
  {
    id: "errand-bazaar",
    tag: "Grocery & pharmacy",
    title: "Fresh Bazaar Picks & Urgent Pharmacy Deliveries",
    banglaTitle: "কাঁচাবাজার ও ফার্মেসি",
    description:
      "Fresh fish from Karwan Bazar or midnight medicines from Labaid delivered straight to your door in 35-45 minutes.",
    priceEstimate: "Starts from ৳150",
    iconName: "shopping-bag",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "errand-queue",
    tag: "Queue standing",
    title: "Skip the Dreaded Dhaka Queues (BRTA, Passport Office)",
    banglaTitle: "সিরিয়াল ও লাইন দেওয়া",
    description:
      "Save an entire workday. Have a trusted helper hold your spot at BRTA Mirpur, Agargaon Passport Office, or hospital consultation counters.",
    priceEstimate: "Starts from ৳300/hr",
    iconName: "clock",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "errand-parcel",
    tag: "Express parcel",
    title: "Urgent Document & Parcel Express Drops Across Town",
    banglaTitle: "জরুরি পার্সেল ডেলিভারি",
    description:
      "Bypass Dhaka gridlock with swift bike/cycle helpers delivering signed contracts, forgotten laptops, and house keys between Banani, Motijheel, and Uttara.",
    priceEstimate: "Starts from ৳200",
    iconName: "package",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "errand-tech",
    tag: "Tech & setup",
    title: "Smart TV, Fiber Wi-Fi & Device Configuration",
    banglaTitle: "টেক সাপোর্ট ও সেটআপ",
    description:
      "Vetted university CS students assist with fiber optic router configuration, printer troubleshooting, TV mounting, and smart device setup.",
    priceEstimate: "Starts from ৳400",
    iconName: "wrench",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "errand-privacy",
    tag: "Privacy & safety",
    title: "Your Phone & Exact Address Stay Completely Protected",
    banglaTitle: "নিরাপত্তা ও প্রাইভেসি",
    description:
      "Your exact address and phone number remain masked until you accept a verified worker. Pay cash on delivery or mobile banking with zero upfront exposure.",
    priceEstimate: "Built-in Security",
    iconName: "shield",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "pricing-posters",
    name: "Task Poster",
    price: "৳0",
    period: "Always Free",
    description:
      "For individuals and families needing quick local help across Dhaka without platform surcharges.",
    commission: "0% fee on tasks",
    features: [
      "Unlimited errand & task postings",
      "Direct in-app masking & calling",
      "Neighborhood fuzzed location privacy",
      "Verified worker ratings & reviews",
      "Pay cash on completion or bKash",
    ],
    ctaText: "Post an Errand (৳0)",
    ctaHref: "#post-task",
    isFeatured: false,
  },
  {
    id: "pricing-standard",
    name: "Standard Worker",
    price: "0%",
    period: "Dhaka Launch Month",
    description:
      "Earn money on your schedule by helping neighbors in your zone. Keep 100% of your earnings during launch.",
    commission: "Normally 10% after launch",
    features: [
      "0% platform commission during launch",
      "Instant zone alerts in your neighborhood",
      "Direct cash-on-completion payout",
      "Flexible hours around work or study",
      "Community verified trust badge",
    ],
    ctaText: "Start Earning Today",
    ctaHref: "#become-worker",
    isFeatured: true,
    badge: "Launch special — 0% fee",
  },
  {
    id: "pricing-pro",
    name: "Verified Pro Worker",
    price: "5%",
    period: "Priority Tier",
    description:
      "For top-rated runners and verified specialists who want priority access to high-value Dhaka errands.",
    commission: "Reduced 5% flat fee",
    features: [
      "Verified Pro badge (NID verified)",
      "Priority task alerts 5 mins early",
      "Access to high-budget (>৳2,000) tasks",
      "Access to indoor home setup tasks",
      "Dedicated 24/7 priority support line",
    ],
    ctaText: "Apply for Pro",
    ctaHref: "#apply-pro",
    isFeatured: false,
  },
];

export const communityHelpers: CommunityHelper[] = [
  {
    id: "helper-1",
    name: "Tanvir Ahmed",
    zone: "Gulshan-1",
    rating: 4.95,
    completedTasks: 142,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "NID Verified",
    specialty: "Express Delivery & Tech",
  },
  {
    id: "helper-2",
    name: "Nusrat Jahan",
    zone: "Dhanmondi",
    rating: 5.0,
    completedTasks: 98,
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "DU Student",
    specialty: "Grocery & Campus Runs",
  },
  {
    id: "helper-3",
    name: "Rafiqul Islam",
    zone: "Mirpur-10",
    rating: 4.88,
    completedTasks: 210,
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "Top Earner",
    specialty: "BRTA & Gov Queue Specialist",
  },
  {
    id: "helper-4",
    name: "Sadia Akter",
    zone: "Uttara Sector 4",
    rating: 4.92,
    completedTasks: 87,
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "NID Verified",
    specialty: "Document & Parcel Drops",
  },
  {
    id: "helper-5",
    name: "Mahmud Hasan",
    zone: "Mohammadpur",
    rating: 4.9,
    completedTasks: 64,
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "CS Student",
    specialty: "Wi-Fi & Electronics Setup",
  },
  {
    id: "helper-6",
    name: "Farhan Kabir",
    zone: "Banani",
    rating: 5.0,
    completedTasks: 115,
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "Motorbike Rider",
    specialty: "Emergency Runs & Pet Care",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "I was stuck in a high-stakes Zoom meeting while my mother urgently needed her prescription cardiac medication. Within 4 minutes, a verified helper in Dhanmondi accepted the task, bought it from Labaid pharmacy, and brought it to our doorstep. Truly a lifesaver in Dhaka gridlock.",
    author: "Kazi Farhan",
    role: "poster",
    roleTitle: "Senior Product Manager",
    zone: "Gulshan-2",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "As an Economics student at Dhaka University, my class schedule changes constantly. With SimpleKaj, I pick up errands around Shahbagh and Dhanmondi between classes. I earned ৳14,500 last month without missing a single lecture, and my earnings go straight to my bKash.",
    author: "Sumaiya Noor",
    role: "worker",
    roleTitle: "Economics Student, DU",
    zone: "Shahbagh",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "Standing at the Mirpur BRTA counter used to take up my whole Monday. SimpleKaj connected me with Rafiqul, who arrived at 8:00 AM sharp, secured token #14, and handed it to me right before my counter was called. Worth every single taka.",
    author: "Imtiaz Hossain",
    role: "poster",
    roleTitle: "E-commerce Founder",
    zone: "Uttara",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80",
    rating: 5,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-safety",
    question: "How do you ensure worker trustworthiness and safety?",
    answer:
      "Every worker must undergo mandatory National Identity (NID) verification, active phone OTP binding, and community rating checks. Exact addresses and contact numbers remain completely masked until a worker is explicitly accepted for an errand.",
  },
  {
    id: "faq-payment",
    question: "How does payment work? Is it cash or digital?",
    answer:
      "SimpleKaj operates on a transparent Cash-on-Completion model. Once your errand is completed to your satisfaction, pay your helper directly in cash or through bKash / Nagad. There are zero upfront deposits or prepayment holds.",
  },
  {
    id: "faq-areas",
    question: "Which Dhaka areas are currently supported?",
    answer:
      "We are currently active across Gulshan-1 & 2, Banani, Dhanmondi, Uttara (Sectors 1-14), Mirpur (1-12), Mohammadpur, and the Dhaka University / Shahbagh campus corridor. More zones are being unlocked weekly.",
  },
  {
    id: "faq-cancellation",
    question: "What happens if a worker cannot finish the task?",
    answer:
      "If an unexpected issue arises, the task is immediately returned to our high-priority queue for another nearby verified helper to claim. Our 24/7 Dhaka WhatsApp dispatch support mediates any timing or execution disputes.",
  },
  {
    id: "faq-prohibited",
    question: "What categories of errands are strictly prohibited?",
    answer:
      "We strictly ban illegal goods, prescription medications without a valid physician's prescription, alcohol, weapons, hazardous chemicals, and unvetted indoor tasks. All task postings are screened by automated and human moderators.",
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse Errands", href: "#errands" },
      { label: "Post a Task", href: "#post-task" },
      { label: "Become a Helper", href: "#become-worker" },
      { label: "Pricing & 0% Special", href: "#pricing" },
      { label: "Dhaka Launch Zones", href: "#zones" },
    ],
  },
  {
    title: "Trust & Safety",
    links: [
      { label: "Community Guidelines", href: "#guidelines" },
      { label: "NID Verification Process", href: "#verification" },
      { label: "Safety & Privacy Protocols", href: "#safety" },
      { label: "Prohibited Tasks Policy", href: "#prohibited" },
      { label: "Dispute Resolution", href: "#disputes" },
    ],
  },
  {
    title: "Company & Support",
    links: [
      { label: "About SimpleKaj", href: "#about" },
      { label: "Direct WhatsApp Support", href: "https://wa.me/8801700000000" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy-policy" },
      { label: "Dhaka Careers", href: "#careers" },
    ],
  },
];

export const perspectiveThumbnails: string[] = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
];
