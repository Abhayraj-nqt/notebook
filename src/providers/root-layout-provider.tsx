import { TooltipProvider } from "@/components/ui/tooltip";
import NuqsProvider from "./nuqs-provider";
import TanstackQueryProvider from "./tanstack-query-provider";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: React.ReactNode;
};

export default function RootLayoutProvider({ children }: Readonly<Props>) {
  return (
    <NuqsProvider>
      <TanstackQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </TanstackQueryProvider>
    </NuqsProvider>
  );
}
