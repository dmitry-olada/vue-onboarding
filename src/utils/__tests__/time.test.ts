import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { formatDuration, minutesFromNow, msUntil } from '@/utils/time'

describe('time utils', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('minutesFromNow shifts the clock forward', () => {
        expect(minutesFromNow(5)).toBe('2026-01-01T00:05:00.000Z')
    })

    it('minutesFromNow accepts fractions', () => {
        expect(minutesFromNow(0.5)).toBe('2026-01-01T00:00:30.000Z')
    })

    it('msUntil returns the remaining milliseconds', () => {
        expect(msUntil('2026-01-01T00:01:00.000Z')).toBe(60_000)
    })

    it('msUntil clamps past timestamps to zero', () => {
        expect(msUntil('2025-12-31T23:00:00.000Z')).toBe(0)
    })

    it('formatDuration pads both parts', () => {
        expect(formatDuration(9_000)).toBe('00:09')
        expect(formatDuration(185_000)).toBe('03:05')
        expect(formatDuration(0)).toBe('00:00')
    })

    it('formatDuration drops sub-second remainders', () => {
        expect(formatDuration(125_400)).toBe('02:05')
    })
})
