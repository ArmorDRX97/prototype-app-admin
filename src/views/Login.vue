<template>
	<div class="log-reg-container auth">
		<div class="content">
			<h4>Авторизация</h4>
			<hr>
			<div class="form-group mb-3">
				<label class="form-label">Email</label>
				<input type="text" placeholder="Введите Вашу почту" class="form-control">
			</div>
			<div class="form-group mb-3">
				<label class="form-label">Пароль</label>
				<input type="password" placeholder="Ваш пароль" class="form-control">
			</div>
			<hr>
			<router-link class="btn btn-light" to="/">Войти</router-link>
			<div class="mt-3">
				Еще не зарегистрированы?
				<router-link to="/register">Зарегистрироваться</router-link>
			</div>
		</div>
	</div>
</template>


<script setup>
	import {useStore} from 'vuex';
	import {onMounted} from 'vue';
	const store = useStore();
	onMounted(() => {
		store.commit('setStart', true);
	})
</script>