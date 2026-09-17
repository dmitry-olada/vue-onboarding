const MS_IN_MINUTE = 60_000

/** ISO timestamp for a moment `minutes` from now. Accepts fractions. */
export const minutesFromNow = (minutes: number): string =>
    new Date(Date.now() + minutes * MS_IN_MINUTE).toISOString()

/** Milliseconds left until an ISO timestamp, never negative. */
export const msUntil = (isoTime: string): number =>
    Math.max(new Date(isoTime).getTime() - Date.now(), 0)

/** Milliseconds as "mm:ss", both parts zero-padded. */
export const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')

    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
}

/** ISO timestamp as a local clock time, e.g. "16:45". */
export const formatClock = (isoTime: string): string =>
    new Date(isoTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
