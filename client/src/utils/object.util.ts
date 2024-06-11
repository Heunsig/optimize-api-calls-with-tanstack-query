// remove undefined properties from object
export function removeUndefinedFromObject(obj: Record<string|number|symbol, unknown>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}