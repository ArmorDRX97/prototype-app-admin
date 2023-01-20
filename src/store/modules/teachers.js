const LSTeachers = JSON.parse(localStorage.getItem('teachers'));

export default {
	state: {
		teachers: LSTeachers ? LSTeachers : []
	},
	getters: {
		getTeachers(state) {
			return state.teachers;
		}
	},
	mutations: {
		setTeachers(state, teacher) {
			state.teachers.push(teacher);
			localStorage.setItem('teachers', JSON.stringify(state.teachers));
		},
		setTeacher(state, newTeachersList) {
			state.teachers = newTeachersList;
			localStorage.setItem('teachers', JSON.stringify(state.teachers));
		},
		setGroupTeacher(state, teachers) {
			state.teachers = teachers;
			localStorage.setItem('teachers', JSON.stringify(state.teachers));
		}
	},
	actions: {
		saveTeachers({commit}, teacher) {
			commit('setTeachers', teacher)
		},
		updateTeacher({commit, state}, teacher) {
			const teachers = state.teachers;
			const index = teachers.findIndex(t => t.id === teacher.id);
			teachers.splice(index, 1, teacher);
			commit('setTeacher', teachers);
		},
		removeTeacher({commit, state}, id) {
			const teachers = state.teachers;
			const index = teachers.findIndex(t => t.id === id);
			teachers.splice(index, 1);
			commit('setTeacher', teachers)
		},
		addGroupInTeacher({state, commit}, data){
			const teachers = state.teachers;
			const index = teachers.findIndex(t => t.id === data.teacherId);
			const teacher = teachers.filter(t => t.id === data.teacherId);
			teacher[0].groupId = data.groupId;
			teachers.splice(index, 1, teacher[0]);
			commit('setGroupTeacher', teachers)
		}
	},
}