"use client";
import { TocElement } from "@/app/lib/rehypeToc";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: TocElement[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <div className="sticky top-4">
      {headings?.map((item) => (
        <TocItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function TocItem({ item }: { item: TocElement }) {
  const { id, rank } = item;
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px 90% 0px",
      }
    );
    observer.observe(document.getElementById(id)!);
    return () => observer.disconnect();
  }, [id]);

  return (
    <div className={`${inView && "font-bold"} pl-${(rank - 1) * 2}`}>
      <Link href={`#${item.id}`}>{item.title}</Link>
    </div>
  );
}
