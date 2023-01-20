const LSGroups = JSON.parse(localStorage.getItem('groups'));

export default {
	state: {
		groups: LSGroups ? LSGroups : []
	},
	getters: {
		getGroups(state) {
			return state.groups;
		}
	},
	mutations: {
		setGroup(state, group) {
			state.groups.push(group);
			localStorage.setItem('groups', JSON.stringify(state.groups));
		},
		setGroups(state, newGroupList) {
			state.groups = newGroupList;
			localStorage.setItem('groups', JSON.stringify(state.groups));
		}
	},
	actions: {
		saveGroup({commit}, group){
			commit('setGroup', group);
		},
		updateGroup({commit, state}, group) {
			const groups = state.groups;
			const index = groups.findIndex(g => g.id === group.id);
			groups.splice(index, 1, group);
			commit('setGroups', groups)
		},
		removeGroup({commit, state}, id) {
			const groups = state.groups;
			const index = groups.findIndex(g => g.id === id);
			groups.splice(index, 1);
			commit('setGroups', groups)
		}
	},
}