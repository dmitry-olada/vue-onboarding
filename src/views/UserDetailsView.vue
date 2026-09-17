<template>
    <section data-testid="user-details-view">
        <RouterLink class="back-link" to="/">← Sessions</RouterLink>

        <!-- Order matters: the first matching branch wins. -->
        <p v-if="isLoading" class="muted">Loading…</p>

        <p v-else-if="isError" class="muted">Failed to load the user.</p>

        <p v-else-if="!currentUser" class="muted">User not found.</p>

        <template v-else>
            <div v-if="isFinished" class="expired" data-testid="session-expired">
                <p class="expired__city muted">{{ currentUser.city }}</p>
                <h1 class="expired__name">{{ currentUser.name }}</h1>

                <p class="expired__note">This session ran out.</p>

                <button type="button" @click="onRefresh">Start new session</button>
            </div>

            <UserCard
                v-else
                :name="currentUser.name"
                :city="currentUser.city"
                :countdown="formatted"
                @refresh="onRefresh"
            />

            <label class="note">
                <span class="note__label">Private note</span>
                <input v-model="note" placeholder="only you see this">
            </label>

            <p v-if="note" class="note__echo">{{ note }}</p>
        </template>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'

import UserCard from '@/components/UserCard.vue'
import { useCountdown } from '@/composables/useCountdown'
import { useUsersStore } from '@/stores/useUsersStore'

const route = useRoute()
const usersStore = useUsersStore()

const { getUserById, fetchUsersOnce, refreshSession } = usersStore
const { isLoading, isError } = storeToRefs(usersStore)

const { formatted, isFinished, start } = useCountdown()

const note = ref<string>('')

const currentUser = computed(() => {
    const userId = route.params.id

    if (userId) {
        return getUserById(+userId)
    }

    return null
})

const onRefresh = (): void => {
    if (!currentUser.value) {
        return
    }

    refreshSession(currentUser.value.id)
}

onMounted(fetchUsersOnce)

// Watching the field, not the user object: refreshSession mutates the field
// in place, so the object reference never changes and a watch on it stays quiet.
watch(() => currentUser.value?.sessionExpiresAt, (expiresAt) => {
    if (expiresAt) {
        start(expiresAt)
    }
}, { immediate: true })
</script>

<style scoped>
.expired__city {
    margin: 0;
    font-size: 13px;
}

.expired__name {
    margin: 0 0 28px;
}

.expired__note {
    padding: 20px 0;
    margin: 0 0 24px;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    color: var(--brick);
}

.note {
    display: block;
    margin-top: 32px;
}

.note__label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-dim);
    font-size: 13px;
}

.note__echo {
    margin: 12px 0 0;
    color: var(--text-dim);
    font-size: 14px;
}
</style>
