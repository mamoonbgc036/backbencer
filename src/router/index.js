import Login from '../views/auth/Login.vue'
import Registration from '../views/auth/Registration.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import CreateProduct from '../views/dashboard/Products/CreateProduct.vue'
import ProductIndex from '../views/dashboard/Products/ProductIndex.vue'
import EditProduct from '../views/dashboard/Products/EditProduct.vue'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/user/product/edit/:id',
        component: EditProduct,
        name: 'EditProduct',
        meta: { requiresAuth: true }
    },
    {
        path: '/user/product/index',
        component: ProductIndex,
        name: 'ProductIndex',
        meta: { requiresAuth: true }
    },
    {
        path: '/user/product/create',
        component: CreateProduct,
        name: 'CreateProduct',
        meta: { requiresAuth: true }
    },
    {
        path: '/user/dashboard',
        component: ProductIndex,
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

//protecting dashboard route
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken') // Check if token exists

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/') // Redirect to login if authentication is required but user is not logged in
    } else {
        next() // Continue to the requested route
    }
})

export default router
