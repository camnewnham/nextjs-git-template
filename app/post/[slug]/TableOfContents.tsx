"use client";
import { TocElement } from "@/app/lib/rehypeToc";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: TocElement[] }) {
  if (!headings || headings.length === 0) return null;

  return headings?.map((item) => <TocItem key={item.id} item={item} />);
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
        rootMargin: "0px 0px 0px 0px",
      }
    );
    observer.observe(document.getElementById(id)!);
    return () => observer.disconnect();
  }, [id]);

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
