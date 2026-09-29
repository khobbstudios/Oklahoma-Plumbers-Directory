export type BusinessHours =
  | { type: "24-7" }
  | { type: "scheduled"; days: number[]; start: string; end: string };

const TIME_ZONE = "America/Chicago";
const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const day = WEEKDAY_INDEX[weekday] ?? 0;
  const minutesNow = hour * 60 + minute;

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
