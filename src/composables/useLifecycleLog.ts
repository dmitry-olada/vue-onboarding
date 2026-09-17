import {
    onActivated,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onDeactivated,
    onMounted,
    onUnmounted,
    onUpdated
} from 'vue'

export type LogEntry = {
    time: string
    component: string
    hook: string
}

const useLifecycleLog = (component: string, log: LogEntry[]) => {
    const record = (hook: string): void => {
        log.push({
            time: new Date().toLocaleTimeString('en-GB'),
            component,
            hook,
        })
    }

    onBeforeMount(() => record('onBeforeMount'));
    onMounted(() => record('onMounted'));

    onBeforeUpdate(() => record('onBeforeUpdate'));
    onUpdated(() => record('onUpdated'));

    onBeforeUnmount(() => record('onBeforeUnmount'));
    onUnmounted(() => record('onUnmounted'));

    onActivated(() => record('onActivated'));
    onDeactivated(() => record('onDeactivated'));
}
export default useLifecycleLog
