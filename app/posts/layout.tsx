export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className={`w-full max-w-[800px] p-4 sm:p-8`}>{children}</div>
    </div>
  );
}
