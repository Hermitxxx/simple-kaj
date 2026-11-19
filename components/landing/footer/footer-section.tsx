"use client";

import Link from "next/link";
import { footerLinkGroups } from "@/data/landing-mock-data";
import { NewsletterForm } from "./newsletter-form";
import { FadeIn } from "@/components/ui/motion";

export function FooterSection() {
  return (
    <footer className="bg-[#050505] text-neutral-400 py-16 px-4 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-neutral-900">
            {/* Left Column: Lime Newsletter Box */}
            <div className="lg:col-span-5">
              <NewsletterForm />
            </div>

            {/* Right Column: 3 Categorized Link Columns */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinkGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold text-neutral-200 mb-4">
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5 text-xs">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-neutral-400 hover:text-[#CCFF00] transition-colors py-0.5 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#CCFF00] text-neutral-950 font-bold text-[10px]">
                SK
              </span>
              <span className="font-medium text-neutral-300">SimpleKaj Bangladesh Ltd.</span>
              <span>•</span>
              <span>Dhaka, Bangladesh</span>
            </div>

            <div className="flex items-center gap-4">
              <span>© 2026 SimpleKaj. All rights reserved.</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] font-semibold text-neutral-300">
                🇧🇩 Made for Dhaka
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
