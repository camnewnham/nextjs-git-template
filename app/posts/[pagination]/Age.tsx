"use client";
import ms from "ms";

export function Age({ date }: { date: Date }) {
  return ms(new Date().getTime() - date.getTime());
}
