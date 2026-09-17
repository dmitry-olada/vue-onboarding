<template>
    <span class="gauge" data-testid="session-gauge">
        <span class="sr-only">Time left</span>
        <span class="gauge__clock clock" :class="{ 'clock--low': isLow }">{{ formatted }}</span>

        <span class="gauge__track" aria-hidden="true">
            <span class="gauge__fill" :class="{ 'gauge__fill--low': isLow }" :style="{ width: `${percent}%` }" />
        </span>
    </span>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import { useCountdown } from '@/composables/useCountdown'

type Props = {
    expiresAt: string
    minutes: number
}

const props = defineProps<Props>()

const { msLeft, formatted, start } = useCountdown()

const percent = computed<number>(() => {
    const total = props.minutes * 60_000

    return total ? Math.min(100, (msLeft.value / total) * 100) : 0
})

const isLow = computed<boolean>(() => percent.value < 20)

watch(() => props.expiresAt, (value) => {
    if (value) {
        start(value)
    }
}, { immediate: true })
</script>

<style scoped>
.gauge {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}

.gauge__clock {
    font-size: 14px;
}

.gauge__track {
    width: 56px;
    height: 3px;
    background: var(--line);
    overflow: hidden;
}

.gauge__fill {
    display: block;
    height: 100%;
    background: var(--amber);
    transition: width 1s linear;
}

.gauge__fill--low {
    background: var(--brick);
}
</style>
