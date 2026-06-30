export function generateOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
    const randomLetters = (length: number) => {
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('')
    }
  
    return `VLO-${randomLetters(6)}`
}