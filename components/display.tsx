import type React from "react"
import { getMenuContent } from "@/lib/menu-data"

interface DisplayProps {
    path: number[]
    isColorInputActive: boolean
    colorInput: string
}

const Display: React.FC<DisplayProps> = ({ path, isColorInputActive, colorInput }) => {
    const menuContent = getMenuContent(path)

    return (
        <div className="p-4 min-h-[300px] bg-gray-50 border-t border-b border-gray-200">
            <div className="mb-4 text-sm text-gray-500">
                {path.length === 0 ? "Main Menu" : `Submenu Level ${path.length}`}
            </div>

            {isColorInputActive ? (
                <div>
                    <h2 className="text-lg font-bold mb-2">Input Your Preferred Color</h2>
                    <div className="p-2 border border-gray-300 rounded mb-4 min-h-[40px]">
                        {colorInput || "Type your color preference..."}
                    </div>
                    <p className="text-sm text-gray-600">Press # to confirm your selection</p>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-bold mb-2">{menuContent.title}</h2>
                    <ul className="space-y-2">
                        {menuContent.options.map((option, index) => (
                            <li key={index} className="flex">
                                <span className="font-bold mr-2">{option.number}.</span>
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                    {path.length > 0 && (
                        <p className="mt-4 text-sm text-gray-600">Press 0 to go back, 00 to return to main menu</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Display
