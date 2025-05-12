"use client"

import { useState, useEffect } from "react"
import { MenuDisplay } from "@/components/menu-display"
import { menuData } from "@/lib/menu-data"

export default function Home() {
  const [code, setCode] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("")
  const [currentMenu, setCurrentMenu] = useState<never>(null)
  const [showColorInput, setShowColorInput] = useState<boolean>(false)
  const [history, setHistory] = useState<string[]>([])


  useEffect(() => {
    if (code === "*465#") {
      setCurrentMenu({
        title: "Welcome to COCOALATE CROWN CRAFT",
        subtitle: "Which of these services would interest you?",
        options: menuData.mainMenu,
        type: "main",
      })
      setShowColorInput(false)
    } else if (code.startsWith("*465*")) {
      const parts = code.slice(0, -1).split("*").filter(Boolean)
      parts.shift() // Remove the "465" part

      let menu = menuData.mainMenu
      let currentTitle = "Welcome to COCOALATE CROWN CRAFT"
      let currentSubtitle = "Which of these services would interest you?"
      let menuType = "main"
      let serviceDetails = ""

      for (let i = 0; i < parts.length; i++) {
        const selection = Number.parseInt(parts[i], 10)

        if (i === 0) {
          // First level selection (main menu)
          const selectedOption = menu[selection - 1]
          if (!selectedOption) break

          currentTitle = selectedOption.title
          serviceDetails = selectedOption.title

          if (selection === 3 || selection === 4 || selection === 5) {
            menu = selectedOption.submenu || []
            currentSubtitle = "Select Your Preferred Style"
            menuType = "submenu1"
          } else {
            menu = []
            currentSubtitle = `Thank you! You have booked a service for ${serviceDetails}.`
            menuType = "final"
          }
        } else if (i === 1 && (parts[0] === "3" || parts[0] === "4" || parts[0] === "5")) {
          // Second level selection (submenu 1)
          const mainSelection = Number.parseInt(parts[0], 10)
          const mainOption = menuData.mainMenu[mainSelection - 1]
          const selectedOption = mainOption.submenu?.[selection - 1]
          if (!selectedOption) break

          currentTitle = `${mainOption.title} - ${selectedOption.title}`
          serviceDetails = `${mainOption.title} - ${selectedOption.title}`
          menu = menuData.lengthMenu
          currentSubtitle = "Select Your Preferred Length"
          menuType = "submenu2"
        } else if (i === 2 && (parts[0] === "3" || parts[0] === "4" || parts[0] === "5")) {
          // Third level selection (submenu 2 - length)
          const lengthOption = menuData.lengthMenu[selection - 1]
          if (!lengthOption) break

          currentTitle += ` - ${lengthOption.title}`
          serviceDetails += ` - ${lengthOption.title}`
          menu = []
          currentSubtitle = "Input Your Preferred Color"
          menuType = "color"
          setShowColorInput(true)
        } else if (i === 3 && (parts[0] === "3" || parts[0] === "4" || parts[0] === "5")) {
          // Color input
          const colorValue = parts[i]
          currentTitle += ` - Color: ${colorValue}`
          serviceDetails += ` - Color: ${colorValue}`
          menu = []
          currentSubtitle = `Thank you! You have booked a service for ${serviceDetails}.`
          menuType = "final"
          setShowColorInput(false)
        }
      }

      setCurrentMenu({
        title: currentTitle,
        subtitle: currentSubtitle,
        options: menu,
        type: menuType,
      })
    }
  }, [code])

  const handleSubmit = () => {
    if (inputValue.endsWith("#")) {
      // Process the code
      const newCode = inputValue
      setCode(newCode)
      setHistory((prev) => [...prev, newCode])
      setInputValue("")
    } else if (currentMenu && !showColorInput) {
      // Handle menu selection
      const selection = Number.parseInt(inputValue, 10)

      if (inputValue === "00" && code !== "*465#") {
        // Return to main menu
        setCode("*465#")
        setInputValue("")
        return
      }

      if (inputValue === "0" && code !== "*465#") {
        // Go back one level
        const parts = code.slice(0, -1).split("*").filter(Boolean)
        if (parts.length <= 1) {
          setCode("*465#")
        } else {
          const newCode = "*" + parts.slice(0, parts.length - 1).join("*") + "#"
          setCode(newCode)
        }
        setInputValue("")
        return
      }

      if (selection > 0 && selection <= currentMenu.options.length) {
        const newCode = code.slice(0, -1) + "*" + selection + "#"
        setCode(newCode)
        setInputValue("")
      }
    } else if (showColorInput) {
      // Handle color input
      const newCode = code.slice(0, -1) + "*" + inputValue + "#"
      setCode(newCode)
      setInputValue("")
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-100">
        <div className="z-10 w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Hair Salon Menu Simulator</h1>

            <div className="mb-6">
              <div className="flex">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder={showColorInput ? "Enter color..." : "Enter code or selection..."}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700"
                >
                  Submit
                </button>
              </div>
            </div>

            <MenuDisplay menu={currentMenu} />
          </div>
        </div>
      </main>
  )
}
