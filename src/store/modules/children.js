const LSChildren = JSON.parse(localStorage.getItem('children'));

export default {
	state: {
		children: LSChildren ? LSChildren : []
	},
	getters: {
		getChildren(state) {
			return state.children;
		}
	},
	mutations: {
		setChild(state, child) {
			state.children.push(child);
			localStorage.setItem('children', JSON.stringify(state.children));
		},
		setChildren(state, children) {
			state.children = children;
			localStorage.setItem('children', JSON.stringify(state.children));
		},
		moveChildrenMutation(state, children){
			children.forEach(item => {
				const index = state.children.findIndex(c => c.id === item.id);
				state.children.splice(index, 1, item);
			});
			localStorage.setItem('children', JSON.stringify(state.children));
		}
	},
	actions: {
		saveChild({commit}, child) {
			commit('setChild', child)
		},
		updateChild({commit, state}, child) {
			const children = state.children;
			const index = children.findIndex(c => c.id === child.id);
			if(index !== -1){
				children.splice(index, 1, child);
				commit('setChildren', children)
			}
		},
		removeChild({commit, state}, id) {
			const children = state.children;
			const index = children.findIndex(c => c.id === id);
			if(index !== -1){
				children.splice(index, 1);
				commit('setChildren', children)
			}
		},
		moveChildren({commit}, children){
			commit('moveChildrenMutation', children)
		}
	},
}