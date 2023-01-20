<template>
	<div class="row">
		<div class="col-12 col-md-6">
			<h4>Создание группы</h4>
		</div>
		<div class="col-12 col-md-6 text-end">
			<button class="btn btn-secondary" @click="close">Назад</button>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-12 col-md-4">
			<div class="form-group">
				<label class="form-label"><b>*</b>Название группы</label>
				<input type="text" class="form-control" v-model="group.name" :disabled="!childDisabled">
			</div>
		</div>
		<div class="col-12 col-md-4">
			<div class="form-group">
				<label class="form-label"><b>*</b>Отвественный воспитатель</label>
				<select class="form-control" v-model="selectedTeacher" :disabled="!childDisabled">
					<option disabled value="null">Выберите воспитателя</option>
					<option v-for="tec in teachers" :value="tec" :key="tec">{{tec.surname}} {{tec.name}}
						{{tec.patronymic}}
					</option>
				</select>
			</div>
		</div>
		<div class="col-12 col-md-4">
			<div class="form-group">
				<label class="form-label">Рабочее время (время блокировки)</label>
				<div class="d-flex">
					<input type="time" v-model="group.timeFrom" class="form-control w-50 me-4"
					       :disabled="!childDisabled">
					<input type="time" v-model="group.timeTo" class="form-control w-50" :disabled="!childDisabled">
				</div>
			</div>
		</div>
	</div>
	<div class="mt-3">
		<button class="btn btn-success" @click="saveGroup" :disabled="!childDisabled">Сохранить</button>
		<b class="text-success ms-4" v-if="!childDisabled">Группа создана. Теперь можно сразу добавить детей</b>
	</div>
	<hr>
	<h5>Дети в группе</h5>
	<div class="table-container" :class="{'disabled': childDisabled, 'if-edit': childDisabledEdit}">
		<table class="table table-bordered table-responsive">
			<thead>
			<tr>
				<th>№</th>
				<th>Фамилия</th>
				<th>Имя</th>
				<th>Отчество</th>
				<th>Возраст</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			<template v-if="childrenList.length">
				<tr v-for="(child, index) in childrenList" :key="index">
					<td>{{index + 1}}</td>
					<template v-if="!child.edit">
						<td>{{child.surname}}</td>
						<td>{{child.name}}</td>
						<td>{{child.patronymic}}</td>
						<td>{{child.age}}</td>
					</template>
					<template v-else>
						<td><input type="text" class="form-control form-control-sm" v-model="child.surname"></td>
						<td><input type="text" class="form-control form-control-sm" v-model="child.name"></td>
						<td><input type="text" class="form-control form-control-sm" v-model="child.patronymic"></td>
						<td><input type="number" class="form-control form-control-sm" v-model="child.age"></td>
					</template>

					<td>
						<button class="btn btn-sm btn-primary me-2" @click="child.edit = true" v-if="!child.edit"><i
								class="fa fa-pencil"></i></button>
						<button
								class="btn btn-sm btn-success"
								@click="[child.edit = false, updateChild(child)]"
								v-if="child.edit"
								:disabled="child.surname === '' || child.name === '' || child.patronymic === '' || child.age === ''"
						>
							<i class="fa-solid fa-floppy-disk"></i>
						</button>
						<button class="btn btn-sm btn-danger" @click="removeChild(child.id)" v-if="!child.edit"><i
								class="fa fa-trash"></i></button>
					</td>
				</tr>
			</template>
			<tr>
				<td>{{childrenList.length + 1}}</td>
				<td>
					<input type="text" class="form-control form-control-sm" placeholder="Введите фамилию"
					       v-model="childForm.surname">
				</td>
				<td>
					<input type="text" class="form-control form-control-sm" placeholder="Введите имя"
					       v-model="childForm.name">
				</td>
				<td>
					<input type="text" class="form-control form-control-sm" placeholder="Введите отчество"
					       v-model="childForm.patronymic">
				</td>
				<td>
					<input type="number" class="form-control form-control-sm" placeholder="Введите возраст"
					       v-model="childForm.age">
				</td>
				<td><i class="fa-solid fa-child text-success info-icon"></i></td>
			</tr>
			</tbody>
			<tfoot>
			<tr>
				<th colspan="6">
					<button class="btn btn-sm btn-success" @click="addChild">добавить ребенка</button>
					<span v-if="childAddDisabled" class="text-danger ms-3">Заполните все поля</span>
				</th>
			</tr>
			</tfoot>
		</table>
	</div>
	<button class="btn btn-danger" v-if="selectedGroup" @click="openModal">Удалить группу</button>

	<div class="modal fade" tabindex="-1" ref="modalRef">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<div class="modal-title text-danger">Удаление группы</div>
					<button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					<div class="form-group" v-if="childrenList.length">
						<label class="form-label">В какую группу перенести всех детей?</label>
						<select class="form-control" v-model="moveGroupId">
							<option value="null">Без группы</option>
							<option v-for="gr in groupsList" :value="gr.id" :key="gr.id">
								{{gr.name}}
							</option>
						</select>
					</div>
					<span v-else>Вы уверены, что хотите удалить группу?</span>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
					<button type="button" class="btn btn-danger" @click="removeGroup">Удалить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {useStore} from 'vuex';
	import {defineEmits, computed, ref, reactive, defineProps, toRefs, onMounted} from 'vue';
	import {useNotification} from "@kyvg/vue3-notification";
	import {Modal} from "bootstrap";

	const {notify} = useNotification();
	const store = useStore();
	const emit = defineEmits(['close']);
	const close = () => {
		emit('close')
	};
	const props = defineProps({
		selectedGroup: Object
	})

	const modalRef = ref(null);
	const moveGroupId = ref(null);
	let modal = null;
	onMounted(() => {
		modal = new Modal(modalRef.value);
	});

	const openModal = () => {
		modal.show();
	};

	function closeModal() {
		modal.hide();
	}

	const {selectedGroup} = toRefs(props);

	const childDisabled = ref(true);
	const childDisabledEdit = ref(false);
	const childAddDisabled = ref(false);
	const group = reactive({
		id: null,
		name: null,
		timeFrom: '08:00',
		timeTo: '18:00',
		teacherId: null,
	});

	const childForm = reactive({
		id: null,
		name: null,
		surname: null,
		patronymic: null,
		age: null,
		groupId: null,
		photo: null,
		edit: false
	});

	const teachers = computed(() => store.getters.getTeachers);
	const children = computed(() => store.getters.getChildren);
	const childrenList = computed(() => children.value.filter(c => c.groupId === group.id && c.groupId !== null));
	const groups = computed(() => store.getters.getGroups);
	const groupsList = computed(() => groups.value.filter(g => g.id !== group.id));

	const selectedTeacher = ref(null);


	onMounted(() => {
		if (selectedGroup.value) {
			group.id = selectedGroup.value.id;
			group.name = selectedGroup.value.name;
			group.timeFrom = selectedGroup.value.timeFrom;
			group.timeTo = selectedGroup.value.timeTo;
			group.teacher = selectedGroup.value.teacher;
			group.teacherId = selectedGroup.value.teacherId;
			childDisabledEdit.value = true;
			const bbb = teachers.value.filter(t => t.id === group.teacherId);
			selectedTeacher.value = bbb[0];
		}
	});

	const resetChildForm = () => {
		childForm.id = null;
		childForm.name = null;
		childForm.surname = null;
		childForm.patronymic = null;
		childForm.groupId = null;
		childForm.age = null;
	}

	const addChild = () => {
		if (childForm.name && childForm.surname && childForm.patronymic && childForm.age) {
			childAddDisabled.value = false;
			childForm.id = Date.now();
			childForm.groupId = group.id;
			const dispatchForm = Object.assign({}, childForm);
			store.dispatch('saveChild', dispatchForm);
			resetChildForm();
		} else {
			childAddDisabled.value = true;
		}
	};

	const updateChild = (child) => {
		store.dispatch('updateChild', child);
	}

	const removeChild = (id) => {
		store.dispatch('removeChild', id);
	}

	const saveGroup = () => {
		if (group.name && selectedTeacher.value) {
			group.teacherId = selectedTeacher.value.id;
			if (!selectedGroup.value) {
				group.id = Date.now();
				store.dispatch('saveGroup', group);
				notify({type: 'success', title: "Сохранено"});
				childDisabled.value = false;
			} else {
				store.dispatch('updateGroup', group);
				notify({type: 'success', title: "Обновлено"});
			}
			store.dispatch('addGroupInTeacher', {
				teacherId: selectedTeacher.value.id,
				groupId: group.id
			})
		} else {
			notify({type: 'error', title: "Заполните обязательные поля"});
		}
	}

	const removeGroup = () => {
		store.dispatch('removeGroup', group.id);
		const moveChildrenList = [];
		childrenList.value.forEach(child => {
			child.groupId = moveGroupId.value;
			moveChildrenList.push(child);
		});
		store.dispatch('moveChildren', moveChildrenList);
		close();
		closeModal();
		notify({type: 'success', title: "Группа удалена"});
	}

</script>

<style lang="scss" scoped>
	.table {
		.info-icon {
			width: 30px;
			height: 30px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
	}

	.form-group {
		b {
			color: red;
		}
	}

	.table-container {
		position: relative;

		&.disabled {
			padding: 20px;

			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 20px;
				width: 100%;
				height: 100%;
				background-color: #fff;
				opacity: 0.5;
				z-index: 22;
			}
		}

		&.if-edit {
			padding: 0 !important;

			&:before {
				content: none !important;
			}
		}
	}
</style>