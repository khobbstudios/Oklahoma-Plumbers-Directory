export type BusinessHours =
  | { type: "24-7" }
  | { type: "scheduled"; days: number[]; start: string; end: string };

const TIME_ZONE = "America/Chicago";
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// en-CA formats as "YYYY-MM-DD, HH:MM" on a 24-hour clock. We rely on that
// fixed numeric shape instead of Intl's "weekday"/hourCycle parts — some
// engines silently ignore hourCycle and fall back to 12-hour output with no
// AM/PM marker, which misreads afternoon hours as their AM equivalent and
// made open businesses show as closed.
const CHICAGO_NOW_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function getChicagoNow(now: Date): { day: number; minutesNow: number } {
  const formatted = CHICAGO_NOW_FORMATTER.format(now);
  const match = formatted.match(/(\d{4})-(\d{2})-(\d{2}),?\s*(\d{2}):(\d{2})/);
  if (!match) return { day: now.getDay(), minutesNow: 0 };

  const [, year, month, day, hour, minute] = match.map(Number) as unknown as number[];
  // Day-of-week for a calendar date doesn't depend on time zone, so a plain
  // local Date construction from the Chicago Y/M/D is safe here.
  const weekday = new Date(year, month - 1, day).getDay();
  return { day: weekday, minutesNow: hour * 60 + minute };
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatClockTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/** Business hours are evaluated in Claremore, OK local time (Central), not the visitor's. */
export function isOpenNow(hours: BusinessHours, now: Date = new Date()): boolean {
  if (hours.type === "24-7") return true;

  const { day, minutesNow } = getChicagoNow(now);

  if (!hours.days.includes(day)) return false;
  return minutesNow >= toMinutes(hours.start) && minutesNow < toMinutes(hours.end);
}

export function formatHoursSummary(hours: BusinessHours): string {
  if (hours.type === "24-7") return "Open 24 hours";

  const isWeekdays =
    hours.days.length === 5 && [1, 2, 3, 4, 5].every((d) => hours.days.includes(d));
  const dayLabel = isWeekdays
    ? "Mon–Fri"
    : hours.days.map((d) => DAY_LABELS[d]).join(", ");

  return `${dayLabel} · ${formatClockTime(hours.start)}–${formatClockTime(hours.end)}`;
}
