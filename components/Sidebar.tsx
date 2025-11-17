"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CheckSquare2, User, LogOut, X, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "./ui/label";

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Todos", href: "/dashboard/todos", icon: CheckSquare2 },
  { label: "Account Information", href: "/dashboard/account", icon: User },
];

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isLoading, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="w-56 sm:w-80 md:w-64 lg:w-80 bg-[#0D224A] text-white flex flex-col h-screen py-5 overflow-y-auto">
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <h1 className="font-bold text-lg">Menu</h1>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Logo & User Section */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-20 md:w-24 h-20 md:h-24 mb-4">
            <AvatarImage
              src={user?.profile_image}
              alt="User avatar"
              className=""
            />
            <AvatarFallback className="bg-slate-700">AM</AvatarFallback>
          </Avatar>
          {!isLoading ? (
            <>
              <h2 className="font-semibold text-base md:text-lg">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 line-clamp-1">
                {user?.email}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 md:py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-5 md:px-8 py-2 md:py-3 transition-colors",
                isActive
                  ? "bg-linear-to-br from-blue-900 to-slate-[#0D224A] text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="text-sm md:text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mb-4">
        <Label
          className="w-full flex items-center justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800 text-sm md:text-base rounded-none cursor-pointer py-3 px-6"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </Label>
      </div>
    </div>
  );
}
