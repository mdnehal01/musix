"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
      <div className="rounded-full p-[11px] cursor-pointer bg-white dark:bg-neutral-800">
          <Moon onClick={() => setTheme("light")} className="h-[1.2rem] w-[1.2rem] rotate-0 dark:flex transition-all dark:-rotate-90 hidden" />
          <Sun onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] dark:hidden transition-all flex" />
      </div>
        
  )
}
