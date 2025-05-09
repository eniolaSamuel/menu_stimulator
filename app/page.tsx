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
  const [simpleInput, setSimpleInput] = useState("")


  useEffect(() => {
    if (inputCode.startsWith("*465") && inputCode.endsWith("#")) {
      const path = inputCode
          .slice(4, inputCode.length - 1)
          .split("*")
          .filter((item) => item !== "")
          .map(Number)

      setCurrentPath(path)


      const isAtColorInput =
          path.length === 3 && (path[0] === 3 || path[0] === 4 || path[0] === 5) && path[2] >= 1 && path[2] <= 5

      setIsColorInputActive(isAtColorInput)
      setIsInitialized(true)
    }
  }, [inputCode])

  // Process simple input (just numbers after initialization)
  const processSimpleInput = (input: string) => {
    if (!isInitialized) return

    // If we're in color input mode, handle differently
    if (isColorInputActive) {
      if (input === "#") {
        if (colorInput) {
          alert(`Appointment booked! Your preferred color: ${colorInput}`)
          setInputCode("*465#")
          setColorInput("")
          setIsColorInputActive(false)
          setSimpleInput("")
        }
      } else if (input === "0") {
        // Go back one level
        const newPath = [...currentPath]
        newPath.pop()
        setInputCode(generateCode(newPath))
        setSimpleInput("")
      } else if (input === "00") {
        // Return to main menu
        setInputCode("*465#")
        setSimpleInput("")
      } else {
        // Add to color input
        setColorInput((prev) => prev + input)
      }
      return
    }

    // Handle navigation inputs
    if (input === "#") {
      // Process the current simple input as a selection
      if (simpleInput) {
        const selection = Number.parseInt(simpleInput)
        if (!isNaN(selection)) {
          const newPath = [...currentPath, selection]
          setInputCode(generateCode(newPath))
        }
        setSimpleInput("")
      }
    } else if (input === "0") {
      // Go back one level
      if (currentPath.length > 0) {
        const newPath = [...currentPath]
        newPath.pop()
        setInputCode(generateCode(newPath))
        setSimpleInput("")
      }
    } else if (input === "00") {
      // Return to main menu
      setInputCode("*465#")
      setSimpleInput("")
    } else {
      // Add to simple input buffer
      setSimpleInput((prev) => prev + input)
    }
  }

  // Handle keypad input
  const handleKeyPress = (key: string) => {
    // Check if this is a full code input starting with *
    if (key === "*" || inputCode.includes("*")) {
      // Handle as full code input
      setInputCode((prev) => prev + key)
      return
    }

    // Otherwise, process as simple input
    processSimpleInput(key)
  }

  // Handle direct code input
  const handleDirectCodeInput = (code: string) => {
    // If it starts with *, treat as full code
    if (code.startsWith("*")) {
      setInputCode(code)
    } else {
      // Otherwise, treat as simple input
      setSimpleInput(code)
    }
  }

  // Handle enter button click
  const handleEnterClick = () => {
    // Check if we have a full code input
    if (inputCode.startsWith("*465") && inputCode.endsWith("#")) {
      // Process full code
      // The useEffect will handle this
    }
    // Check if we have a simple input and are already initialized
    else if (isInitialized && simpleInput) {
      const selection = Number.parseInt(simpleInput)
      if (!isNaN(selection)) {
        const newPath = [...currentPath, selection]
        setInputCode(generateCode(newPath))
        setSimpleInput("")
      }
    }
    // Invalid input
    else if (!isInitialized) {
      alert("Please enter a valid code format (e.g., *465#)")
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-amber-800 text-white text-center font-bold">COCOALATE CROWN CRAFT</div>

          {isInitialized ? (
              <Display
                  path={currentPath}
                  isColorInputActive={isColorInputActive}
                  colorInput={colorInput}
                  simpleInput={simpleInput}
              />
          ) : (
              <div className="p-8 bg-gray-50 border-t border-b border-gray-200 text-center">
                <h2 className="text-lg font-bold mb-4">Welcome to COCOALATE CROWN CRAFT</h2>
                <p className="mb-4">Please enter the code *465# to access our services</p>
              </div>
          )}

          <div className="p-4 bg-gray-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isInitialized ? "Enter Selection or Full Code:" : "Enter Code:"}
              </label>
              <div className="flex">
                <input
                    type="text"
                    value={inputCode.startsWith("*") ? inputCode : simpleInput}
                    onChange={(e) => handleDirectCodeInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-l"
                    placeholder={isInitialized ? "Enter number or *465*..." : "*465#"}
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
