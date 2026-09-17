<template>
    <section class="panel" data-testid="ui-panel">
        <header class="panel__head">
            <slot name="title">
                <h2 class="panel__title">{{ title }}</h2>
            </slot>

            <slot name="actions" />
        </header>

        <main class="panel__content">
            <slot />
        </main>

        <footer v-if="$slots.footer" class="panel__foot">
            <slot name="footer" />
        </footer>
    </section>
</template>

<script setup lang="ts">
type Props = {
    title?: string
}

withDefaults(defineProps<Props>(), {
    title: 'Panel',
})

</script>

<style scoped>
.panel {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 6px;
    overflow: hidden;
}

.panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--line);
}

.panel__title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
}

.panel__content {
    padding: 16px;
}

.panel__foot {
    padding: 12px 16px;
    border-top: 1px solid var(--line);
    color: var(--text-dim);
    font-size: 13px;
}
</style>
