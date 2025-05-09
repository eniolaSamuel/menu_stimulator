export function parseCode(code: string): number[] {
    if (!code.startsWith("*465") || !code.endsWith("#")) {
        return []
    }


    return code
        .slice(4, code.length - 1)
        .split("*")
        .filter((item) => item !== "")
        .map(Number)
}

export function generateCode(path: number[]): string {
    if (path.length === 0) {
        return "*465#"
    }

    return `*465*${path.join("*")}#`
}
