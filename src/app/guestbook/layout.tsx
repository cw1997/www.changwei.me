import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Guestbook",
};

export default function GuestbookPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  )
}
