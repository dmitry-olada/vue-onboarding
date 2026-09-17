<template>
    <article class="card" data-testid="user-card">
        <header class="card__head">
            <h2 class="card__name">{{ name }}</h2>
            <span class="card__city">{{ city }}</span>
        </header>

        <div class="card__timer">
            <span class="card__label">Session expires in</span>
            <span class="card__value" :class="{ 'card__value--low': isLow }">
                {{ countdown }}
            </span>
        </div>

        <button type="button" @click="emit('refresh')">
            Refresh session
        </button>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
    name: string
    city: string
    countdown: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    refresh: []
}>()

const isLow = computed<boolean>(() => props.countdown.startsWith('00:'))
</script>

<style scoped>
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
}

.card__head {
    margin-bottom: 18px;
}

.card__name {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}

.card__city {
    color: var(--text-dim);
    font-size: 14px;
}

.card__timer {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 12px 14px;
    margin-bottom: 18px;
    background: var(--bg);
    border-radius: 8px;
}

.card__label {
    color: var(--text-dim);
    font-size: 13px;
}

.card__value {
    font-variant-numeric: tabular-nums;
    font-size: 20px;
    font-weight: 600;
}

.card__value--low {
    color: var(--danger);
}
</style>
