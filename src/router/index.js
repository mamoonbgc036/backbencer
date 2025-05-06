import Login from '../views/auth/Login.vue';
import Registration from '../views/auth/Registration.vue';
import TaskIndex from '../views/dashboard/TaskIndex.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/user/dashboard',
        component: TaskIndex,
        name: 'Dashboard',
        meta: { requiresAuth: true }
    },
    {
        path: '/auth/register',
        component: Registration,
        name: 'Registration'
    },
    {
        path: '/',
        component: Login,
        name: 'Login'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken')

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
