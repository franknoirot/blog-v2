export function adjustDate(dateString: string): Date {
    const realDate = new Date(dateString)
    realDate.setDate(realDate.getDate() + 1)
    return realDate
}