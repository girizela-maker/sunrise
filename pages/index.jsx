import React, { useEffect, useMemo, useState } from "react";
import {
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
  Waves,
  Wifi,
  X,
} from "lucide-react";

const AIRBNB_URL = "https://www.airbnb.com.au/rooms/1482025180626892860";

const heroImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1800&auto=format&fit=crop",
];

const highlights = [
  { icon: Users, title: "16+ guests", text: "Ideal for families, friends and private group stays." },
  { icon: BedDouble, title: "6 bedrooms", text: "Spacious sleeping layout with 10 beds across the villa." },
  { icon: Bath, title: "3 baths", text: "Comfortable facilities for larger groups." },
  { icon: Waves, title: "Private pool", text: "Pool, sunbeds and outdoor dining for relaxed holidays." },
  { icon: Wifi, title: "1Gb Wi-Fi", text: "Fast internet for work, streaming and digital nomads." },
  { icon: Car, title: "Free parking", text: "Private on-site parking for easy arrivals by car." },
];

const amenities = [
  "Private swimming pool",
  "Sunbeds and outdoor dining",
  "Fully equipped kitchen",
  "Air conditioning and heating",
  "Dedicated workspace",
  "Self check-in with key safe",
  "Free private parking",
  "Towels, linens and essentials",
  "Pets allowed",
  "Minutes from beaches and Cape of Rodon attractions",
];

const rooms = [
  ["Bedroom 1", "1 king bed"],
  ["Bedroom 2", "1 queen bed"],
  ["Bedroom 3", "1 queen bed"],
  ["Bedroom 4", "1 double bed + 1 single bed"],
  ["Bedroom 5", "2 single beds"],
  ["Bedroom 6", "1 double bed + 2 single beds"],
];

function monthDays(year, month) {
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const startPad = (first.getDay() + 6) % 7;
  return [
    ...Array(startPad).fill(null),
    ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1)),
  ];
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function Button({ children, href, variant = "primary" }) {
  const classes =
    variant === "primary"
      ? "bg-stone-900 text-white hover:bg-stone-700"
      : "bg-white text-stone-900 hover:bg-stone-100 border border-stone-200";

  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 font-medium transition ${classes}`}
    >
      {children}
    </a>
  );
}

function AvailabilityCalendar() {
  const today = new Date();
  const [offset, setOffset] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState(new Set());
  const [calendarStatus, setCalendarStatus] = useState("Loading live Airbnb calendar...");

  useEffect(() => {
    async function loadAvailability() {
      try {
        const response = await fetch("/api/airbnb-availability");
        if (!response.ok) throw new Error("Calendar API failed");

        const data = await response.json();
        setUnavailableDates(new Set(data.unavailableDates || []));
        setCalendarStatus(`Live Airbnb calendar loaded. Last checked: ${new Date(data.updatedAt).toLocaleString()}`);
      } catch (error) {
        setCalendarStatus("Live calendar could not load. Please check Airbnb for final availability.");
      }
    }

    loadAvailability();
  }, []);

  const shown = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const days = useMemo(() => monthDays(shown.getFullYear(), shown.getMonth()), [shown]);
  const monthName = shown.toLocaleString("en", { month: "long", year: "numeric" });

  return (
    <div className="rounded-3xl shadow-xl border-0 bg-white/95 backdrop-blur p-6 text-stone-900">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Availability</p>
          <h3 className="text-2xl font-semibold">{monthName}</h3>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border p-2 hover:bg-stone-100" onClick={() => setOffset(offset - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-full border p-2 hover:bg-stone-100" onClick={() => setOffset(offset + 1)}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-stone-500 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          if (!day) return <div key={i} />;
          const key = formatDate(day);
          const unavailable = unavailableDates.has(key);

          return (
            <div
              key={key}
              className={`aspect-square rounded-2xl flex items-center justify-center text-sm font-medium ${
                unavailable
                  ? "bg-stone-200 text-stone-500 line-through"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-100"
              }`}
              title={unavailable ? "Booked" : "Available"}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 mt-5 text-sm text-stone-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-100 border border-emerald-200" />
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-stone-200" />
          Booked
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-stone-500">{calendarStatus}</p>
    </div>
  );
}

export default function SunriseVillaWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hero, setHero] = useState(0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-white/50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-wide text-xl">Sunrise Villa</a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a href="#villa">Villa</a>
            <a href="#rooms">Rooms</a>
            <a href="#amenities">Amenities</a>
            <a href="#location">Location</a>
            <a href="#availability">Availability</a>
          </nav>

          <div className="hidden md:block">
            <Button href={AIRBNB_URL}>Book on Airbnb</Button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3 bg-white">
            <a href="#villa">Villa</a>
            <a href="#rooms">Rooms</a>
            <a href="#amenities">Amenities</a>
            <a href="#availability">Availability</a>
            <a href={AIRBNB_URL}>Book on Airbnb</a>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <img src={heroImages[hero]} className="absolute inset-0 w-full h-full object-cover" alt="Luxury villa preview" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

        <div className="relative max-w-7xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 fill-white" />
              <span className="text-sm">Guest favourite · 5.0 rating · 11 reviews</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
              Private pool villa near Cape of Rodon
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-8 mb-8">
              A stylish 6-bedroom retreat in Shetaj, Durrës County, blending rustic charm with modern comfort,
              fast Wi-Fi, private pool, outdoor dining and peaceful coastal scenery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={AIRBNB_URL} variant="secondary">Check dates on Airbnb</Button>
              <Button href="#villa" variant="secondary">Explore villa</Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <AvailabilityCalendar />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHero(i)}
              className={`h-2 rounded-full transition-all ${hero === i ? "w-9 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      <section id="villa" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <Icon className="h-7 w-7 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-stone-600 leading-6">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">The villa</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Designed for families, groups and calm coastal escapes.
            </h2>
            <p className="text-lg text-stone-600 leading-8 mb-6">
              Villa Sunrise offers the privacy of an entire villa with the comfort of a modern holiday home.
              Enjoy a large living area, fully equipped kitchen, private pool, outdoor dining, sunbeds and fast Wi-Fi.
            </p>
            <p className="text-lg text-stone-600 leading-8">
              Set in peaceful Cape of Rodon surroundings, the villa is close to beaches, local restaurants,
              scenic viewpoints and cultural attractions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img className="rounded-3xl h-72 w-full object-cover" src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900&auto=format&fit=crop" alt="Villa interior" />
            <img className="rounded-3xl h-72 w-full object-cover mt-10" src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=900&auto=format&fit=crop" alt="Villa bedroom" />
          </div>
        </div>
      </section>

      <section id="rooms" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-3xl mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Sleeping layout</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Six bedrooms, ten beds, space for everyone.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map(([name, beds]) => (
              <div key={name} className="rounded-3xl border border-stone-100 p-6">
                <BedDouble className="h-7 w-7 mb-5" />
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-stone-600">{beds}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="amenities" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Amenities</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Everything needed for a relaxed stay.</h2>
            <p className="text-lg text-stone-600 leading-8">
              From self check-in and private parking to fast Wi-Fi and poolside dining,
              Sunrise Villa is prepared for easy holidays and comfortable longer stays.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {amenities.map((item) => (
              <div key={item} className="flex gap-3 items-center bg-white rounded-2xl p-4 shadow-sm">
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="availability" className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/50 mb-3">Live bookings</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Available and booked dates update automatically.
            </h2>
            <p className="text-lg text-white/75 leading-8 mb-6">
              This calendar reads the Airbnb iCal availability feed through a secure serverless API route.
              Airbnb calendar feeds can be delayed by platform caching, so the Airbnb listing remains the final source for confirmed booking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={AIRBNB_URL} variant="secondary">Open Airbnb calendar</Button>
              <Button href="#contact" variant="secondary">Request direct booking</Button>
            </div>
          </div>

          <AvailabilityCalendar />
        </div>
      </section>

      <section id="location" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg h-96 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Location</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Shetaj, Durrës County, Albania.</h2>
            <p className="text-lg text-stone-600 leading-8 mb-6">
              A peaceful setting near Cape of Rodon, with scenic coastal landscapes, beaches,
              restaurants and local attractions a short drive away. A car is recommended.
            </p>
            <div className="flex items-center gap-3 text-stone-700">
              <MapPin className="h-5 w-5" />
              Cape of Rodon area · Durrës County
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Home className="h-10 w-10 mx-auto mb-5" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready for your stay?</h2>
          <p className="text-lg text-stone-600 leading-8 mb-8">
            Book securely through Airbnb or contact the host to ask about dates, group size, house rules and local recommendations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href={AIRBNB_URL}>Book on Airbnb</Button>
            <Button href="mailto:hello@sunrisevilla.al" variant="secondary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact host
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-stone-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/60">
          <p>© 2026 Sunrise Villa Beach View. All rights reserved.</p>
          <p>Private pool · 6 bedrooms · Cape of Rodon · Albania</p>
        </div>
      </footer>
    </div>
  );
}
