interface MenuOption {
    id: number
    title: string
    submenu?: MenuOption[]
}

interface MenuDisplayProps {
    menu: {
        title: string
        subtitle: string
        options: MenuOption[]
        type: string
    } | null
}

export function MenuDisplay({ menu }: MenuDisplayProps) {
    if (!menu) {
        return (
            <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p>Enter *465# to start</p>
            </div>
        )
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-1">{menu.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{menu.subtitle}</p>

            {menu.options.length > 0 ? (
                <ul className="space-y-1">
                    {menu.options.map((option) => (
                        <li key={option.id} className="flex">
                            <span className="font-bold mr-2">{option.id}.</span>
                            <span>{option.title}</span>
                        </li>
                    ))}
                </ul>
            ) : null}

            {menu.type !== "main" && (
                <div className="mt-3 text-sm text-gray-600">
                    <p>Press 0 to go back</p>
                    <p>Press 00 to return to main menu</p>
                </div>
            )}
        </div>
    )
}
