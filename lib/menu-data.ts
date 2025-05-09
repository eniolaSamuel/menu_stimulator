interface MenuOption {
    number: number
    label: string
}

interface MenuContent {
    title: string
    options: MenuOption[]
}


const mainMenu: MenuContent = {
    title: "Welcome to COCOALATE CROWN CRAFT, which of these services would interest you?",
    options: [
        { number: 1, label: "Washing" },
        { number: 2, label: "Steaming" },
        { number: 3, label: "Braiding" },
        { number: 4, label: "Frontal Install" },
        { number: 5, label: "Sew-In" },
        { number: 6, label: "Chemical Straightening" },
    ],
}


const braidingStylesMenu: MenuContent = {
    title: "Select Your Preferred Style",
    options: [
        { number: 1, label: "Ghana Braids" },
        { number: 2, label: "Lemonade Braids" },
        { number: 3, label: "Goddess Braids" },
        { number: 4, label: "Knotless Braids" },
        { number: 5, label: "Cornrows" },
    ],
}

const frontalStylesMenu: MenuContent = {
    title: "Select Your Preferred Style",
    options: [
        { number: 1, label: "Ponytail" },
        { number: 2, label: "Center Part Closure" },
        { number: 3, label: "Side Part Closure" },
        { number: 4, label: "360 Frontal" },
        { number: 5, label: "Half up- Half down" },
    ],
}

const sewInStylesMenu: MenuContent = {
    title: "Select Your Preferred Style",
    options: [
        { number: 1, label: "Full" },
        { number: 2, label: "Partial" },
        { number: 3, label: "180 Leave Out" },
        { number: 4, label: "360 Leave Out" },
    ],
}

const lengthMenu: MenuContent = {
    title: "Select Your Preferred Length",
    options: [
        { number: 1, label: "Shoulder Length" },
        { number: 2, label: "Bra Length" },
        { number: 3, label: "Waist Length" },
        { number: 4, label: "Butt Length" },
        { number: 5, label: "Buss Down" },
    ],
}

export function getMenuContent(path: number[]): MenuContent {
    if (path.length === 0) {
        return mainMenu
    }

    const mainOption = path[0]

    if (path.length === 1) {
        switch (mainOption) {
            case 3:
                return braidingStylesMenu
            case 4:
                return frontalStylesMenu
            case 5:
                return sewInStylesMenu
            default:
                return {
                    title: "Service not available",
                    options: [],
                }
        }
    }

    if (path.length === 2 && (mainOption === 3 || mainOption === 4 || mainOption === 5)) {
        return lengthMenu
    }


    return {
        title: "Invalid selection",
        options: [],
    }
}
