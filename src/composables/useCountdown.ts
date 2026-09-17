import { computed, onUnmounted, ref } from 'vue'

import { formatDuration, msUntil } from '@/utils/time'

export const useCountdown = () => {
    let intervalId: ReturnType<typeof setInterval> | null = null

    const msLeft = ref<number>(0)
    const isFinished = ref<boolean>(false)

    const formatted = computed<string>(() => formatDuration(msLeft.value))

    const start = (endTime: string): void => {
        stop()
        isFinished.value = false

        const tick = (): void => {
            msLeft.value = msUntil(endTime)

            if (msLeft.value === 0) {
                isFinished.value = true
                stop()
            }
        }

        tick()
        intervalId = setInterval(tick, 1000)
    }

    const stop = (): void => {
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    onUnmounted(stop)

    return {
        msLeft,
        formatted,
        isFinished,
        start,
        stop,
    }
}
