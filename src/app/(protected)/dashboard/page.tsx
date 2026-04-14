import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Activity, BatteryCharging, Camera, Moon, Zap, ArrowRight, Utensils, Target, Flame } from "lucide-react";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  // Real-time backend fetch
  let bioMetric = await db.bioMetric.findUnique({
    where: { userId },
  });

  // Seed default data if not exists (for demo purposes, simulating real-sync)
  if (!bioMetric) {
    bioMetric = await db.bioMetric.create({
      data: {
        userId,
        fuelLevel: 84,
        sleepHours: 7.2,
        sleepStatus: "Optimal",
        stressLevel: "Moderate",
        stressStatus: "Trending High",
        recoveryStatus: "Active",
        recoveryDesc: "+12% vs avg"
      }
    });
  }

  // Fetch contextual events directly related to user
  let event = await db.calendarEvent.findFirst({
    where: { userId },
    orderBy: { id: 'desc' }
  });

  if (!event) {
    event = await db.calendarEvent.create({
      data: {
        userId,
        title: "Focus Mode",
        timeUntil: "High-stakes meeting in 40m.",
        description: "Bio-data indicates a projected glucose dip during your presentation.",
        recommendation: "Consume 15g Protein + Complex Carbs within the next 15 minutes to maintain peak cognitive performance."
      }
    });
  }

  let mealOptions = await db.mealOption.findMany();
  
  if (mealOptions.length === 0) {
    await db.mealOption.createMany({
      data: [
        { name: "Sweetgreen", description: "Harvest Bowl (Modified)", tags: ["Steady Focus"], tagColors: ["bg-blue-100", "text-blue-700"] },
        { name: "Joe & The Juice", description: "Iron Man Smoothie", tags: ["Recovery Boost"], tagColors: ["bg-purple-100", "text-purple-700"] },
        { name: "Chipotle", description: "Lifestyle Bowl (Keto)", tags: ["Gut Harmony"], tagColors: ["bg-emerald-100", "text-emerald-700"] },
      ]
    });
    mealOptions = await db.mealOption.findMany();
  }

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-charcoal p-4 md:p-8 space-y-6 max-w-4xl mx-auto pb-24">
      {/* 1. Metabolic Header */}
      <header className="flex flex-col items-center text-center space-y-4 pt-6 pb-4">
        <Badge variant="outline" className="border-brand-green text-brand-green bg-brand-green/10 flex items-center gap-2 px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
          <div className="w-2 h-2 rounded-full bg-brand-green absolute" />
          <span className="relative z-10 font-semibold tracking-wider">Live Bio-Sync</span>
        </Badge>
        
        <div className="space-y-1">
          <div className="flex items-baseline justify-center gap-2">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
              {bioMetric.fuelLevel}<span className="text-4xl text-slate-500">%</span>
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Current Fuel Level</p>
        </div>

        <div className="w-full max-w-md space-y-2 pt-4">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>Projected Energy (Next 4h)</span>
            <span className="text-brand-green">Optimal</span>
          </div>
          <Progress value={bioMetric.fuelLevel} className="h-2.5 bg-slate-200 dark:bg-slate-800" indicatorclass="bg-gradient-to-r from-brand-green to-emerald-400" />
        </div>
      </header>

      {/* 2. Contextual Intercept Card */}
      <section>
        <Card className="border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 shadow-md transform transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-semibold text-sm uppercase tracking-wider">
              <Target size={16} />
              <span>{event.title}</span>
            </div>
            <CardTitle className="text-lg md:text-xl leading-tight">
              {event.timeUntil}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-4 text-sm md:text-base font-medium text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-500/20">
              <span className="font-bold flex items-center gap-2 mb-1">
                <Flame size={16} className="text-amber-600" /> Recommendation
              </span>
              {event.recommendation}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Smart Action */}
      <section>
        <Button className="w-full h-16 text-lg rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 shadow-xl transition-all active:scale-[0.98] group">
          <Camera className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
          Scan Menu for Smart Choices
        </Button>
      </section>

      {/* 4. The "Pivot" Feed */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Nearby Smart Options</h3>
          <ArrowRight className="text-slate-400 h-5 w-5" />
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-4 p-1">
            {mealOptions.map((option, idx) => (
              <Card key={idx} className="w-[280px] shrink-0 border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={`${option.tagColors[0] || 'bg-slate-100'} ${option.tagColors[1] || 'text-slate-700'}`}>
                      {option.tags[0] || 'Smart Choice'}
                    </Badge>
                    <Utensils size={16} className="text-slate-400" />
                  </div>
                  <CardTitle className="text-base mt-2">{option.name}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full text-xs font-semibold h-8" size="sm">
                    View Smart Swap
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* 5. Bio-State Grid */}
      <section className="space-y-3 pt-2">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 px-1">Daily Bio-Markers</h3>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-sm pt-4 pb-4 flex flex-col items-center justify-center text-center space-y-2">
            <Moon className="h-6 w-6 text-indigo-500" />
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Sleep</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{bioMetric.sleepHours}h</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{bioMetric.sleepStatus}</p>
            </div>
          </Card>
          
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-sm pt-4 pb-4 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <Activity className="h-6 w-6 text-amber-500" />
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Stress</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{bioMetric.stressLevel}</p>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{bioMetric.stressStatus}</p>
            </div>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-sm pt-4 pb-4 flex flex-col items-center justify-center text-center space-y-2">
            <BatteryCharging className="h-6 w-6 text-emerald-500" />
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Recovery</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{bioMetric.recoveryStatus}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{bioMetric.recoveryDesc}</p>
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
}
