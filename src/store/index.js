import {createStore} from 'vuex'
import Teachers from './modules/teachers'
import Groups from './modules/groups'
import Children from './modules/children'

const LSStart = JSON.parse(localStorage.getItem('start'));
const LSRegister = JSON.parse(localStorage.getItem('register'));
const LSRegKinder = JSON.parse(localStorage.getItem('regKinder'));
export default createStore({
	state: {
		start: LSStart ? LSStart : false,
		register: LSRegister ? LSRegister : false,
		regKinder: LSRegKinder ? LSRegKinder : false
	},
	getters: {
		getStart(state) {
			return state.start;
		},
		getRegKinder(state) {
			return state.regKinder;
		}
	},
	mutations: {
		setStart(state, start) {
			state.start = start;
			localStorage.setItem('start', JSON.stringify(state.start));
		},
		setRegKinder(state) {
			state.regKinder = true;
			localStorage.setItem('regKinder', JSON.stringify(state.regKinder));
		}
	},
	actions: {},
	modules: {
		Teachers,
		Groups,
		Children
	}
})
