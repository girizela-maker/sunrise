# Sunrise Villa Website

This is a ready-to-deploy Next.js website for Sunrise Villa with an Airbnb iCal availability calendar.

## How to run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## How the live calendar works

The website calls:

```text
/api/airbnb-availability
```

That serverless API fetches the Airbnb iCal feed, parses booked dates, and returns them to the calendar.

## Deploy on Vercel

1. Create a free account on Vercel.
2. Upload this project to GitHub.
3. Import the GitHub project into Vercel.
4. Deploy.

Optional but recommended:

Add this Environment Variable in Vercel:

```text
AIRBNB_ICAL_URL=https://www.airbnb.com.au/calendar/ical/1482025180626892860.ics?t=cb038da5f847402cab6338b84153df68
```

The API already includes the link as a fallback, but using an environment variable is safer.

## Important

Airbnb iCal feeds may not update instantly. They often update every few hours because of platform caching.
The Airbnb listing should remain the final source for confirmed availability.
