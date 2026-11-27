import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, BookOpen, Sparkles, MessageCircle, ArrowRight, X } from 'lucide-react';
import { CARE_ARTICLES, CareArticle } from '../data/articles';
import { buildWhatsAppLink } from '../config/store';
import { LuxuryImage } from '../components/LuxuryImage';

export const SizeGuidePage: React.FC = () => {
  const [bangleDiameterMM, setBangleDiameterMM] = useState(60);
  const [ringCircumferenceMM, setRingCircumferenceMM] = useState(54.4);

  const getPakistaniBangleSize = (mm: number) => {
    if (mm <= 58) return { size: '2.2 (Extra Small / Petite)', inches: '2.25"' };
    if (mm <= 61) return { size: '2.4 (Small / Medium)', inches: '2.38"' };
    if (mm <= 65) return { size: '2.6 (Medium / Standard)', inches: '2.50"' };
    return { size: '2.8 (Large)', inches: '2.63"' };
  };

  const getRingSize = (circMM: number) => {
    if (circMM < 50.5) return 'US 5 (PK 10)';
    if (circMM < 53.0) return 'US 6 (PK 12)';
    if (circMM < 55.8) return 'US 7 (PK 14)';
    if (circMM < 58.3) return 'US 8 (PK 16)';
    if (circMM < 60.8) return 'US 9 (PK 18)';
    return 'US 10 (PK 20)';
  };

  const bangleResult = getPakistaniBangleSize(bangleDiameterMM);
  const ringResult = getRingSize(ringCircumferenceMM);

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            <Ruler className="w-4 h-4" /> Precision Fit Atelier
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-3">
            Ring &amp; Bangle Size Calculator
          </h1>
          <p className="text-sm sm:text-base text-[#6B5B53] dark:text-[#DEC9C0]">
            Slide to match your existing bangle inner diameter or finger circumference in millimetres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bangle Calculator */}
          <div className="p-7 rounded-2xl bg-white dark:bg-[#290E15] border border-[#C9A24B]/50 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
              Pakistani Bangle &amp; Kangan Size
            </h2>
            <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] mb-6">
              Measure across the inner opening of a comfortable bangle in millimetres (mm).
            </p>

            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8862B] mb-2">
              Inner Diameter: <span className="tabular-nums">{bangleDiameterMM} mm</span>
            </label>
            <input
              type="range"
              min={55}
              max={69}
              step={1}
              value={bangleDiameterMM}
              onChange={(e) => setBangleDiameterMM(Number(e.target.value))}
              className="w-full accent-[#8B0A1A] mb-6 cursor-pointer"
            />

            <div className="p-5 rounded-xl bg-[#F6EBD9]/75 dark:bg-[#33131C] border border-[#C9A24B]/40 text-center">
              <p className="text-xs uppercase tracking-widest text-[#6B5B53] dark:text-[#DEC9C0]">
                Recommended Bangle Size
              </p>
              <p className="font-display text-2xl font-bold text-[#8B0A1A] dark:text-[#F4D58D] mt-1">
                {bangleResult.size}
              </p>
              <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] mt-1">
                Approx. {bangleResult.inches} inside diameter
              </p>
            </div>

            <div className="mt-5 text-xs text-[#6B5B53] dark:text-[#DEC9C0] space-y-1">
              <p>• 2.2 = 57 mm · 2.4 = 60 mm · 2.6 = 63.5 mm · 2.8 = 67 mm</p>
              <p>• Hinged screw-clasp kangan bangles accommodate half-sizes effortlessly.</p>
            </div>
          </div>

          {/* Ring Calculator */}
          <div className="p-7 rounded-2xl bg-white dark:bg-[#290E15] border border-[#C9A24B]/50 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
              Ring Size Calculator
            </h2>
            <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] mb-6">
              Wrap a strip of paper snugly around the base of your finger and measure length in mm.
            </p>

            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8862B] mb-2">
              Finger Circumference: <span className="tabular-nums">{ringCircumferenceMM.toFixed(1)} mm</span>
            </label>
            <input
              type="range"
              min={48}
              max={64}
              step={0.5}
              value={ringCircumferenceMM}
              onChange={(e) => setRingCircumferenceMM(Number(e.target.value))}
              className="w-full accent-[#8B0A1A] mb-6 cursor-pointer"
            />

            <div className="p-5 rounded-xl bg-[#F6EBD9]/75 dark:bg-[#33131C] border border-[#C9A24B]/40 text-center">
              <p className="text-xs uppercase tracking-widest text-[#6B5B53] dark:text-[#DEC9C0]">
                Recommended Ring Size
              </p>
              <p className="font-display text-2xl font-bold text-[#8B0A1A] dark:text-[#F4D58D] mt-1">
                {ringResult}
              </p>
              <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] mt-1">
                Most of our Polki &amp; Kundan rings also include concealed adjustable bands.
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <Link
                to="/shop"
                className="text-xs font-bold uppercase tracking-wider text-[#8B0A1A] dark:text-[#F4D58D] inline-flex items-center gap-1 hover:underline"
              >
                Explore All Jewellery <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CareGuidePage: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<CareArticle | null>(null);

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            <BookOpen className="w-4 h-4" /> Editorial Journal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            Jewellery Care &amp; Bridal Styling Guide
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CARE_ARTICLES.map((art) => (
            <article
              key={art.slug}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] shadow-sm flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FFFBF5] p-4 border-b border-[#EADFCB] dark:border-[#562630]">
                <LuxuryImage src={art.image} alt={art.title} className="w-full h-full object-contain" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs text-[#B8862B] font-semibold uppercase tracking-wider mb-2">
                  {art.category} · {art.readTime} · {art.date}
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-3">
                  {art.title}
                </h2>
                <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed mb-5">
                  {art.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveArticle(art)}
                  className="mt-auto self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B0A1A] dark:text-[#F4D58D] hover:underline cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {activeArticle && (
          <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-[#1D090E]/65 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#FFFBF5] dark:bg-[#290E15] border border-[#C9A24B] p-7 shadow-2xl">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F6EBD9] dark:bg-[#33131C] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
                {activeArticle.category} · {activeArticle.readTime}
              </span>
              <h2 className="font-display text-3xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-5">
                {activeArticle.title}
              </h2>
              <div className="w-full h-56 bg-[#FFFBF5] p-4 rounded-xl mb-6 border border-[#EADFCB] overflow-hidden">
                <LuxuryImage
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-5 text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
                {activeArticle.sections.map((sec) => (
                  <div key={sec.heading}>
                    <h3 className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-1">
                      {sec.heading}
                    </h3>
                    <p>{sec.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CustomOrderPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Baraat');
  const [dressColor, setDressColor] = useState('');
  const [piecesNeeded, setPiecesNeeded] = useState('Complete Bridal Set + Bangles + Tikka');
  const [notes, setNotes] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Assalam-o-Alaikum Hassan Artificial Jewellery!\nI would like to request a CUSTOM BRIDAL / MATCHING ORDER:\n• Name: ${name}\n• Phone: ${phone}\n• Event: ${eventType}\n• Dress / Stone Colour: ${dressColor}\n• Pieces Needed: ${piecesNeeded}\n• Notes: ${notes || 'None'}`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            <Sparkles className="w-4 h-4" /> Bespoke Sialkot Workshop
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-3">
            Custom Bridal Order Request
          </h1>
          <p className="text-sm sm:text-base text-[#6B5B53] dark:text-[#DEC9C0]">
            Tell us your lehenga shade and preferred stones — your request opens directly with our
            master jewellery stylists on WhatsApp.
          </p>
        </div>

        <form
          onSubmit={handleSendWhatsApp}
          className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#290E15] border-2 border-[#C9A24B]/50 shadow-xl space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zainab Malik"
                className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 0000000"
                className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                Occasion
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
              >
                <option>Nikah</option>
                <option>Mehndi / Mayun</option>
                <option>Baraat</option>
                <option>Walima</option>
                <option>Formal / Party Wear</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                Dress &amp; Stone Colour *
              </label>
              <input
                type="text"
                required
                value={dressColor}
                onChange={(e) => setDressColor(e.target.value)}
                placeholder="e.g. Crimson Maroon with Mint & Champagne Pearl"
                className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
              Pieces Needed
            </label>
            <input
              type="text"
              value={piecesNeeded}
              onChange={(e) => setPiecesNeeded(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
              Additional Sizing or Styling Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Bangle size (e.g. 2.4), choker vs rani haar preference, event date..."
              className="w-full p-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
            />
          </div>

          <button
            type="submit"
            className="shine-sweep-parent w-full h-12 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Custom Request via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
