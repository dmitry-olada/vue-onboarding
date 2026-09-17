<template>
    <div class="tab" data-testid="tab-activity">
        <p class="muted">Count: {{ counter }}</p>

      <button type="button" @click="increment">Increment</button>
    </div>
</template>

<script setup lang="ts">
import useLifecycleLog, { type LogEntry } from '@/composables/useLifecycleLog'

import { ref } from "vue";

type Props = {
    log: LogEntry[]
}

const props = defineProps<Props>()

useLifecycleLog('TabActivity', props.log)

const counter = ref<number>(0)

const increment = () => { counter.value++ }

</script>

<style scoped>
.tab {
    padding: 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
}
</style>
