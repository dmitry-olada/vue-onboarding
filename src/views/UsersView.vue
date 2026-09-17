<template>
    <section data-testid="users-view">
        <header class="masthead">
            <h1>Sessions</h1>
            <span v-if="users.length" class="masthead__count">{{ users.length }} active</span>
        </header>

        <ul v-if="isLoading" class="roster" aria-busy="true" data-testid="roster-skeleton">
            <li v-for="n in 7" :key="n">
                <span class="seat seat--ghost">
                    <span class="ghost ghost--name" :style="{ width: `${nameWidths[n - 1]}%` }" />
                    <span class="ghost ghost--city" />
                    <span class="ghost ghost--gauge" />
                </span>
            </li>
        </ul>

        <p v-else-if="isError" class="muted">Could not reach the session list. Reload to try again.</p>

        <ul v-else class="roster">
            <li v-for="user in users" :key="user.id">
                <RouterLink class="seat" :to="{ name: 'user-details', params: { id: user.id } }">
                    <span class="seat__name">{{ user.name }}</span>
                    <span class="seat__city muted">{{ user.city }}</span>
                    <SessionGauge :expires-at="user.sessionExpiresAt" :minutes="user.sessionMinutes" />
                </RouterLink>
            </li>
        </ul>

        <footer class="more">
            <h2 class="more__title">More demos</h2>

            <RouterLink class="more__row" to="/lifecycle">
                <span class="more__name">Lifecycle hooks</span>
                <span class="more__note muted">What runs when a component mounts, updates and dies</span>
            </RouterLink>

            <RouterLink class="more__row" to="/slots">
                <span class="more__name">Slot patterns</span>
                <span class="more__note muted">Default, scoped and named slots, side by side</span>
            </RouterLink>
        </footer>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import SessionGauge from '@/components/SessionGauge.vue'
import { useUsersStore } from '@/stores/useUsersStore'

const usersStore = useUsersStore()
const { users, isLoading, isError } = storeToRefs(usersStore)
const { fetchUsersOnce } = usersStore

// Uneven widths read as names, a row of identical bars reads as a loader.
const nameWidths = [58, 44, 66, 38, 52, 61, 47]

onMounted(fetchUsersOnce)
</script>

<style scoped>
.roster {
    list-style: none;
    margin: 0;
    padding: 0;
}

.roster li + li {
    border-top: 1px solid var(--line);
}

.seat {
    display: grid;
    grid-template-columns: 1fr auto 132px;
    align-items: baseline;
    gap: 16px;
    padding: 14px 8px;
    margin: 0 -8px;
    transition: background 0.15s;
}

.seat:hover {
    background: var(--surface);
}

.seat__name {
    font-weight: 500;
}

.seat__city {
    font-size: 13px;
}

.seat--ghost {
    align-items: center;
    cursor: default;
}

.ghost {
    display: flex;
    align-items: center;
    height: calc(15px * 1.6);
}

.ghost::before {
    content: "";
    display: block;
    width: 100%;
    height: 9px;
    background: var(--ghost);
    animation: pulse 1.6s ease-in-out infinite;
}

.ghost--city {
    width: 56px;
}

.ghost--gauge {
    width: 100%;
    justify-self: end;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
}

@media (prefers-reduced-motion: reduce) {
    .ghost::before {
        animation: none;
    }
}

.more {
    margin-top: 56px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
}

.more__title {
    margin: 0 0 4px;
    color: var(--text-dim);
    font-size: 13px;
    font-weight: 500;
}

.more__row {
    display: block;
    padding: 12px 8px;
    margin: 0 -8px;
    transition: background 0.15s;
}

.more__row:hover {
    background: var(--surface);
}

.more__row:hover .more__name {
    color: var(--amber);
}

.more__name {
    display: block;
    font-weight: 500;
}

.more__note {
    font-size: 13px;
}

@media (max-width: 480px) {
    .seat {
        grid-template-columns: 1fr 108px;
        row-gap: 2px;
    }

    .seat__city {
        grid-column: 1;
        grid-row: 2;
    }
}
</style>
