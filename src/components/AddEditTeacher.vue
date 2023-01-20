<template>
	<div class="row">
		<div class="col-12 col-md-6">
			<h4>Добавить воспитателя</h4>
		</div>
		<div class="col-12 col-md-6 text-end">
			<button class="btn btn-secondary" @click="close">Назад</button>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-12 col-md-6">
			<div class="form-group mb-3">
				<label class="form-label"><b>*</b>Фамилия</label>
				<input type="text" class="form-control" v-model="form.surname">
			</div>
			<div class="form-group mb-3">
				<label class="form-label"><b>*</b>Имя</label>
				<input type="text" class="form-control" v-model="form.name">
			</div>
			<div class="form-group mb-3">
				<label class="form-label"><b>*</b>Отчество</label>
				<input type="text" class="form-control" v-model="form.patronymic">
			</div>
			<div class="form-group mb-3">
				<label class="form-label"><b>*</b>Телефон <span :class="{'text-danger': invalidPhone}">({{phoneLength}} цифр из 11)</span></label>
				<input type="number" class="form-control" :class="{'is-invalid': invalidPhone}" v-model="form.phone"
				       @input="calcLength" @change="validatePhone">
			</div>
		</div>
		<div class="col-12 col-md-6">
			<div class="img-teacher-block">
				<input type="file" id="formFile" accept=".jpg, .png, .jpeg" @change="addImage">
				<img :src="form.photo" alt="" v-if="form.photo">
				<div class="img-teacher-add" v-else></div>
			</div>
		</div>
	</div>
	<hr v-if="teacherEdit">
	<div class="row align-items-center" v-if="teacherEdit && !form.verify">
		<div class="col-12 col-md-6">
		<div v-if="!form.verify">
			Воспитатель еще не прошел первичную авторизацию в приложении. Отправьте данные для авторизации.
			<br><br>
			<b class="text-danger">Внимание!</b> Укажите действительный email воспитателя. Создание нового пароля будет
			происходить по почте.
		</div>
		</div>
		<div class="col-12 col-md-6">
			<div class="card">
				<div class="card-header">
					Выслать данные авторизации воспитателю
				</div>
				<div class="card-body">
					<div class="form-group mb-3">
						<label class="form-label"><b>*</b>Email</label>
						<input type="email" class="form-control" v-model="form.email">
					</div>
					<div class="form-group">
						<label class="form-label"><b>*</b>Пароль</label>
						<div class="d-flex align-items-center">
							<input type="text" class="form-control" v-model="form.password">
							<button class="btn btn-primary whitespace-nowrap ms-3"
							        @click="form.password = 'Afe^3dj2*2s'">Сгенерировать пароль
							</button>
						</div>
					</div>
				</div>
				<div class="card-footer text-end">
					<button class="btn btn-success" @click="saveVerify">Выслать</button>
				</div>
			</div>
		</div>
	</div>
	<div v-if="form.verify && form.email && form.password" class="text-success">
		Данные для авторизации высланы
	</div>
	<hr>
	<button class="btn btn-success" @click="save">Сохранить</button>
	<button class="btn btn-danger ms-3" @click="openModal" v-if="teacherEdit">Удалить</button>

	<div class="modal fade" id="modal_demo" tabindex="-1" ref="modalRef">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					Вы уверены, что хотите удалить воспитателя?
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
					<button type="button" class="btn btn-danger" @click="removeTeacher">Удалить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {useStore} from 'vuex';
	import {reactive, ref, defineProps, defineEmits, toRefs, onMounted} from 'vue';
	import {useNotification} from "@kyvg/vue3-notification";
	import {Modal} from "bootstrap";

	const store = useStore();
	const {notify} = useNotification();
	const modalRef = ref(null);
	let modal = null;
	onMounted(() => {
		modal = new Modal(modalRef.value);
	});
	const props = defineProps({
		teacherEdit: Object
	})

	const {teacherEdit} = toRefs(props);

	const emit = defineEmits(['close']);
	const close = () => {
		emit('close')
	};
	const form = reactive({
		id: null,
		name: '',
		surname: '',
		patronymic: '',
		phone: '',
		email: '',
		password: '',
		verify: false,
		addDate: new Date().toLocaleDateString('ru-RU'),
		photo: null,
		groupId: null
	});

	onMounted(() => {
		if (teacherEdit.value) {
			form.id = teacherEdit.value.id;
			form.name = teacherEdit.value.name;
			form.surname = teacherEdit.value.surname;
			form.patronymic = teacherEdit.value.patronymic;
			form.phone = teacherEdit.value.phone;
			form.email = teacherEdit.value.email;
			form.password = teacherEdit.value.password;
			form.addDate = teacherEdit.value.addDate;
			form.verify = teacherEdit.value.verify;
			form.photo = teacherEdit.value.photo;
			form.groupId = teacherEdit.value.groupId;
		}
	});
	const phoneLength = ref(0);
	const invalidPhone = ref(false);
	const validatePhone = () => {
		invalidPhone.value = phoneLength.value !== 11 ? true : false;
	};
	const calcLength = (event) => {
		phoneLength.value = event.target.value.length;
	}

	const addImage = (event) => {
		const file = event.target['files'][0];
		const reader = new FileReader();

		reader.onload = function () {
			const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
			form.photo = `data:${file.type};base64,${base64String}`;
		};
		reader.readAsDataURL(file);
	};

	const validateForm = () => {
		if (form.name && form.surname && form.patronymic && form.phone && !invalidPhone.value) {
			return true;
		}
		notify({type: 'error', title: "Заполните обязательные поля",});
		return false;
	};

	const validateFormVerify = () => {
		if (form.email && form.password) {
			return true;
		}
		notify({type: 'error', title: "Заполните email и пароль",});
		return false;
	};

	const save = () => {
		const valid = validateForm();
		if (valid) {
			if (!teacherEdit.value) {
				form.id = Date.now();
				store.dispatch('saveTeachers', form);
			} else {
				store.dispatch('updateTeacher', form);
			}
			notify({type: 'success', title: "Сохранено"});
			close();
		}
	};

	const saveVerify = () => {
		const valid = validateFormVerify();
		if (valid) {
			form.verify = true;
			store.dispatch('updateTeacher', form);
			notify({type: 'success', title: "Отправлено"});
		}
	};


	const openModal = () => {
		modal.show();
	};

	function closeModal() {
		modal.hide();
	}

	const removeTeacher = () => {
		store.dispatch('removeTeacher', form.id);
		closeModal();
		close();
		notify({type: 'success', title: "Воспитатель удалено"});
	};

</script>