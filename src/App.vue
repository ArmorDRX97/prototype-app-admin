<template>
	<Navbar/>
	<Sidebar/>
	<notifications position="bottom right"/>
	<main class="main-container">
		<router-view/>
		<div class="not-reg-kinder-notify" v-if="!regKinder">
			<i class="fa-solid fa-circle-exclamation"></i>
			Учреждение не зарегистрировано. Некоторые функции и мобильное приложение заблокированы. Пройдите
			регистрацию.
		</div>
	</main>
</template>

<script setup>
	import Sidebar from './components/Sidebar';
	import Navbar from './components/Navbar';
	import {computed} from 'vue';
	import {useStore} from 'vuex';

	const store = useStore();
	const regKinder = computed(() => store.getters.getRegKinder)

</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
