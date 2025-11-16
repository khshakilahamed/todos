"use client";

import { Bell, Calendar, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Logo from "./../assets/logo.png";
import Image from "next/image";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  isMobileMenuOpen?: boolean;
}

export function DashboardHeader({
  onMenuClick,
  isMobileMenuOpen,
}: DashboardHeaderProps) {

  const today = new Date();
  const dayName = format(today, "EEEE");
  const date = format(today, "dd/MM/yyyy");

  return (
    <div className="bg-white px-4 md:px-10 py-3 md:py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" />
        </div>
      </div>

      {/* Right Section - Date & Icons */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Icon Buttons */}
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-9 w-9 md:h-10 md:w-10"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-9 w-9 md:h-10 md:w-10"
        >
          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        {/* Date - Hidden on small mobile */}
        <div className="hidden sm:block font-semibold">
          <div className="text-xs md:text-sm text-slate-900">{dayName}</div>
          <div className="text-sm">{date}</div>
        </div>
      </div>
    </div>
  );
}
