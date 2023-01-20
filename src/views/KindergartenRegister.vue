<template>
	<h4>Регистрация учреждения</h4>
	<hr>
	<div>
		Зарегистрируйте десткий сад в системе. Заполните все поля и нажмите кнопку "отправить". Заявка на
		регистрацию учреждения будет обрабатываться от 1 до 7 дней. Доступ к функционалу не ограничен. В период
		ожидания вы можете пользоваться системой и заполнять данные. После верификации учреждения, откроется доступ
		к полноценной работе системы и мобильного приложения.
	</div>
	<hr>
	<div class="card">
		<div class="card-header">
			Директор
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-12 col-md-8">
					<div class="form-group mb-3">
						<label class="form-label">ФИО</label>
						<input type="text" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">ИИН</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Номер удостоверения</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Еще что-нибудь</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">ну и еще что-нибудь</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Рабочий телефон 1</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Рабочий телефон 2</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Домашний телефон</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Какой-то документ</label>
						<input type="file" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Еще какой-нибудь документ</label>
						<input type="file" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Ну и последний документ</label>
						<input type="file" class="form-control">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card mt-4">
		<div class="card-header">
			Детский сад
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Выберите детский сад</label>
						<select class="form-control" v-model="garden">
							<option v-for="garden in gardenList" :key="garden">{{garden}}</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Какой-нибудь нужный номер документа</label>
						<input type="number" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="form-group mb-3">
						<label class="form-label">Какой-нибудь нужный документ</label>
						<input type="file" class="form-control">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card mt-4">
		<div class="card-header">
			<div class="row align-items-center">
				<div class="col-12 col-md-6">
					Выберите область учреждения
				</div>
				<div class="col-12 col-md-6">
					<div class="row justify-content-end">
						<label class="col-form-label col-sm-4">Выберите радиус</label>
						<div class="col-sm-5">
							<select class="form-control">
								<option value="100">100м</option>
								<option value="150">150м</option>
								<option value="200">200м</option>
								<option value="200">200м</option>
								<option value="250">250м</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d28320.85948003675!2d71.4309352909338!3d51.141036346916586!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skz!4v1674105522525!5m2!1sru!2skz"
		        width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy"
		        referrerpolicy="no-referrer-when-downgrade"></iframe>
	</div>
	<hr>
	<div class="text-end">
		<button class="btn btn-info" @click="verify">Отправить на верификацию</button>
	</div>
</template>

<script setup>
	import {ref} from 'vue';
	import {useStore} from 'vuex';
	import {useRouter} from 'vue-router';
	const store = useStore();
	const router = useRouter();
	const gardenList = ref([
		'Шабыт, детский сад №95',
		'Сункар, детский сад №21',
		'Алижан Хаматов, детский сад №44',
		'Керемет, детский сад №23',
		'Казакамаанаа, детский сад №77',
	])

	const verify = () =>{
		store.commit('setRegKinder');
		router.push('/');
	}
</script>