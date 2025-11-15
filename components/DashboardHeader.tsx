'use client'

import { Bell, Calendar, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

interface DashboardHeaderProps {
  onMenuClick?: () => void
  isMobileMenuOpen?: boolean
}

export function DashboardHeader({ onMenuClick, isMobileMenuOpen }: DashboardHeaderProps) {
  const today = new Date()
  const dayName = format(today, 'EEEE')
  const date = format(today, 'MM/dd/yyyy')

  return (
    <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
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
          <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center">
            <div className="text-white text-xs font-bold">D</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-xs md:text-sm font-bold text-slate-900">DREAMY</div>
            <div className="text-xs font-semibold text-slate-700">SOFTWARE</div>
          </div>
        </div>
      </div>

      {/* Right Section - Date & Icons */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Date - Hidden on small mobile */}
        <div className="text-right hidden sm:block">
          <div className="text-xs md:text-sm font-semibold text-slate-900">{dayName}</div>
          <div className="text-xs text-slate-500">{date}</div>
        </div>

        {/* Icon Buttons */}
        <div className="flex gap-2 md:gap-3">
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
        </div>
      </div>
    </div>
  )
}
