<template>
	<template v-if="!addEditGroup">
		<div class="row">
			<div class="col-12 col-md-6">
				<h4>Группы</h4>
			</div>
			<div class="col-12 col-md-6 text-end">
				<button class="btn btn-success" @click="addEditGroup = !addEditGroup"><i class="fa fa-plus-circle me-2"></i> Добавить группу</button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12 col-md-4 mb-3" v-for="group in groups" :key="group.id">
				<div class="card-groups" @click="selectGroup(group)">
					<h5>{{group.name}}</h5>
					<p class="mb-0 mt-2"><i class="fa fa-user"></i> {{teacherFullName(group.teacherId)}}</p>
					<p class="mb-0 mt-2"><i class="fa-solid fa-children"></i> {{childrenCount(group.id)}}</p>
				</div>
			</div>
		</div>
	</template>
	<AddEditGroup v-if="addEditGroup" :selectedGroup="selectedGroup" @close="closeEdit"/>
</template>

<script setup>
	import AddEditGroup from '@/components/AddEditGroup';
	import {ref, computed} from 'vue';
	import {useStore} from 'vuex';
	const store = useStore();
	const addEditGroup = ref(false);
	const selectedGroup = ref(null);

	const groups = computed(() => store.getters.getGroups);
	const children = computed(() => store.getters.getChildren);
	const teachers = computed(() => store.getters.getTeachers);
	const teacherFullName = (teacherId) => {
		const result = teachers.value.filter(t => t.id === teacherId);
		if(result.length) {
			return `${result[0].surname} ${result[0].name} ${result[0].patronymic}`;
		} else {
			return 'Нет воспитателя';
		}
	};
	const selectGroup = (group) => {
		selectedGroup.value = group;
		addEditGroup.value = true;
	};
	const childrenCount = (id) => {
		const result = children.value.filter(c => c.groupId === id);
		return result.length;
	};
	const closeEdit = () => {
		selectedGroup.value = null;
		addEditGroup.value = false;
	}
</script>