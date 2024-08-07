"use client";
import { TocElement } from "@/app/lib/rehypeToc";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: TocElement[] }) {
  if (!headings || headings.length === 0) return null;

  const [anchorInView, setAnchorInView] = useState<string>();

  return (
    <>
      <HeadingObserver
        headings={headings.flatMap((h) => h.id)}
        onChange={setAnchorInView}
      />
      {headings?.map((item) => (
        <TocItem key={item.id} item={item} inView={anchorInView == item.id} />
      ))}
    </>
  );
}

function HeadingObserver({
  headings,
  onChange,
}: {
  headings: string[];
  onChange: (id: string) => void;
}) {
  useEffect(() => {
    const markdown = document.getElementsByClassName("markdown-body")[0];

    // Create a map of element -> section
    const sections: Map<Element, string> = new Map();
    let currentAnchor: string | undefined = undefined;
    for (let child of Array.from(markdown.children)) {
      if (headings.includes(child.id)) {
        currentAnchor = child.id;
      }
      if (currentAnchor != null) {
        sections.set(child, currentAnchor);
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const hit = sections.get(entry.target);
          if (hit) {
            onChange(hit);
          }
        }
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      }
    );
    sections.forEach((_, element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);
  return null;
}

function TocItem({ item, inView }: { item: TocElement; inView?: boolean }) {
  const { id, rank } = item;

  // Choose tailwind class based on the rank
  let padding = "pl-0";
  switch (rank) {
    case 2:
      padding = "pl-2";
      break;
    case 3:
      padding = "pl-4";
      break;
    case 4:
      padding = "pl-6";
      break;
    case 5:
      padding = "pl-8";
      break;
    case 6:
      padding = "pl-10";
      break;
  }

  return (
    <div
      className={`text-sm whitespace-nowrap text-nowrap overflow-ellipsis overflow-x-hidden ${
        inView ? "text-default" : "text-muted"
      } ${padding}`}
    >
      <Link href={`#${item.id}`}>{item.title}</Link>
    </div>
  );
}
