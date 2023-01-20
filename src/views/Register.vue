<template>
	<div class="log-reg-container">
		<div class="content">
			<h4>Регистрация</h4>
			<hr>
			<div class="row">
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Имя</label>
						<input type="text" placeholder="Введите Ваше имя" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Фамилия</label>
						<input type="text" placeholder="Введите Свою фамилию" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Отчетсво</label>
						<input type="text" placeholder="Введите Ваше отчетсво" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">ИИН</label>
						<input type="number" placeholder="Введите Ваш ИИН" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Email</label>
						<input type="email" placeholder="Введите Вашу почту" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Телефон</label>
						<input type="number" placeholder="Ваш номер телефона" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Пароль</label>
						<input type="password" placeholder="Ваш пароль" class="form-control">
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group mb-3">
						<label class="form-label">Повторите пароль</label>
						<input type="password" placeholder="Повторите пароль" class="form-control">
					</div>
				</div>
			</div>
			<hr>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="check1">
				<label class="form-check-label" for="check1">
					Я соглашаюсь с <a href="#!">условиями использования сервиса</a>
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="check2">
				<label class="form-check-label" for="check2">
					Еще какой-нибудь чекбокс с условиями
				</label>
			</div>
			<hr>
			<div class="row align-items-center">
				<div class="col-12 col-md-6">
					<router-link to="/login" class="btn btn-light" @click="register">Зарегистрироваться</router-link>
				</div>
				<div class="col-12 col-md-6 text-end">
					Уже зарегистрированы?
					<router-link to="/login">Войти</router-link>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
	import {useStore} from 'vuex';
	const store = useStore();
	const register = () => {
		store.commit('setRegister', true);
	}
</script>