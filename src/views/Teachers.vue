<template>
	<template v-if="!addEditTeacher">
		<div class="row">
			<div class="col-12 col-md-6">
				<h4>Воспитатели</h4>
			</div>
			<div class="col-12 col-md-6 text-end">
				<button class="btn btn-success" @click="addEditTeacher = !addEditTeacher"><i
						class="fa fa-plus-circle me-2"></i> Добавить воспитателя
				</button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12 col-md-3 mb-4" v-for="teacher in teachersList" :key="teacher.id">
				<div class="card-teacher" @click="selectTeacher(teacher)">
					<div class="card-image">
						<img :src="teacher.photo" alt="">
					</div>
					<div class="card-body">
						<h5><i class="fa fa-user"></i><span>{{teacher.surname}} {{teacher.name}} {{teacher.patronymic}}</span></h5>
						<p><i class="fa fa-children"></i><span>{{groupName(teacher.groupId)}}</span></p>
						<p><i class="fa fa-phone"></i>{{teacher.phone}}</p>
						<div class="text-end"><small>{{teacher.addDate}}</small></div>
					</div>
				</div>
			</div>
		</div>
	</template>
	<AddEditTeacher v-if="addEditTeacher" :teacherEdit="teacherEdit" @close="closeEdit"/>
</template>

<script setup>
	import AddEditTeacher from '@/components/AddEditTeacher.vue';
	import {useStore} from 'vuex';
	import {ref, computed} from 'vue';

	const store = useStore();
	const teachersList = computed(() => store.getters.getTeachers);
	const groups = computed(() => store.getters.getGroups);
	const teacherEdit = ref(null);
	const addEditTeacher = ref(false);

	const groupName = (groupId) => {
		const result = groups.value.filter(g => g.id === groupId);
		if(result.length){
			return result[0].name;
		} else {
			return 'Не присвоено';
		}
	};

	const selectTeacher = (teacher) => {
		teacherEdit.value = teacher;
		addEditTeacher.value = true;
	};

	const closeEdit = () => {
		teacherEdit.value = null;
		addEditTeacher.value = false;
	};

</script>