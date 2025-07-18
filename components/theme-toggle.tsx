"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105 bg-transparent"
    >
      <div className="relative flex items-center space-x-2">
        {isDark ? (
          <>
            <Sun className="h-4 w-4 text-yellow-500 animate-spin" />
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 text-blue-600 animate-pulse" />
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </div>
    </Button>
  )
}
