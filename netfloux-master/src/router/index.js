import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store"

const util = require('util');
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/List',
        name: 'List',

        component: () =>
            import( /* webpackChunkName: "about" */ '@/views/List.vue')
    },


    {
        path: '/Discover',
        name: 'Discover',

        component: () =>
            import( /* webpackChunkName: "about" */ '@/views/Discover.vue')
    },
    {
        path: '/Video',
        name: 'Play',

        component: () =>
            import( /* webpackChunkName: "about" */ '@/views/VideoPlayer.vue'),
            props: route => ({ query: route.query.q })
    },
    {
        path: '/Search',
        name: 'Search',

        component: () =>
            import( /* webpackChunkName: "about" */ '@/views/Search.vue')
    },
    {
        path: '/Login',
        name: 'Login',

        component: () =>
            import( /* webpackChunkName: "about" */ '@/views/Login.vue')
    },
    {
        path: '/Register',
        name: 'Register',

        component: () =>
            import( /* webpackChunkName: "about" */ '@/views/Register.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    let user = null;
    const authenticatedPages = ["Home", "Movies", "List", "NewAndPopular", "Series", "Search"];
    // local storage üzerinde user varmı?
    if (localStorage?.user) user = JSON.parse(localStorage?.user)
    // localstorage üzerinde user varsa store u güncelle
   
    // is isAuthenticated bilgisini store üzerinden almak
 

    next();



})
export default router