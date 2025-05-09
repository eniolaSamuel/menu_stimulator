"use client"

import type React from "react"

interface KeyPadProps {
    onKeyPress: (key: string) => void
}

const KeyPad: React.FC<KeyPadProps> = ({ onKeyPress }) => {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"]

    return (
        <div className="bg-gray-300 p-4 rounded-xl shadow-lg transform translate-y-0 hover:translate-y-[-2px] transition-transform duration-200">
            <div className="grid grid-cols-3 gap-2">
                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => onKeyPress(key)}
                        className="bg-gray-200 text-gray-800 p-4 rounded-lg text-xl font-bold hover:bg-gray-100 active:bg-gray-300 transition-colors shadow"
                    >
                        {key}
                    </button>
                ))}
                <button
                    onClick={() => onKeyPress("00")}
                    className="col-span-3 bg-amber-700 text-black p-4 rounded-lg text-xl font-bold hover:bg-amber-600 active:bg-amber-800 transition-colors shadow"
                >
                    00 (Main Menu)
                </button>
            </div>
        </div>
    )
}

export default KeyPad
