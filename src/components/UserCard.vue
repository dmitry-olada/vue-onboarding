<template>
    <article class="card" data-testid="user-card">
        <p class="card__city muted">{{ city }}</p>
        <h1 class="card__name">{{ name }}</h1>

        <div class="card__readout">
            <span class="card__clock clock" :class="{ 'clock--low': isLow }">{{ countdown }}</span>
            <span class="card__unit muted">left in this session</span>
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

/** Under a minute. Holds while the countdown stays below an hour, which it does here. */
const isLow = computed<boolean>(() => props.countdown.startsWith('00:'))
</script>

<style scoped>
.card__city {
    margin: 0;
    font-size: 13px;
}

.card__name {
    margin: 0 0 28px;
}

.card__readout {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 20px 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    margin-bottom: 24px;
}

.card__clock {
    font-size: 44px;
    font-weight: 500;
    line-height: 1;
}

.card__unit {
    font-size: 14px;
}
</style>
