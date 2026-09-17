import { createRouter, createWebHistory } from 'vue-router'

import UsersView from '@/views/UsersView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'users',
            component: UsersView,
        },
        {
            path: '/user/:id',
            name: 'user-details',
            component: () => import('@/views/UserDetailsView.vue'),
        },
        {
            path: '/lifecycle',
            name: 'lifecycle',
            component: () => import('@/views/LifecycleView.vue'),
        },
        {
            path: '/slots',
            name: 'slots',
            component: () => import('@/views/SlotsView.vue'),
        },
    ],
})

export default router
