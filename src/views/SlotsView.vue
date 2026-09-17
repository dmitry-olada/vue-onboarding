<template>
    <section data-testid="slots-view">
        <RouterLink class="back-link" to="/">← Back to users</RouterLink>

        <h1>Slots playground</h1>

        <article class="demo">
            <h2 class="demo__label">1 · Default slot</h2>
            <p class="demo__hint">One hole in the child, filled by the parent.</p>

            <UiPanel title="About">
                <p>Pick a user from the list below, then refresh their session.</p>
            </UiPanel>
        </article>

        <article class="demo">
            <h2 class="demo__label">2 · Scoped slot</h2>
            <p class="demo__hint">Click a row to select.</p>

            <UiPanel title="Users">
                <UiList :items="users" :key-of="user => user.id">
                    <template #default="{ item }">
                        <div
                            :class="{ 'row--on': item.id === selectedId }"
                            class="row"
                            @click="selectedId = item.id"
                        >
                            <span class="row__mark">{{ item.id === selectedId ? '●' : '○' }}</span>

                            <RouterLink
                                :to="{ name: 'user-details', params: { id: item.id } }"
                                @click.stop
                            >
                                <strong>{{ item.name }}</strong>
                            </RouterLink>

                            <span class="muted"> — {{ item.city }}</span>
                        </div>
                    </template>

                    <template #empty>
                        No users loaded.
                    </template>
                </UiList>
            </UiPanel>
        </article>

        <article class="demo">
            <h2 class="demo__label">3 · Named slots</h2>
            <p class="demo__hint">Refresh session for selected user.</p>

            <UiPanel>
                <template #title>
                    <RouterLink
                        v-if="selectedUser"
                        :to="{ name: 'user-details', params: { id: selectedUser.id } }"
                    >
                        {{ selectedUser.name }}
                    </RouterLink>
                    <span v-else class="muted">No one selected</span>
                </template>

                <template v-if="selectedUser" #actions>
                    <button type="button" @click="refreshSession(selectedUser.id)">
                        Refresh session
                    </button>
                </template>

                <p v-if="!selectedUser" class="muted">Pick a user in the list above.</p>

                <template v-else>
                    <p class="panel-line">
                        <span class="muted">City</span>
                        <span>{{ selectedUser.city }}</span>
                    </p>
                    <p class="panel-line">
                        <span class="muted">Session ends in</span>
                        <span class="mono">{{ formatted }}</span>
                    </p>
                </template>

                <template v-if="selectedUser" #footer>
                    Expires at {{ formatClock(selectedUser.sessionExpiresAt) }}
                </template>
            </UiPanel>
        </article>

    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import UiList from '@/components/UiList.vue'
import UiPanel from '@/components/UiPanel.vue'
import { useCountdown } from '@/composables/useCountdown'
import { useUsersStore } from '@/stores/useUsersStore'
import { formatClock } from '@/utils/time'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const { fetchUsersOnce, refreshSession } = usersStore

const { formatted, start } = useCountdown()

const selectedId = ref<number | null>(null)

const selectedUser = computed(() => users.value.find(user => user.id === selectedId.value))

onMounted(fetchUsersOnce)

// Same trick as the details page: watch the field, not the object, so a refresh
// that only mutates sessionExpiresAt still restarts the countdown.
watch(() => selectedUser.value?.sessionExpiresAt, (expiresAt) => {
    if (expiresAt) {
        start(expiresAt)
    }
}, { immediate: true })
</script>

<style scoped>
.demo {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
}

.demo__label {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-dim);
}

.demo__hint {
    margin: 0 0 14px;
    font-size: 13px;
    color: var(--text-dim);
}

.panel-line {
    display: flex;
    justify-content: space-between;
    margin: 0 0 6px;
}

.mono {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
}

.row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin: -10px -12px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
}

.row:hover {
    background: var(--surface-hover);
}

.row__mark {
    color: var(--text-dim);
}

.row--on .row__mark {
    color: var(--accent);
}
</style>
