import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { getUsers } from '@/api/users-api'
import type { User } from '@/types/user'
import { minutesFromNow } from '@/utils/time'

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const isError = computed<boolean>(() => Boolean(error.value))

    const getUserById = computed<(id: number) => User | undefined>(
        () => (id: number) => users.value.find(user => user.id === id)
    )

    // const usersById = computed<Map<number, User>>(
    //     () => new Map(users.value.map(user => [user.id, user]))
    // )

    // const getUserByIdCached = computed<(id: number) => User | undefined>(
    //     () => (id: number) => usersById.value.get(id)
    // )

    const refreshSession = (id: number): void => {
        const user = getUserById.value(id)

        if (!user) {
            return
        }

        user.sessionExpiresAt = minutesFromNow(user.sessionMinutes)
    }

    async function fetchUsersOnce(): Promise<void> {
        if (users.value.length || isLoading.value) {
            return
        }

        await fetchUsers()
    }

    async function fetchUsers(): Promise<void> {
        isLoading.value = true
        error.value = null

        try {
            users.value = await getUsers()
        } catch (e: unknown) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }

    return {
        users,
        getUserById,
        // usersById,
        // getUserByIdCached,
        isLoading,
        isError,
        // fetchUsers,
        fetchUsersOnce,
        refreshSession,
    }
})
