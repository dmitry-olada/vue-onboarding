<template>
    <div class="tab" data-testid="tab-details">
        <p class="muted">This tab keeps local state. Type something, switch away, come back.</p>

        <label class="tab__field">
            <span>Draft</span>
            <input v-model="draft" placeholder="local to this component">
        </label>

        <p v-if="draft">Current draft: {{ draft }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import useLifecycleLog, { type LogEntry } from '@/composables/useLifecycleLog'

type Props = {
    log: LogEntry[]
}

const props = defineProps<Props>()

useLifecycleLog('TabDetails', props.log)

const draft = ref<string>('')
</script>

<style scoped>
.tab {
    padding: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 6px;
}

.tab__field {
    display: block;
    margin: 12px 0;
}

.tab__field span {
    display: block;
    margin-bottom: 6px;
    color: var(--text-dim);
    font-size: 13px;
}
</style>
