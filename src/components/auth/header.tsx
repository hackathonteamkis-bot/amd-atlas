"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-green">N</div>
        <span className="font-black text-2xl tracking-tighter uppercase text-brand-charcoal">Nourish</span>
      </div>
      <p className="text-brand-charcoal/60 text-sm font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
};

export default Header;
