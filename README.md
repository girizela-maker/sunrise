# Sunrise Villa Final Website

Upload the contents of this folder to GitHub, not the ZIP file.

## Vercel settings

Framework Preset: Next.js  
Build Command: npm run build  
Output Directory: leave empty  
Root Directory: leave empty  

If Vercel has a Build Command set to `npm run vercel-build`, this project also supports it.

## Photos

The folder `public/photos` is included.

Put all villa photos inside:
public/photos

The website expects the photo filenames already listed in `pages/index.jsx`.

## Calendars

The API route merges:
- Airbnb iCal
- Booking.com iCal

File:
pages/api/airbnb-availability.js
