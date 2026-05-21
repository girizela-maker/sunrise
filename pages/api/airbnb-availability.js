const ICAL_URL =
  process.env.AIRBNB_ICAL_URL ||
  "https://www.airbnb.com.au/calendar/ical/1482025180626892860.ics?t=cb038da5f847402cab6338b84153df68";

export default async function handler(req, res) {
  try {
    const response = await fetch(ICAL_URL, {
      headers: {
        "User-Agent": "SunriseVillaAvailabilityCalendar/1.0",
        Accept: "text/calendar,text/plain,*/*",
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        error: "Could not fetch Airbnb calendar",
        status: response.status,
      });
    }

    const ics = await response.text();
    const unavailableDates = parseIcalUnavailableDates(ics);

    // Cache for 30 minutes on Vercel/CDN.
    // Airbnb itself may also cache iCal feeds, so changes may not be instant.
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");

    return res.status(200).json({
      unavailableDates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Calendar API error",
      message: error.message,
    });
  }
}

function parseIcalUnavailableDates(ics) {
  const events = ics.split("BEGIN:VEVENT").slice(1);
  const dates = new Set();

  for (const event of events) {
    const start =
      event.match(/DTSTART;VALUE=DATE:(\d{8})/) ||
      event.match(/DTSTART:(\d{8})/);

    const end =
      event.match(/DTEND;VALUE=DATE:(\d{8})/) ||
      event.match(/DTEND:(\d{8})/);

    if (!start || !end) continue;

    let current = toLocalDate(start[1]);
    const endDate = toLocalDate(end[1]);

    // Airbnb DTEND is usually exclusive, so we stop before the end date.
    while (current < endDate) {
      dates.add(formatLocalDate(current));
      current.setDate(current.getDate() + 1);
    }
  }

  return Array.from(dates).sort();
}

function toLocalDate(value) {
  return new Date(
    Number(value.slice(0, 4)),
    Number(value.slice(4, 6)) - 1,
    Number(value.slice(6, 8))
  );
}

function formatLocalDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
