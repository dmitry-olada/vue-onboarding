import type { User } from '@/types/user'
import { minutesFromNow } from '@/utils/time'

/** id, name, city, session length in minutes. */
const rows: [number, string, string, number][] = [
    [1, 'Ada Lovelace', 'London', 3],
    [2, 'Grace Hopper', 'New York', 5],
    [3, 'Alan Turing', 'Cambridge', 0.5],
    [4, 'Barbara Liskov', 'Boston', 12],
    [5, 'Edsger Dijkstra', 'Rotterdam', 30],
    [6, 'Margaret Hamilton', 'Rome', 8],
    [7, 'Linus Torvalds', 'Helsinki', 1],
]

/**
 * Seed data. Session lengths are spread from half a minute to half an hour,
 * so the countdown, its low-time state and the expired branch are all
 * reachable without waiting. The length is stored, not just the deadline,
 * so refreshing a session can restore its own duration.
 */
const seed = (): User[] => rows.map(([id, name, city, sessionMinutes]) => ({
    id,
    name,
    city,
    sessionMinutes,
    sessionExpiresAt: minutesFromNow(sessionMinutes),
}))

export const getUsers = (): Promise<User[]> =>
    new Promise(resolve => {
        setTimeout(() => resolve(seed()), 600)
    })
