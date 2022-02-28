export function produceData(length: number) {
    return Array.from({ length }).map((_, index) => String(index))
}