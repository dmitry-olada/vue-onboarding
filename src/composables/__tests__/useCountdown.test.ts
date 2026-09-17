import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCountdown } from '@/composables/useCountdown'

/**
 * Time is faked so the test never actually waits a second.
 * vi.advanceTimersByTime() moves the clock and fires due intervals.
 */
describe('useCountdown', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    const inSeconds = (s: number) => new Date(Date.now() + s * 1000).toISOString()

    it('formats the remaining time as mm:ss', () => {
        const { formatted, start } = useCountdown()

        start(inSeconds(185))

        expect(formatted.value).toBe('03:05')
    })

    it('pads both parts with a leading zero', () => {
        const { formatted, start } = useCountdown()

        start(inSeconds(9))

        expect(formatted.value).toBe('00:09')
    })

    it('counts down as time passes', () => {
        const { formatted, start } = useCountdown()

        start(inSeconds(65))
        expect(formatted.value).toBe('01:05')

        vi.advanceTimersByTime(10_000)
        expect(formatted.value).toBe('00:55')
    })

    it('stops at zero and flags itself finished', () => {
        const { formatted, isFinished, start } = useCountdown()

        start(inSeconds(2))
        expect(isFinished.value).toBe(false)

        vi.advanceTimersByTime(3_000)

        expect(formatted.value).toBe('00:00')
        expect(isFinished.value).toBe(true)
    })

    it('never goes negative once the deadline has passed', () => {
        const { formatted, start } = useCountdown()

        start(new Date(Date.now() - 60_000).toISOString())

        expect(formatted.value).toBe('00:00')
    })

    it('restarts cleanly when start is called again', () => {
        const { formatted, start } = useCountdown()

        start(inSeconds(10))
        vi.advanceTimersByTime(5_000)
        expect(formatted.value).toBe('00:05')

        start(inSeconds(120))
        expect(formatted.value).toBe('02:00')
    })

    it('keeps two callers independent', () => {
        const a = useCountdown()
        const b = useCountdown()

        a.start(inSeconds(60))
        b.start(inSeconds(600))

        expect(a.formatted.value).toBe('01:00')
        expect(b.formatted.value).toBe('10:00')
    })
})
