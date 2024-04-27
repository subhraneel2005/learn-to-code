import SessionWrapper from "@/components/SessionWrapper";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <SessionWrapper>
        {children}
      </SessionWrapper>
    );
  }