<template>
    <section data-testid="users-view">
        <h1>Users</h1>

        <p>
            <RouterLink to="/lifecycle">Lifecycle playground →</RouterLink>
            &nbsp;·&nbsp;
            <RouterLink to="/slots">Slots playground →</RouterLink>
        </p>

        <p v-if="isLoading" class="muted">Loading…</p>
        <p v-else-if="isError" class="muted">Failed to load the list.</p>

        <ul v-else class="list">
            <li v-for="user in users" :key="user.id">
                <RouterLink class="row" :to="{ name: 'user-details', params: { id: user.id } }">
                    <span class="row__name">{{ user.name }}</span>
                    <span class="row__city">{{ user.city }}</span>
                </RouterLink>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useUsersStore } from '@/stores/useUsersStore'

const usersStore = useUsersStore()

const { users, isLoading, isError } = storeToRefs(usersStore)

const { fetchUsersOnce } = usersStore

onMounted(fetchUsersOnce)
</script>

<style scoped>
.list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    transition: background 0.15s, border-color 0.15s;
}

.row:hover {
    background: var(--surface-hover);
    border-color: #39404f;
    text-decoration: none;
}

.row__name {
    font-weight: 500;
}

.row__city {
    color: var(--text-dim);
    font-size: 13px;
}
</style>
