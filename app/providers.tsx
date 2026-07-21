"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
// TODO: Replace with real PostHog key from environment variable
// import posthog from "posthog-js";
// import { PostHogProvider } from "posthog-js/react";

import { ThemeColorSync } from "@/components/layout/ThemeColorSync";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [position, setPosition] = useState<"top-center" | "top-right">("top-right");

  useEffect(() => {
    const handleResize = () => {
      setPosition(window.innerWidth < 768 ? "top-center" : "top-right");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {/* TODO: Wrap with PostHogProvider once real key is set */}
        <ThemeColorSync />
        {children}
        <Toaster
          richColors
          position={position}
          offset={{ top: 88, right: 24 }}
          mobileOffset={{ top: 24 }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
