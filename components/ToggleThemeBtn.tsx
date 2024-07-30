"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Button from "./button"

interface ToggleThemeBtnProps{

}

export function ToggleThemeBtn() {
  const { setTheme } = useTheme()

  return (
    <Button>
        <Sun/>
    </Button>
  )
}
