<template>
    <div data-testid="ui-list">
        <ul v-if="items.length" class="list">
            <li v-for="item in items" :key="keyOf(item)" class="list__row">
                <slot :item="item" />
            </li>
        </ul>

        <p v-else class="list__empty">
            <slot name="empty">Nothing here yet.</slot>
        </p>
    </div>
</template>

<script setup lang="ts" generic="T">

type Props = {
    items: T[]
    keyOf: (item: T) => string | number
}

defineProps<Props>()

defineSlots<{
    default: (props: { item: T }) => unknown
    empty: () => unknown
}>()
</script>

<style scoped>
.list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
}

.list__empty {
    margin: 0;
    color: var(--text-dim);
}

.list__row {
    padding: 10px 12px;
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 8px;
}
</style>
