"use client";
import ms from "ms";

export function Age({ date, long }: { date: Date; long?: boolean }) {
  return ms(new Date().getTime() - date.getTime(), { long: long ?? false });
}
