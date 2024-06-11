import { AI_NAME } from "@/features/theme/theme-config";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/features/ui/toaster";
import { cn } from "@/ui/lib";
import { locales } from '@/utils/constants';
import initTranslations from '../i18n';
import TranslationsProvider from '@/utils/providers/translations-provider';

import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `Aithoria - Grow your Business with Hybrid Intelligence - KI`,
  description: 'Starte deine digitale Zukunft mit Hybrid Intelligence – optimale KI-Lösungen für dein Unternehmen. → Hier gehts zur Microsoft KI-Roadmap',
  openGraph: {
    title: `Aithoria - Grow your Business with Hybrid Intelligence - KI`,
    description: 'Starte deine digitale Zukunft mit Hybrid Intelligence – optimale KI-Lösungen für dein Unternehmen. → Hier gehts zur Microsoft KI-Roadmap',
    images: [{ url: `/LogoMitSlogan.png`, width: 2048, height: 532 }],
    siteName: `Aithoria - Azure Chat`,
  }
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return locales.map(l => ({ locale: l.value }));
};

const namespaces = ['auth', 'chat', 'mainMenu'];

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: 'de' | 'en' };
}) {
  const { resources } = await initTranslations(locale, namespaces);
  return (
    <html lang="en" className="h-full w-full overflow-hidden text-sm">
      <body
        className={cn(inter.className, "h-full w-full flex  bg-background")}
      >
        <TranslationsProvider {...{ locale, namespaces, resources }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
