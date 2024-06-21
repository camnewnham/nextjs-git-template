import Link from "next/link";
import { Fragment } from "react";

export function Pagination({
  current,
  last,
  baseUrl,
}: {
  current: number;
  last: number;
  baseUrl: string;
}) {
  const isFirst = current === 1;
  const isLast = current === last;

  const cells: React.ReactNode[] = [];
  if (!isFirst)
    cells.push(<Cell link={`${baseUrl}${current - 1}`}>Previous</Cell>);

  if (last <= 9) {
    // Render all pages
    for (let i = 1; i <= last; i++) {
      cells.push(
        <Cell link={i == current ? null : `${baseUrl}${i}`}>{i}</Cell>
      );
    }
  } else {
    if (!isFirst) {
      if (current <= 4) {
        for (let i = 1; i < current; i++) {
          cells.push(<Cell link={`${baseUrl}${i}`}>{i}</Cell>);
        }
      } else {
        cells.push(<Cell link={`${baseUrl}${1}`}>{1}</Cell>);
        cells.push(<Cell>...</Cell>);
        cells.push(
          <Cell link={`${baseUrl}${current - 2}`}>{current - 2}</Cell>
        );
        cells.push(
          <Cell link={`${baseUrl}${current - 1}`}>{current - 1}</Cell>
        );
      }
    }

    cells.push(<Cell>{current}</Cell>);

    if (!isLast) {
      if (current < last - 3) {
        cells.push(
          <Cell link={`${baseUrl}${current + 1}`}>{current + 1}</Cell>
        );
        cells.push(
          <Cell link={`${baseUrl}${current + 2}`}>{current + 2}</Cell>
        );
        cells.push(<Cell>...</Cell>);
        cells.push(<Cell link={`${baseUrl}${last}`}>{last}</Cell>);
      } else {
        for (let i = current + 1; i <= last; i++) {
          cells.push(<Cell link={`${baseUrl}${i}`}>{i}</Cell>);
        }
      }
    }
  }

  if (!isLast) cells.push(<Cell link={`${baseUrl}${current + 1}`}>Next</Cell>);

  return (
    <div className="divide-x divide-default rounded-lg border-2 border-default">
      {cells.map((cell, i) => (
        <Fragment key={i}>{cell}</Fragment>
      ))}
    </div>
  );
}

function Cell({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: string | null;
}) {
  const disabled = link == null;
  return (
    <div
      className={`first:rounded-l-md last:rounded-r-md min-w-8 align-middle text-center inline-grid ${
        disabled ? "bg-neutral-muted" : "hover:bg-muted"
      }`}
    >
      <Link
        href={link ?? "#"}
        className={`p-2
        ${disabled ? "pointer-events-none" : ""}
        `}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    </div>
  );
}
