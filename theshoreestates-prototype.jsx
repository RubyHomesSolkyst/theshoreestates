import React, { useState } from "react";
import {
  Star,
  Bed,
  Bath,
  Ruler,
  MapPin,
  Menu,
  X,
  Mail,
  Phone,
  ChevronRight,
  Search,
} from "lucide-react";

/*
  THE SHORE ESTATES — clickable prototype
  ----------------------------------------
  Data model note for future integration:
  The PROPERTIES array below is placeholder content shaped to match a typical
  Resales Online (or similar Costa del Sol MLS) feed record. When wiring up
  the real feed, map each listing to this same shape so the <PropertyCard>
  component and grid layout need no changes:
    { id, ref, location, subtype, price, beds, baths, built, terrace, image, tag, description }
*/

const PROPERTIES = [
  {
    id: 1,
    ref: "SE5179231",
    location: "Fuengirola",
    subtype: "Duplex",
    price: 399000,
    beds: 2,
    baths: 2,
    built: 86,
    terrace: 43,
    image: "https://picsum.photos/seed/shore1/640/480",
    tag: null,
    description:
      "A modern duplex with panoramic sea views in Monte Paraiso, a well-kept residential complex finished in 2019, just a short walk from the beach.",
  },
  {
    id: 2,
    ref: "SE5194255",
    location: "Fuengirola",
    subtype: "Top-Floor Apartment",
    price: 469000,
    beds: 3,
    baths: 2,
    built: 105,
    terrace: 6,
    image: "https://picsum.photos/seed/shore2/640/480",
    tag: "New",
    description:
      "Fully renovated three-bedroom apartment 500m from the seafront, finished with warm, contemporary interiors throughout.",
  },
  {
    id: 3,
    ref: "SE5106403",
    location: "Fuengirola",
    subtype: "Top-Floor Apartment",
    price: 749000,
    beds: 2,
    baths: 2,
    built: 90,
    terrace: 40,
    image: "https://picsum.photos/seed/shore3/640/480",
    tag: null,
    description:
      "Beachside top-floor apartment close to shops and the promenade, with a generous wraparound terrace built for outdoor living.",
  },
  {
    id: 4,
    ref: "SE4897981",
    location: "Estepona",
    subtype: "Corner Penthouse",
    price: 1090000,
    beds: 4,
    baths: 3,
    built: 136,
    terrace: 120,
    image: "https://picsum.photos/seed/shore4/640/480",
    tag: "Reduced",
    description:
      "An exclusive top-floor corner apartment with panoramic sea views in Las Mesas — recently reduced from €1,250,000 for a fast sale.",
  },
  {
    id: 5,
    ref: "SE5431069",
    location: "Calypso",
    subtype: "Mid-Floor Apartment",
    price: 250000,
    beds: 1,
    baths: 1,
    built: 46,
    terrace: 13,
    image: "https://picsum.photos/seed/shore5/640/480",
    tag: "Opportunity",
    description:
      "A one-bedroom apartment with sea views, moments from Calahonda Beach — a bright renovation opportunity in a well-connected pocket of the coast.",
  },
  {
    id: 6,
    ref: "SE5425204",
    location: "Estepona",
    subtype: "Penthouse",
    price: 250000,
    beds: 1,
    baths: 1,
    built: 67,
    terrace: 20,
    image: "https://picsum.photos/seed/shore6/640/480",
    tag: null,
    description:
      "A charming top-floor penthouse with a large terrace overlooking Estepona's historic old town, in the vibrant centre of the city.",
  },
];

const AREAS = [
  { name: "Marbella", blurb: "The heart of coastal glamour.", image: "https://picsum.photos/seed/area-marbella/500/400" },
  { name: "Benahavís", blurb: "Gastronomy and green hills.", image: "https://picsum.photos/seed/area-benahavis/500/400" },
  { name: "Puerto Banús", blurb: "Boutiques, marinas, yachts.", image: "https://picsum.photos/seed/area-banus/500/400" },
  { name: "Estepona", blurb: "Gardens and a modern old town.", image: "https://picsum.photos/seed/area-estepona/500/400" },
  { name: "Nueva Andalucía", blurb: "Golf valley, wide open views.", image: "https://picsum.photos/seed/area-andalucia/500/400" },
  { name: "Sotogrande", blurb: "Privacy and world-class polo.", image: "https://picsum.photos/seed/area-soto/500/400" },
  { name: "Fuengirola", blurb: "Easy beaches, lively streets.", image: "https://picsum.photos/seed/area-fuen/500/400" },
  { name: "Mijas", blurb: "Whitewashed lanes, mountain air.", image: "https://picsum.photos/seed/area-mijas/500/400" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Buyer's Guide", href: "#buyer" },
  { label: "Seller's Guide", href: "#seller" },
  { label: "New Developments", href: "#developments" },
  { label: "Resale Properties", href: "#properties" },
  { label: "Contact", href: "#contact" },
];

function formatPrice(n) {
  return "€" + n.toLocaleString("en-GB");
}

/* Signature element: a horizon rule that traces the sun's arc across the
   coast through the day. Each instance takes a position (0 dawn -> 1 dusk)
   and renders a gradient line with a glowing marker at that position. */
function HorizonRule({ position = 0.5 }) {
  const hue = 45 - position * 90; // gold (45) toward deep blue-violet (-45 wrapped)
  const glow = `hsl(${((hue % 360) + 360) % 360}, 70%, 60%)`;
  return (
    <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#12313F]/15 to-transparent overflow-visible">
      <div
        className="absolute top-1/2 h-2 w-2 rounded-full -translate-y-1/2 shadow-[0_0_12px_2px_rgba(0,0,0,0.15)]"
        style={{
          left: `${position * 100}%`,
          backgroundColor: glow,
          boxShadow: `0 0 14px 3px ${glow}`,
        }}
      />
    </div>
  );
}

function PropertyCard({ property, isFavorite, onToggleFavorite }) {
  return (
    <div className="group flex flex-col bg-white rounded-sm overflow-hidden border border-[#12313F]/10 hover:border-[#12313F]/25 transition-colors">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={`${property.subtype} in ${property.location}`}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button
          onClick={() => onToggleFavorite(property.id)}
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-[#12313F]/40 backdrop-blur-sm flex items-center justify-center hover:bg-[#12313F]/60 transition-colors"
        >
          <Star
            size={16}
            className={isFavorite ? "fill-[#C9A227] text-[#C9A227]" : "text-white"}
          />
        </button>
        {property.tag && (
          <span className="absolute top-3 left-3 bg-[#A85C3F] text-white text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-sm">
            {property.tag}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs bg-[#12313F]/50 backdrop-blur-sm px-2 py-1 rounded-sm">
          <MapPin size={12} />
          {property.location}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[Fraunces] text-lg text-[#12313F] leading-snug">
            {property.location} {property.subtype}
          </h3>
        </div>

        <div className="flex items-center gap-4 mt-2 text-sm text-[#12313F]/70">
          <span className="flex items-center gap-1"><Bed size={14} /> {property.beds}</span>
          <span className="flex items-center gap-1"><Bath size={14} /> {property.baths}</span>
          <span className="flex items-center gap-1"><Ruler size={14} /> {property.built} m²</span>
        </div>

        <p className="text-sm text-[#12313F]/70 mt-3 leading-relaxed flex-1">
          {property.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#12313F]/10">
          <span className="font-[Fraunces] text-xl text-[#12313F]">
            {formatPrice(property.price)}
          </span>
          <button className="flex items-center gap-1 text-sm text-[#A85C3F] hover:gap-2 transition-all font-medium">
            View Details <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TheShoreEstates() {
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("Any");
  const [propType, setPropType] = useState("Any");
  const [beds, setBeds] = useState("Any");

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F4F3] font-[Work_Sans] text-[#1B2A2E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600&display=swap');
        .font-\\[Fraunces\\] { font-family: 'Fraunces', serif; }
        .font-\\[Work_Sans\\] { font-family: 'Work Sans', sans-serif; }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#F1F4F3]/95 backdrop-blur-sm border-b border-[#12313F]/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-[Fraunces] text-xl tracking-tight text-[#12313F]">
            The Shore Estates
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-[#12313F]/75 hover:text-[#12313F] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-[#12313F]/75">
              <Star size={16} /> {favorites.length}
            </button>
            <a href="#contact" className="text-sm bg-[#12313F] text-white px-4 py-2 rounded-sm hover:bg-[#0d232e] transition-colors">
              Book a Call
            </a>
          </div>

          <button className="lg:hidden text-[#12313F]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#F1F4F3] border-t border-[#12313F]/10 px-5 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-[#12313F]/80" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="text-sm bg-[#12313F] text-white px-4 py-2 rounded-sm text-center mt-1">
              Book a Call
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-[#12313F]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(201,162,39,0.35), transparent 45%), linear-gradient(180deg, #0d232e 0%, #12313F 60%, #1D5C63 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-32 md:pt-28 md:pb-40">
          <p className="text-[#C9A227] tracking-[0.2em] text-xs uppercase mb-4">
            Costa del Sol, Spain
          </p>
          <h1 className="font-[Fraunces] text-4xl md:text-6xl text-white max-w-3xl leading-[1.1]">
            Your coastal life in Spain, <span className="italic text-[#C9A227]">guided end to end.</span>
          </h1>
          <p className="text-white/70 max-w-xl mt-6 text-base md:text-lg">
            Trusted, English-speaking property guidance along the Costa del Sol —
            from first viewing to handing over the keys.
          </p>
        </div>

        {/* Floating search panel */}
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 -mt-20 md:-mt-24 pb-16">
          <div className="bg-white rounded-sm shadow-xl p-5 md:p-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#12313F]/60 uppercase tracking-wide">Min. Price</label>
              <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full mt-1 border border-[#12313F]/15 rounded-sm px-2 py-2 text-sm bg-white">
                <option>Any</option>
                <option>€100,000</option>
                <option>€300,000</option>
                <option>€500,000</option>
                <option>€1,000,000</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#12313F]/60 uppercase tracking-wide">Property Type</label>
              <select value={propType} onChange={(e) => setPropType(e.target.value)} className="w-full mt-1 border border-[#12313F]/15 rounded-sm px-2 py-2 text-sm bg-white">
                <option>Any</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Townhouse</option>
                <option>Plot</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#12313F]/60 uppercase tracking-wide">Bedrooms</label>
              <select value={beds} onChange={(e) => setBeds(e.target.value)} className="w-full mt-1 border border-[#12313F]/15 rounded-sm px-2 py-2 text-sm bg-white">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#12313F]/60 uppercase tracking-wide">Location</label>
              <select className="w-full mt-1 border border-[#12313F]/15 rounded-sm px-2 py-2 text-sm bg-white">
                <option>All Areas</option>
                {AREAS.map((a) => <option key={a.name}>{a.name}</option>)}
              </select>
            </div>
            <a href="#properties" className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 bg-[#A85C3F] text-white rounded-sm py-2.5 text-sm hover:bg-[#8f4c33] transition-colors">
              <Search size={16} /> Search
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          ["€500M+", "Sales Volume"],
          ["12 Years", "Local Expertise"],
          ["100%", "English-Speaking Support"],
        ].map(([stat, label]) => (
          <div key={label}>
            <div className="font-[Fraunces] text-3xl text-[#12313F]">{stat}</div>
            <div className="text-sm text-[#12313F]/60 mt-1">{label}</div>
          </div>
        ))}
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8"><HorizonRule position={0.15} /></div>

      {/* LIFESTYLE BLOCKS */}
      <section id="about" className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-sm overflow-hidden h-80 group">
          <img src="https://picsum.photos/seed/resale-lifestyle/700/500" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Resale properties" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12313F]/80 via-[#12313F]/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs uppercase tracking-wide text-[#C9A227]">Resale</p>
            <h3 className="font-[Fraunces] text-2xl mt-1">Established Elegance</h3>
            <a href="#properties" className="text-sm underline underline-offset-4 mt-2 inline-block">View Resale Properties</a>
          </div>
        </div>
        <div className="relative rounded-sm overflow-hidden h-80 group">
          <img src="https://picsum.photos/seed/newbuild-lifestyle/700/500" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="New developments" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12313F]/80 via-[#12313F]/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs uppercase tracking-wide text-[#C9A227]">New Build</p>
            <h3 className="font-[Fraunces] text-2xl mt-1">Modern Living</h3>
            <a href="#developments" className="text-sm underline underline-offset-4 mt-2 inline-block">Explore New Developments</a>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section id="properties" className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#A85C3F]">Portfolio</p>
            <h2 className="font-[Fraunces] text-3xl text-[#12313F] mt-1">Featured Properties</h2>
            <p className="text-sm text-[#12313F]/60 mt-2">Our most recently updated listings on the market.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isFavorite={favorites.includes(p.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#properties" className="inline-block border border-[#12313F]/25 text-[#12313F] px-6 py-2.5 rounded-sm text-sm hover:bg-[#12313F] hover:text-white transition-colors">
            View Full Portfolio
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8"><HorizonRule position={0.5} /></div>

      {/* EXPLORE AREAS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <p className="text-xs uppercase tracking-wide text-[#A85C3F]">Destinations</p>
        <h2 className="font-[Fraunces] text-3xl text-[#12313F] mt-1 mb-8">Explore the Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AREAS.map((a) => (
            <a key={a.name} href="#properties" className="relative rounded-sm overflow-hidden h-40 group block">
              <img src={a.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={a.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12313F]/85 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="font-[Fraunces] text-base">{a.name}</div>
                <div className="text-[11px] text-white/70">{a.blurb}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SELLING CTA */}
      <section id="seller" className="bg-[#12313F] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#C9A227]">Our Selling Service</p>
            <h2 className="font-[Fraunces] text-3xl mt-2">Thinking of Selling?</h2>
            <p className="text-white/70 mt-4 leading-relaxed">
              We put your property in front of the right buyers through our
              international network — with clear communication in English
              throughout the process.
            </p>
            <a href="#contact" className="inline-block mt-6 bg-[#C9A227] text-[#12313F] px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-[#b8951f] transition-colors">
              Request a Valuation
            </a>
          </div>
          <img src="https://picsum.photos/seed/selling-cta/700/500" className="rounded-sm h-72 w-full object-cover" alt="Selling service" />
        </div>
      </section>

      {/* BUYER GUIDE */}
      <section id="buyer" className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img src="https://picsum.photos/seed/buyer-guide/700/500" className="rounded-sm h-72 w-full object-cover order-2 md:order-1" alt="Buyer's guide" />
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-wide text-[#A85C3F]">Buyer's Guide, Spain</p>
          <h2 className="font-[Fraunces] text-3xl text-[#12313F] mt-2">A Safe Home-Buying Journey</h2>
          <p className="text-[#12313F]/70 mt-4 leading-relaxed">
            We guide you through the full process — from legal requirements
            to the day you collect the keys.
          </p>
          <a href="#buyer" className="inline-flex items-center gap-1 mt-6 text-sm text-[#A85C3F] font-medium">
            Read the Buyer's Guide <ChevronRight size={15} />
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8"><HorizonRule position={0.85} /></div>

      {/* NEWS TEASER */}
      <section id="developments" className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#A85C3F]">News &amp; Insight</p>
            <h2 className="font-[Fraunces] text-3xl text-[#12313F] mt-1">Inspiration from the Coast</h2>
          </div>
          <a href="#developments" className="text-sm text-[#12313F]/70 hidden md:block">All Articles</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ["New Developments", "What's Launching on the Coast This Year"],
            ["Buyer's Guide", "Understanding the NIE Number and Notary Process"],
            ["Area Guide", "Why Estepona Is Costa del Sol's Quiet Favourite"],
          ].map(([tag, title]) => (
            <a key={title} href="#developments" className="block group">
              <div className="h-40 rounded-sm overflow-hidden mb-3">
                <img src={`https://picsum.photos/seed/${encodeURIComponent(title)}/500/300`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={title} />
              </div>
              <p className="text-xs uppercase tracking-wide text-[#A85C3F]">{tag}</p>
              <h3 className="font-[Fraunces] text-lg text-[#12313F] mt-1 leading-snug">{title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER + FOOTER */}
      <footer id="contact" className="bg-[#0d232e] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-[Fraunces] text-xl">The Shore Estates</div>
            <p className="text-white/60 text-sm mt-4 max-w-sm leading-relaxed">
              Your dedicated partner for coastal property on the Costa del
              Sol. Personal service and clear, English-language guidance from
              first enquiry to completion.
            </p>
            <button
              onClick={() => setNewsletterOpen(true)}
              className="inline-flex items-center gap-2 mt-6 border border-white/25 px-4 py-2 rounded-sm text-sm hover:bg-white/10 transition-colors"
            >
              <Mail size={15} /> Subscribe to Updates
            </button>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/50 mb-3">Navigate</div>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              {NAV_LINKS.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/50 mb-3">Popular Areas</div>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              {AREAS.slice(0, 6).map((a) => <a key={a.name} href="#properties">{a.name}</a>)}
            </div>
            <div className="text-xs uppercase tracking-wide text-white/50 mt-6 mb-2">Contact</div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone size={14} /> +34 000 000 000
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
          © 2026 The Shore Estates. All rights reserved. · Privacy · Terms
        </div>
      </footer>

      {/* Newsletter modal */}
      {newsletterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12313F]/60 backdrop-blur-sm px-5">
          <div className="relative bg-white rounded-sm max-w-md w-full p-8 text-center">
            <button
              onClick={() => setNewsletterOpen(false)}
              className="absolute top-4 right-4 text-[#12313F]/50 hover:text-[#12313F]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="font-[Fraunces] text-xl text-[#12313F]">The Shore Estates</div>
            <h3 className="font-[Fraunces] text-2xl text-[#12313F] mt-4">Stay Updated</h3>
            <p className="text-sm text-[#12313F]/60 mt-2">
              Sign up for new listings and market updates from the Costa del
              Sol, straight to your inbox.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="border border-[#12313F]/20 rounded-sm px-3 py-2 text-sm"
              />
              <button
                onClick={() => setNewsletterOpen(false)}
                className="bg-[#A85C3F] text-white rounded-sm py-2 text-sm hover:bg-[#8f4c33] transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
