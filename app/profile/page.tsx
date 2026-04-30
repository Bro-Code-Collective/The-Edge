"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Bell, Shield, LogOut, ChevronRight, Moon, Sun, 
  BadgeCheck, Pencil, CreditCard, Heart, 
  HelpCircle, MessageSquare, FileText, ExternalLink
} from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Header } from "@/components/layout/Header";

export default function ProfilePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: "Orders", value: "24" },
    { label: "Favorites", value: "12" },
    { label: "Points", value: "850" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* ── LEFT COLUMN (Profile Info) ── */}
          <aside className="w-full md:w-80 shrink-0">
            <div className="bg-white dark:bg-card border border-border rounded-[2.5rem] p-8 shadow-soft sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-background shadow-elevated">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop" 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-white dark:bg-background rounded-full p-1 shadow-soft">
                    <BadgeCheck className="w-6 h-6 text-primary fill-primary/10" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold tracking-tight">Sarah Jenkins</h2>
                  <button className="text-muted-foreground hover:text-primary transition-smooth" aria-label="Edit Name">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-muted-foreground text-sm font-medium mb-8">Engineering Student • L3</p>

                <div className="w-full grid grid-cols-3 gap-4 border-y border-border py-6 mb-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/favorites"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-foreground text-background dark:bg-white dark:text-black rounded-2xl font-bold hover:opacity-90 transition-smooth shadow-pop"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  View Favorites
                </Link>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN (Settings) ── */}
          <div className="flex-1 space-y-8">
            <section>
              <h3 className="label-mono mb-4 ml-2">Appearance</h3>
              <div className="bg-white dark:bg-card border border-border rounded-3xl overflow-hidden shadow-soft">
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center">
                      <Moon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-bold text-[16px]">Dark Mode</div>
                      <div className="text-[12px] text-muted-foreground font-medium">Simplify your night viewing</div>
                    </div>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </section>

            {/* Account Settings */}
            <section>
              <h3 className="label-mono mb-4 ml-2">Preferences</h3>
              <div className="bg-white dark:bg-card border border-border rounded-[2rem] overflow-hidden shadow-soft">
                {[
                  { icon: Bell, label: "Notifications", sub: "Control your alerts" },
                  { icon: CreditCard, label: "Payment Methods", sub: "Manage your cards" },
                  { icon: MessageSquare, label: "Give Feedback", sub: "Help us improve" },
                  { icon: HelpCircle, label: "Help Center", sub: "FAQs and guides" },
                ].map((item, idx, arr) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between p-5 hover:bg-secondary/50 transition-smooth text-left ${
                      idx !== arr.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-bold text-[16px]">{item.label}</div>
                        <div className="text-[12px] text-muted-foreground font-medium">{item.sub}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/30" />
                  </button>
                ))}
              </div>
            </section>

            {/* Legal & Security */}
            <section>
              <h3 className="label-mono mb-4 ml-2">Security & Legal</h3>
              <div className="bg-white dark:bg-card border border-border rounded-[2rem] overflow-hidden shadow-soft">
                {[
                  { icon: Shield, label: "Privacy & Security", sub: "Data and login protection" },
                  { icon: FileText, label: "Terms and Conditions", sub: "Our legal policies", href: "/terms" },
                ].map((item, idx, arr) => (
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center justify-between p-5 hover:bg-secondary/50 transition-smooth ${
                        idx !== arr.length - 1 ? "border-b border-border/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-bold text-[16px]">{item.label}</div>
                          <div className="text-[12px] text-muted-foreground font-medium">{item.sub}</div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground/30" />
                    </Link>
                  ) : (
                    <button 
                      key={item.label}
                      className={`w-full flex items-center justify-between p-5 hover:bg-secondary/50 transition-smooth text-left ${
                        idx !== arr.length - 1 ? "border-b border-border/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-bold text-[16px]">{item.label}</div>
                          <div className="text-[12px] text-muted-foreground font-medium">{item.sub}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/30" />
                    </button>
                  )
                ))}
              </div>
            </section>

            <button className="w-full flex items-center justify-center gap-2 py-5 text-destructive font-bold hover:bg-destructive/5 rounded-[2rem] transition-smooth border border-transparent hover:border-destructive/10">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
