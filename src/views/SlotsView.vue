<template>
    <section data-testid="slots-view">
        <RouterLink class="back-link" to="/">← Back to users</RouterLink>

        <h1>Slots playground</h1>

        <article class="demo">
            <h2 class="demo__label">1 · Default slot only</h2>
            <p class="demo__hint">The title falls back to the prop, no footer is rendered.</p>

            <UiPanel>
                <div>Main Content</div>
            </UiPanel>
        </article>

        <article class="demo">
            <h2 class="demo__label">2 · Every named slot filled</h2>
            <p class="demo__hint">Title, actions, body and footer all come from the parent.</p>

            <UiPanel>
                <template #title>
                    Title from Parent
                </template>

                <template #actions>
                    <button type="button">Edit</button>
                </template>

                <p>This panel fills every slot at once.</p>

                <template #footer>
                    Updated just now
                </template>
            </UiPanel>
        </article>

        <article class="demo">
            <h2 class="demo__label">3 · Scoped slot inside a panel</h2>
            <p class="demo__hint">UiList owns the loop, this page owns how a row looks.</p>

            <UiPanel title="Users">
                <UiList :items="users" :key-of="u => Number(u.id)">
                    <template #default="{ item }">
                        <RouterLink :to="{ name: 'user-details', params: { id: item.id } }">
                            <strong>{{ item.name }}</strong>
                        </RouterLink>
                        — {{ item.city }}
                    </template>

                    <template #empty>
                        No users loaded.
                    </template>
                </UiList>
            </UiPanel>
        </article>

    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import UiList from '@/components/UiList.vue'
import UiPanel from '@/components/UiPanel.vue'
import { useUsersStore } from '@/stores/useUsersStore'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const { fetchUsersOnce } = usersStore

onMounted(fetchUsersOnce)
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
</style>
