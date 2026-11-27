import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { STORE_INFO, buildWhatsAppLink } from '../config/store';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#3A0A12] via-[#4A0D18] to-[#2C070D] text-[#FAF3E8] border-t-2 border-[#C9A24B]">
      {/* Subtle Gold Ornament Pattern Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20px 20px, #F4D58D 1.2px, transparent 1.2px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C9A24B]/25">
          {/* Column 1: Logo Card + About */}
          <div>
            <Link
              to="/"
              className="shine-sweep-parent inline-block rounded-2xl bg-[#FFFBF5] border border-[#C9A24B] px-4 py-2.5 shadow-lg mb-5"
            >
              <img
                src={STORE_INFO.logoPath}
                alt={STORE_INFO.name}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#DEC9C0] leading-relaxed mb-5">
              Handcrafted in Sialkot, Punjab — {STORE_INFO.shortName} brings royal Pakistani Bridal Kundan,
              Polki, Meenakari, and American Diamond Zircon artistry within reach.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={buildWhatsAppLink('Assalam-o-Alaikum Hassan Jewellery! I would like to inquire about your collection.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#F4D58D] hover:bg-[#C9A24B] hover:text-[#2B1B14] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#F4D58D] hover:bg-[#C9A24B] hover:text-[#2B1B14] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#/lookbook"
                aria-label="Instagram Gallery"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#F4D58D] hover:bg-[#C9A24B] hover:text-[#2B1B14] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#/reviews"
                aria-label="Customer Reviews"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#F4D58D] hover:bg-[#C9A24B] hover:text-[#2B1B14] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#F4D58D] font-semibold mb-4">
              Boutique Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Bridal Collection', to: '/bridal' },
                { label: 'Curated Collections', to: '/collections' },
                { label: 'Gift Guide by Budget', to: '/gift-guide' },
                { label: 'Bridal Lookbook', to: '/lookbook' },
                { label: 'Ring & Bangle Size Guide', to: '/size-guide' },
                { label: 'Jewellery Care & Blog', to: '/care-guide' },
                { label: 'Custom Order Request', to: '/custom-order' },
                { label: 'Track Your Order', to: '/track-order' },
                { label: 'Shipping & 7-Day Exchange', to: '/shipping-returns' },
                { label: 'FAQs', to: '/faq' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center text-[#EADFCB]/85 hover:text-[#F4D58D] transition-colors relative"
                  >
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#F4D58D] group-hover:after:w-full after:transition-all after:duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#F4D58D] font-semibold mb-4">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group inline-flex items-center text-[#EADFCB]/85 hover:text-[#F4D58D] transition-colors"
                  >
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#F4D58D] group-hover:after:w-full after:transition-all after:duration-300">
                      {cat.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Payments */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#F4D58D] font-semibold mb-4">
              Visit &amp; Contact
            </h3>
            <ul className="space-y-3.5 text-sm text-[#EADFCB]/90 mb-6">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F4D58D] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${STORE_INFO.phoneRaw}`}
                    className="hover:text-[#F4D58D] transition-colors font-medium block"
                  >
                    {STORE_INFO.phoneDisplay}
                  </a>
                  <span className="text-xs text-[#DEC9C0]/75">Call &amp; WhatsApp Support</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F4D58D] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="hover:text-[#F4D58D] transition-colors break-all"
                >
                  {STORE_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F4D58D] shrink-0 mt-0.5" />
                <span>{STORE_INFO.location}</span>
              </li>
            </ul>

            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#F4D58D] font-semibold mb-2.5">
              Accepted Payments
            </h4>
            <div className="flex flex-wrap gap-2">
              {STORE_INFO.payments.map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded border border-[#C9A24B]/35 bg-[#5A0F1C]/60 text-[11px] text-[#FAF3E8]"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 pb-14 md:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DEC9C0]/80">
          <p>© 2026 Hassan Artificial Jewellery. All rights reserved.</p>
          <p>Crafted in Sialkot · Delivering Across Pakistan &amp; Worldwide</p>
        </div>
      </div>
    </footer>
  );
};
