import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView';
import KindergartenRegister from '../views/KindergartenRegister';
import Register from '../views/Register';
import Login from '../views/Login';
import Settings from '../views/Settings';
import Teachers from '../views/Teachers';
import Children from '../views/Children';
import Groups from '../views/Groups';
import Reports from '../views/Reports';
import Daily from '../views/Daily';
import Verification from '../views/Verification';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/kindergarten-register',
		name: 'kindergarten',
		component: KindergartenRegister
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/settings',
		name: 'settings',
		component: Settings
	},
	{
		path: '/teachers',
		name: 'teachers',
		component: Teachers
	},
	{
		path: '/children',
		name: 'children',
		component: Children
	},
	{
		path: '/groups',
		name: 'groups',
		component: Groups
	},
	{
		path: '/reports',
		name: 'reports',
		component: Reports
	},
	{
		path: '/daily',
		name: 'daily',
		component: Daily
	},
	{
		path: '/verification',
		name: 'verification',
		component: Verification
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

import store from '@/store/index';

router.beforeEach((to, from, next) => {
	const start = store.getters['getStart'];
	if (to.name !== 'login' && start === false) {
		next({name: 'login'});
	} else {
		next();
	}
});

export default router;
