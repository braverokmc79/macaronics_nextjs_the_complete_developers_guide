import Providers from "@/app/provders";

export const metadata = {
  title: "shadcn table data",
  description: "Using React Query with Next.js 15 App Router",
};

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return (
        <Providers>
          {children}
        </Providers>      
  );
}