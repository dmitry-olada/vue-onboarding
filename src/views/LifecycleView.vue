<template>
    <section data-testid="lifecycle-view">
        <RouterLink class="back-link" to="/">← Sessions</RouterLink>

        <h1>Lifecycle hooks</h1>

        <div class="tabs">
            <button
                :class="{ 'tabs__btn--active': tab === 'details' }"
                class="tabs__btn"
                type="button"
                @click="tab = 'details'"
            >
                Details
            </button>
            <button
                :class="{ 'tabs__btn--active': tab === 'activity' }"
                class="tabs__btn"
                type="button"
                @click="tab = 'activity'"
            >
                Activity
            </button>
        </div>

        <KeepAlive>
          <component :is="tab === 'details' ? TabDetails : TabActivity" :log="log" />
        </KeepAlive>

        <div class="log">
            <div class="log__head">
                <h2 class="log__title">Lifecycle log</h2>
                <button type="button" @click="log.length = 0">Clear</button>
            </div>

            <p v-if="!log.length" class="muted">Switch tabs to see hooks fire.</p>

            <ol v-else class="log__list">
                <li v-for="(entry, i) in log" :key="i">
                    <span class="log__time">{{ entry.time }}</span>
                    <span class="log__component">{{ entry.component }}</span>
                    <span class="log__hook">{{ entry.hook }}</span>
                </li>
            </ol>
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import TabActivity from '@/components/TabActivity.vue'
import TabDetails from '@/components/TabDetails.vue'
import type { LogEntry } from '@/composables/useLifecycleLog'

const tab = ref<'details' | 'activity'>('details')

const log = reactive<LogEntry[]>([])
</script>

<style scoped>
.tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.tabs__btn--active {
    background: var(--amber);
    border-color: var(--amber);
    color: #fff;
}

.log {
    margin-top: 24px;
}

.log__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.log__title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
}

.log__list {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;
    line-height: 1.8;
}

.log__time {
    color: var(--text-dim);
    font-variant-numeric: tabular-nums;
    margin-right: 8px;
}

.log__component {
    font-weight: 600;
    margin-right: 8px;
}

.log__hook {
    color: var(--amber);
}
</style>
