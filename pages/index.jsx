import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Waves,
  Wifi,
  Star,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Home,
  ShieldCheck,
  MessageCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Euro,
  HeartHandshake,
  Languages,
  Send,
} from "lucide-react";

const BOOK_NOW_LINK = "#direct-booking";
const PHONE_NUMBER = "+355694073222";
const DISPLAY_PHONE = "+355 69 407 3222";
const WHATSAPP_LINK =
  "https://wa.me/355694073222?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20direct%20booking%20for%20Sunrise%20Villa.";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=41.5556717,19.4939937";

const heroImages = [
  "/photos/4eeda215-ffb9-4903-b50b-2dc3c6af2976.avif",
  "/photos/c0e654ab-8e33-4e9b-b208-7959f901fff7.avif",
  "/photos/215c5853-df0f-4fd7-ac87-fa63ad03a1d6.avif",
];

const allPhotos = [
  "/photos/0a615d6b-3d84-43d1-bfc9-8faa43ebd22b.avif",
  "/photos/0bd89e93-1c30-47d8-a3ba-f90a55988c1c.avif",
  "/photos/0d7fa065-bd73-48db-b877-81aafcecb05d.avif",
  "/photos/0ea65ac8-1555-413c-9ea1-b5b997a37188.avif",
  "/photos/1aaf1628-9823-4463-ad8c-0d36b4c1cf11.avif",
  "/photos/1b1fb3e4-8a70-4422-923a-79b65254b616.avif",
  "/photos/1b3ab87f-26d8-4da9-9b60-3da0c804e170.avif",
  "/photos/4eeda215-ffb9-4903-b50b-2dc3c6af2976.avif",
  "/photos/5e4311f6-fbee-4879-bdce-b1776f586f42.avif",
  "/photos/013fc11f-0149-4ffd-b7b2-043e451e1199.avif",
  "/photos/13a1ea27-10db-409b-9173-4169933e5b8c.avif",
  "/photos/59c51b7e-d194-4aa5-87ce-e830b83d6b20.avif",
  "/photos/215c5853-df0f-4fd7-ac87-fa63ad03a1d6.avif",
  "/photos/525e9169-79ad-4c49-b8ef-e41e00681f0a.avif",
  "/photos/847adf41-4fd1-444c-89e4-fa356ec42e1a.avif",
  "/photos/3814dbd9-cffe-4f1b-95b1-abbd200dcf8b.avif",
  "/photos/68702c38-70db-4079-910c-1dc9e7394829.avif",
  "/photos/73347fd0-4773-4dc6-887c-a922b8c82152.avif",
  "/photos/9320170d-c49c-4d65-9557-a890678c657e.avif",
  "/photos/68575784-6519-4a2f-b483-ed8f2fad4578.avif",
  "/photos/a32fbd2b-7237-46de-a82c-e5cce1290afd.avif",
  "/photos/aef439d2-9fe4-4d1e-a24e-b63013eed727.avif",
  "/photos/b2ba2b7f-7b4c-4cfa-98cb-0495c9ddb45f.avif",
  "/photos/b74385dc-47ad-4971-9756-159d697b1df7.avif",
  "/photos/beb0fdcd-76ba-40ab-9139-80288033ab82.avif",
  "/photos/c0e654ab-8e33-4e9b-b208-7959f901fff7.avif",
  "/photos/c15c78c5-e267-4451-b365-d92e83a045ad.avif",
  "/photos/d03f9267-48e4-4fc0-84d5-db576b50079d.webp",
  "/photos/de849f74-048d-4dbf-9023-4167aaefdc43.avif",
];

const galleryImages = {
  living: "/photos/215c5853-df0f-4fd7-ac87-fa63ad03a1d6.avif",
  garden: "/photos/013fc11f-0149-4ffd-b7b2-043e451e1199.avif",
  sunsetPool: "/photos/4eeda215-ffb9-4903-b50b-2dc3c6af2976.avif",
};

const highlights = [
  { icon: Users, title: "16+ guests", text: "Ideal for families, friends and private group stays." },
  { icon: BedDouble, title: "6 bedrooms", text: "Spacious sleeping layout with 10 beds across the villa." },
  { icon: Bath, title: "3 baths", text: "Comfortable facilities for larger groups." },
  { icon: Waves, title: "Private pool", text: "Pool, sunbeds and outdoor dining for relaxed holidays." },
  { icon: Wifi, title: "1Gb Wi‑Fi", text: "Fast internet for remote work, streaming and digital nomads." },
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

const directBookingBenefits = [
  "Better direct pricing",
  "No platform service fees",
  "Fast WhatsApp communication",
  "Flexible check-in when possible",
  "Long-stay and group offers",
  "Direct local recommendations",
];

const testimonials = [
  { name: "Family guest", country: "Europe", text: "Beautiful villa, peaceful location and a great pool area for a group holiday." },
  { name: "Group stay", country: "Albania", text: "Very comfortable for a large group, with plenty of space and relaxing outdoor areas." },
  { name: "Summer guest", country: "Italy", text: "Amazing sunsets, private atmosphere and easy communication with the host." },
];

const attractions = [
  { title: "Cape of Rodon", text: "Scenic coastal views, beaches, walking routes and sunset viewpoints." },
  { title: "Local beaches", text: "Quiet coastal spots nearby for swimming, sunbathing and relaxing." },
  { title: "Durrës & Tirana", text: "Easy day trips for restaurants, culture, nightlife and airport transfers." },
];

const languages = ["English", "Albanian", "Italian", "German on request"];

const rooms = [
  ["Bedroom 1", "1 king bed"],
  ["Bedroom 2", "1 queen bed"],
  ["Bedroom 3", "1 queen bed"],
  ["Bedroom 4", "1 double bed + 1 single bed"],
  ["Bedroom 5", "2 single beds"],
  ["Bedroom 6", "1 double bed + 2 single beds"],
];

function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all rounded-full";
  const variants =
    variant === "outline"
      ? "border border-current bg-transparent"
      : variant === "secondary"
      ? "bg-white/90 text-stone-900 hover:bg-white"
      : "bg-stone-900 text-white hover:bg-stone-700";
  const sizes = size === "lg" ? "h-12 px-8" : size === "icon" ? "h-10 w-10" : "h-10 px-5";
  return (
    <button className={`${base} ${variants} ${sizes} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

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

function AvailabilityCalendar() {
  const today = new Date();
  const [offset, setOffset] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState(new Set());
  const [calendarStatus, setCalendarStatus] = useState("Loading live calendars...");

  useEffect(() => {
    async function loadAvailability() {
      try {
        const response = await fetch("/api/airbnb-availability");
        if (!response.ok) throw new Error("Calendar API failed");
        const data = await response.json();
        setUnavailableDates(new Set(data.unavailableDates || []));
        setCalendarStatus("Live Airbnb and Booking.com calendars loaded.");
      } catch (error) {
        setCalendarStatus("Live calendar could not load. Please contact us for final availability.");
      }
    }

    loadAvailability();
  }, []);

  const shown = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const days = useMemo(() => monthDays(shown.getFullYear(), shown.getMonth()), [shown]);
  const monthName = shown.toLocaleString("en", { month: "long", year: "numeric" });

  return (
    <Card className="rounded-3xl shadow-xl border-0 bg-white/95 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Availability</p>
            <h3 className="text-2xl font-semibold text-stone-900">{monthName}</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="text-stone-900" onClick={() => setOffset(offset - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-stone-900" onClick={() => setOffset(offset + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
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
      </CardContent>
    </Card>
  );
}

export default function SunriseVillaWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hero, setHero] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-white/50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-wide text-xl">
            Sunrise Villa
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button onClick={() => setGalleryOpen(true)} className="hover:text-stone-950 transition-colors">
              Photos
            </button>
            <a href="#villa">Villa</a>
            <a href="#rooms">Rooms</a>
            <a href="#amenities">Amenities</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
            <a href="#availability">Availability</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={BOOK_NOW_LINK}>
              <Button className="px-6">Book Now</Button>
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3 bg-white">
            <button onClick={() => setGalleryOpen(true)} className="text-left">
              Photos
            </button>
            <a href="#villa">Villa</a>
            <a href="#rooms">Rooms</a>
            <a href="#amenities">Amenities</a>
            <a href="#availability">Availability</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
            <a href={BOOK_NOW_LINK}>Book Now</a>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <img src={heroImages[hero]} className="absolute inset-0 w-full h-full object-cover" alt="Sunrise Villa preview" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

        <div className="relative max-w-7xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 fill-white" />
              <span className="text-sm">Guest favourite · 4.9 rating · 89 reviews</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
              Private pool villa near Cape of Rodon
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-8 mb-8">
              A stylish 6-bedroom retreat in Shetaj, Durrës County, blending rustic charm with modern comfort,
              fast Wi‑Fi, private pool, outdoor dining and peaceful coastal scenery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setGalleryOpen(true)} className="rounded-full px-8 h-12 bg-white text-stone-900 font-medium hover:bg-white/90 transition-all">
                View all photos
              </button>
              <a href={BOOK_NOW_LINK}>
                <Button size="lg">Book Now</Button>
              </a>
              <a href="#villa">
                <Button size="lg" variant="secondary">
                  Explore villa
                </Button>
              </a>
            </div>
          </motion.div>

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
            <Card key={title} className="rounded-3xl border-0 shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Icon className="h-7 w-7 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-stone-600 leading-6">{text}</p>
              </CardContent>
            </Card>
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
              Enjoy a large living area, fully equipped kitchen, private pool, outdoor dining, sunbeds and fast 1Gb Wi‑Fi.
            </p>
            <p className="text-lg text-stone-600 leading-8">
              Set in peaceful Cape of Rodon surroundings, the villa is close to beaches, local restaurants,
              scenic viewpoints and cultural attractions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img className="rounded-3xl h-72 w-full object-cover" src={galleryImages.living} alt="Sunrise Villa living room" />
            <img className="rounded-3xl h-72 w-full object-cover mt-10" src={galleryImages.garden} alt="Sunrise Villa garden" />
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
              <Card key={name} className="rounded-3xl border border-stone-100">
                <CardContent className="p-6">
                  <BedDouble className="h-7 w-7 mb-5" />
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  <p className="text-stone-600">{beds}</p>
                </CardContent>
              </Card>
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
              From self check-in and private parking to fast Wi‑Fi and poolside dining,
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

      <section id="pricing" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-3xl mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Direct booking prices</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-5">Clear seasonal pricing, with better direct-booking options.</h2>
            <p className="text-lg text-stone-600 leading-8">
              Final price depends on dates, number of guests and length of stay. Contact us directly for the best available offer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Low season", "From €300 / night", "Best for quiet escapes and longer stays."],
              ["High season", "From €450 / night", "Ideal for summer holidays and family groups."],
              ["Peak summer", "From €550 / night", "Premium dates, pool season and high-demand weeks."],
            ].map(([title, price, text]) => (
              <Card key={title} className="rounded-3xl border border-stone-100 shadow-sm">
                <CardContent className="p-7">
                  <Euro className="h-8 w-8 mb-5" />
                  <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                  <p className="text-3xl font-semibold mb-4">{price}</p>
                  <p className="text-stone-600 leading-7">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Why book directly?</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Save fees and speak directly with the host.</h2>
            <p className="text-lg text-stone-600 leading-8 mb-6">
              Direct booking is ideal for families, groups, longer stays and guests who want fast answers before confirming.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-green-600 text-white px-8 h-12 font-semibold hover:bg-green-700 transition-all">
              <MessageCircle className="h-5 w-5 mr-2" />
              Message on WhatsApp
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {directBookingBenefits.map((item) => (
              <div key={item} className="flex gap-3 items-center bg-white rounded-2xl p-4 shadow-sm">
                <HeartHandshake className="h-5 w-5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-3xl mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Guest reviews</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Why guests love Sunrise Villa.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((review) => (
              <Card key={review.name} className="rounded-3xl border-0 shadow-sm">
                <CardContent className="p-7">
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-stone-900" />
                    ))}
                  </div>
                  <p className="text-stone-700 leading-7 mb-6">“{review.text}”</p>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-stone-500">{review.country}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="availability" className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/50 mb-3">Live bookings</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Available and booked dates update automatically.</h2>
            <p className="text-lg text-white/75 leading-8 mb-6">
              This calendar reads Airbnb and Booking.com iCal availability feeds through a serverless API route.
              Calendar platforms may update with a delay, so please contact us for final confirmation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#direct-booking">
                <Button size="lg" className="bg-white text-stone-900 hover:bg-white/90">
                  Book Now
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-stone-900">
                  Request direct booking
                </Button>
              </a>
            </div>
          </div>

          <AvailabilityCalendar />
        </div>
      </section>

      <section id="location" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="rounded-3xl overflow-hidden border-0 shadow-lg">
            <img className="h-96 w-full object-cover" src={galleryImages.sunsetPool} alt="Sunset view from Sunrise Villa pool" />
          </Card>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Location & nearby places</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Shetaj, Cape of Rodon, Durrës County.</h2>
            <p className="text-lg text-stone-600 leading-8 mb-6">
              A peaceful setting near Cape of Rodon, with scenic coastal landscapes, beaches, restaurants and local attractions a short drive away.
            </p>

            <div className="grid gap-3 mb-6">
              {attractions.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold mb-1">{item.title}</p>
                  <p className="text-stone-600 text-sm leading-6">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-stone-700 mb-6">
              <MapPin className="h-5 w-5" />
              Villa Sunrise · Shetaj, Cape of Rodon · Durrës County
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200 mb-5 bg-stone-100 p-8 text-center">
              <MapPin className="h-10 w-10 mx-auto mb-4 text-stone-700" />
              <h3 className="text-2xl font-semibold mb-2">Villa Sunrise on Google Maps</h3>
              <p className="text-stone-600 mb-5">Open the exact villa location directly in Google Maps.</p>
              <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-stone-900 text-white px-6 h-12 font-medium hover:bg-stone-700 transition-all">
                Open Location
              </a>
              <p className="text-xs text-stone-500 mt-3">Coordinates: 41.5556717, 19.4939937</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500 mb-3">Languages</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Easy communication for international guests.</h2>
            <p className="text-lg text-stone-600 leading-8">
              We welcome international guests and can assist with arrival details, local recommendations and direct booking questions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {languages.map((language) => (
              <div key={language} className="flex gap-3 items-center rounded-2xl bg-stone-50 p-4">
                <Languages className="h-5 w-5" />
                <span>{language}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="direct-booking" className="bg-stone-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-semibold mb-6">Contact us for direct booking</h2>
          <p className="text-lg md:text-xl text-white/75 leading-8 mb-10">
            Contact us directly for availability, best pricing, long stays and private group reservations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${PHONE_NUMBER}`} className="inline-flex items-center justify-center rounded-full bg-white text-stone-900 px-10 h-14 text-lg font-semibold hover:bg-white/90 transition-all">
              <Phone className="h-5 w-5 mr-2" />
              Call {DISPLAY_PHONE}
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-green-600 text-white px-10 h-14 text-lg font-semibold hover:bg-green-700 transition-all">
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp us
            </a>
          </div>

          <form className="mt-10 grid md:grid-cols-2 gap-4 text-left bg-white/10 rounded-3xl p-6">
            <input className="rounded-2xl px-4 py-3 text-stone-900" placeholder="Your name" />
            <input className="rounded-2xl px-4 py-3 text-stone-900" placeholder="Email or WhatsApp" />
            <input className="rounded-2xl px-4 py-3 text-stone-900" placeholder="Check-in date" />
            <input className="rounded-2xl px-4 py-3 text-stone-900" placeholder="Check-out date" />
            <input className="rounded-2xl px-4 py-3 text-stone-900 md:col-span-2" placeholder="Number of guests" />
            <textarea className="rounded-2xl px-4 py-3 text-stone-900 md:col-span-2 min-h-28" placeholder="Message"></textarea>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="md:col-span-2 inline-flex items-center justify-center rounded-full bg-white text-stone-900 px-8 h-12 font-semibold hover:bg-white/90">
              <Send className="h-4 w-4 mr-2" />
              Send inquiry by WhatsApp
            </a>
          </form>
        </div>
      </section>

      <section id="contact" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Home className="h-10 w-10 mx-auto mb-5" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready for your stay?</h2>
          <p className="text-lg text-stone-600 leading-8 mb-8">
            Contact the host directly to ask about dates, group size, house rules, airport transfers and local recommendations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#direct-booking">
              <Button size="lg">Book Now</Button>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="text-stone-900">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {galleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-7xl mx-auto px-5 py-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">Sunrise Villa Gallery</h2>
              <button onClick={() => setGalleryOpen(false)} className="rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-all">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allPhotos.map((photo, index) => (
                <div key={index} className="overflow-hidden rounded-3xl bg-white/5">
                  <img src={photo} alt={`Sunrise Villa photo ${index + 1}`} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-[90] rounded-full bg-green-600 text-white shadow-2xl px-5 h-14 flex items-center gap-2 font-semibold hover:bg-green-700 transition-all">
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>

      <footer className="bg-stone-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/60">
          <p>© 2026 Sunrise Villa Beach View. All rights reserved.</p>
          <p>Private pool · 6 bedrooms · Cape of Rodon · Albania</p>
        </div>
      </footer>
    </div>
  );
}
