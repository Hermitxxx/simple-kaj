export interface NavItem {
  label: string;
  href: string;
}

export interface ValueProp {
  id: string;
  step: string;
  title: string;
  description: string;
  iconName: "plus-circle" | "zap" | "shield-check";
}

export interface ErrandFeature {
  id: string;
  tag: string;
  title: string;
  banglaTitle: string;
  description: string;
  priceEstimate: string;
  iconName: "shopping-bag" | "clock" | "package" | "wrench" | "shield";
  imageUrl: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  commission: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isFeatured?: boolean;
  badge?: string;
}

export interface CommunityHelper {
  id: string;
  name: string;
  zone: string;
  rating: number;
  completedTasks: number;
  avatarUrl: string;
  badge: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: "poster" | "worker";
  roleTitle: string;
  zone: string;
  avatarUrl: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}
