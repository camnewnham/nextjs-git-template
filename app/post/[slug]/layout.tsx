export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`w-full p-4 sm:p-8`}>{children}</div>;
}
