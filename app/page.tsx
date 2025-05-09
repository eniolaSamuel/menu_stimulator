"use client"

import { useState, useEffect } from "react"
import KeyPad from "@/components/key-pad"
import Display from "@/components/display"
import { generateCode } from "@/lib/code-parser"

export default function Home() {
  const [inputCode, setInputCode] = useState("")
  const [currentPath, setCurrentPath] = useState<number[]>([])
  const [colorInput, setColorInput] = useState("")
  const [isColorInputActive, setIsColorInputActive] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)


  useEffect(() => {
    if (inputCode.startsWith("*465") && inputCode.endsWith("#")) {
      const path = inputCode
          .slice(4, inputCode.length - 1) // Remove *465 and #
          .split("*")
          .filter((item) => item !== "")
          .map(Number)

      setCurrentPath(path)


      const isAtColorInput =
          path.length === 3 && (path[0] === 3 || path[0] === 4 || path[0] === 5) && path[2] >= 1 && path[2] <= 5

      setIsColorInputActive(isAtColorInput)
    }
  }, [inputCode])


  const handleKeyPress = (key: string) => {
    if (isColorInputActive) {
      if (key === "#") {
        if (colorInput) {
          alert(`Appointment booked! Your preferred color: ${colorInput}`)
          setInputCode("*465#")
          setColorInput("")
          setIsColorInputActive(false)
          return
        }
      }


      if (key !== "0" && key !== "00") {
        setColorInput((prev) => prev + key)
        return
      }
    }


    if (key === "0" && currentPath.length > 0) {

      const newPath = [...currentPath]
      newPath.pop()
      setInputCode(generateCode(newPath))
      return
    }

    // Handle main menu navigation
    if (key === "00" && currentPath.length > 0) {
      // Return to main menu
      setInputCode("*465#")
      return
    }

    // For all other input, simply append to the code
    setInputCode((prev) => prev + key)
  }

  // Handle direct code input
  const handleDirectCodeInput = (code: string) => {
    setInputCode(code)
  }

  // Handle enter button click
  const handleEnterClick = () => {
    if (inputCode.startsWith("*465") && inputCode.endsWith("#")) {
      setIsInitialized(true)

      // If it's a complex code with multiple selections, parse it
      if (inputCode.length > 6) {
        // More than just *465#
        // The code will be parsed by the useEffect that watches inputCode
      }
    } else {
      alert("Please enter a valid code format (e.g., *465#)")
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-amber-800 text-white text-center font-bold">COCOALATE CROWN CRAFT</div>

          {isInitialized ? (
              <Display path={currentPath} isColorInputActive={isColorInputActive} colorInput={colorInput} />
          ) : (
              <div className="p-8 bg-gray-50 border-t border-b border-gray-200 text-center">
                <h2 className="text-lg font-bold mb-4">Welcome to COCOALATE CROWN CRAFT</h2>
                <p className="mb-4">Please enter the code *465# to access our services</p>
              </div>
          )}

          <div className="p-4 bg-gray-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter Code:</label>
              <div className="flex">
                <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => handleDirectCodeInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-l"
                    placeholder="*465#"
                />
              </div>
              <button
                  onClick={handleEnterClick}
                  className="w-full mt-2 bg-amber-600 text-black p-2 rounded font-medium hover:bg-amber-500 transition-colors"
              >
                Enter
              </button>
            </div>
          </div>
        </div>

        {/* Floating Keypad */}
        <div className="mt-6 w-full max-w-md">
          <KeyPad onKeyPress={handleKeyPress} />
        </div>
      </main>
  )
}
