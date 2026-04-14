"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { lazy, Suspense } from "react";
import BackButton from "./back-button";
import Header from "./header";

const Social = lazy(() => import("./social"));

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[450px] glass shadow-premium border-white/40 rounded-[2.5rem] p-4">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex-col gap-y-4">
          <div className="flex items-center w-full gap-2 opacity-20">
             <div className="h-px bg-brand-charcoal flex-1" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Or Continue With</span>
             <div className="h-px bg-brand-charcoal flex-1" />
          </div>
          <Suspense fallback={<div className="w-full h-12 animate-pulse bg-brand-charcoal/5 rounded-2xl" />}>
            <Social />
          </Suspense>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
