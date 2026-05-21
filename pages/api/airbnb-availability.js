const AIRBNB_ICAL =
  process.env.AIRBNB_ICAL_URL ||
  "https://www.airbnb.com.au/calendar/ical/1482025180626892860.ics?t=cb038da5f847402cab6338b84153df68";

const BOOKING_ICAL =
  process.env.BOOKING_ICAL_URL ||
  "https://ical.booking.com/v1/export?t=d493a735-476a-4fa3-9c8b-352c3a60c18f";

export default async function handler(req, res) {
  try {
    const calendars = await Promise.allSettled([
      fetchCalendar(AIRBNB_ICAL),
      fetchCalendar(BOOKING_ICAL),
    ]);

    const allDates = new Set();

    for (const result of calendars) {
      if (result.status === "fulfilled") {
        for (const date of parseIcalUnavailableDates(result.value)) {
          allDates.add(date);
        }
      }
    }

    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");

    return res.status(200).json({
      unavailableDates: Array.from(allDates).sort(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Calendar API error",
      message: error.message,
    });
  }
}

async function fetchCalendar(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "SunriseVillaAvailabilityCalendar/1.0",
      Accept: "text/calendar,text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`Calendar fetch failed: ${response.status}`);
  }

  return response.text();
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

    while (current < endDate) {
      dates.add(formatLocalDate(current));
      current.setDate(current.getDate() + 1);
    }
  }

  return Array.from(dates);
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
