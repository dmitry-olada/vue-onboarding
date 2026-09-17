export type User = {
    id: number
    name: string
    city: string
    /** How long this user's session lasts, in minutes. Used when refreshing. */
    sessionMinutes: number
    /** ISO string: when the user's session expires */
    sessionExpiresAt: string
}
