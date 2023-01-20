<template>
	<div class="row">
		<div class="col-12 col-md-6">
			<h4>Список детей</h4>
		</div>
		<div class="col-12 col-md-6 text-end">
			<button class="btn btn-success" @click="openFastAdd = true" v-if="!openFastAdd">
				Открыть быстрое добавление
			</button>
			<button class="btn btn-secondary" @click="openFastAdd = false" v-else>
				Закрыть быстрое добавление
			</button>
		</div>
	</div>
	<hr>

	<template v-if="openFastAdd">
		<div class="row">
			<div class="col-12 col-md-9">
				<div class="row">
					<div class="col-12 col-md-4 mb-3">
						<input type="text" class="form-control" placeholder="Фамилия" v-model="childForm.surname">
					</div>
					<div class="col-12 col-md-4 mb-3">
						<input type="text" class="form-control" placeholder="Имя" v-model="childForm.name">
					</div>
					<div class="col-12 col-md-4 mb-3">
						<input type="text" class="form-control" placeholder="Отчество" v-model="childForm.patronymic">
					</div>
					<div class="col-12 col-md-4 mb-3">
						<input type="number" class="form-control" placeholder="возраст" v-model="childForm.age">
					</div>
					<div class="col-12 col-md-4 mb-3">
						<select class="form-control" v-model="childForm.groupId">
							<option value="null">Без группы</option>
							<option v-for="gr in groups" :value="gr.id" :key="gr.id">
								{{gr.name}}
							</option>
						</select>
					</div>
					<div class="col-12 col-md-4 mb-3">
						<input type="file" class="form-control" ref="fileupload" accept=".jpg, .png, .jpeg" @change="addPhoto($event, null)">
					</div>
				</div>
			</div>
			<div class="col-12 col-md-3">
				<div class="add-form-children-page-image-block">
					<img :src="childForm.photo" alt="photo" v-if="childForm.photo">
					<p v-else>Фотография не выбрана</p>
				</div>
			</div>
		</div>
		<div class="text-end">
			<button class="btn btn-success w-auto" @click="addChild"><i class="fa fa-plus-circle me-2"></i>Добавить</button>
		</div>
		<hr>
	</template>

	<table class="table table-bordered table-responsive">
		<thead>
		<tr>
			<th></th>
			<th>Фото</th>
			<th>Фамилия</th>
			<th>Имя</th>
			<th>Отчество</th>
			<th>Возраст</th>
			<th>Группа</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="(child, index) in children.slice().reverse()" :key="child.id">
			<td>{{children.length - index}}</td>
			<template v-if="!child.edit">
				<td class="position-relative">
					<div class="img-table">
						<img :src="child.photo" alt="photo" v-if="child.photo">
						<img src="../assets/img/no_photo.svg" alt="photo" v-else>
					</div>
					<img :src="child.photo" v-if="child.photo" alt="photo" class="full-image">
				</td>
				<td>{{child.surname}}</td>
				<td>{{child.name}}</td>
				<td>{{child.patronymic}}</td>
				<td>{{child.age}}</td>
				<td>{{groupName(child.groupId)}}</td>
			</template>
			<template v-else>
				<td>
					<div class="img-table change">
						<img :src="child.photo" alt="photo" v-if="child.photo">
						<img src="../assets/img/no_photo.svg" alt="photo" v-else>
						<input type="file" accept=".jpg, .png, .jpeg" @change="addPhoto($event, child.id)">
					</div>
				</td>
				<td><input type="text" class="form-control" v-model="child.surname"></td>
				<td><input type="text" class="form-control" v-model="child.name"></td>
				<td><input type="text" class="form-control" v-model="child.patronymic"></td>
				<td><input type="number" class="form-control" v-model="child.age"></td>
				<td>
					<select class="form-control" v-model="child.groupId">
						<option value="null">Без группы</option>
						<option v-for="gr in groups" :value="gr.id" :key="gr.id">
							{{gr.name}}
						</option>
					</select>
				</td>
			</template>
			<td style="width: 100px;">
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
		</tbody>
	</table>
</template>

<script setup>
	import {computed, reactive, ref} from "vue";
	import {useStore} from 'vuex';
	import {useNotification} from "@kyvg/vue3-notification";

	const {notify} = useNotification();
	const store = useStore();
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
	const openFastAdd = ref(false);
	const fileupload = ref(null);
	const groups = computed(() => store.getters.getGroups);
	const children = computed(() => store.getters.getChildren);

	const groupName = (id) => {
		const result = groups.value.filter(g => g.id === id);
		if(result.length){
			return result[0].name;
		} else {
			return 'Без группы';
		}
	};

	const addPhoto = (event, id) => {
		const selectedChild = children.value.filter(c => c.id === id);
		const file = event.target['files'][0];
		const reader = new FileReader();

		reader.onload = function () {
			const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
			if (id !== null) {
				selectedChild[0].photo = `data:${file.type};base64,${base64String}`;
			} else {
				childForm.photo = `data:${file.type};base64,${base64String}`;
			}
		};
		reader.readAsDataURL(file);
	};

	const resetChildForm = () => {
		childForm.id = null;
		childForm.name = null;
		childForm.surname = null;
		childForm.patronymic = null;
		childForm.groupId = null;
		childForm.age = null;
		childForm.photo = null;
		fileupload.value.value = null;
	}

	const addChild = () => {
		if (childForm.name && childForm.surname && childForm.patronymic && childForm.age) {
			childForm.id = Date.now();
			const dispatchForm = Object.assign({}, childForm);
			store.dispatch('saveChild', dispatchForm);
			resetChildForm();
		} else {
			notify({type: 'error', title: "Заполните все поля"});
		}
	};

	const updateChild = (child) => {
		store.dispatch('updateChild', child);
	};

	const removeChild = (id) => {
		store.dispatch('removeChild', id);
	}
</script>