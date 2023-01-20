<template>
	<header class="navbar">
		<nav class="px-4">
			<div class="left">
				<router-link v-if="regKinder" class="has-verify" to="/verification"><i class="fa-solid fa-circle-exclamation pulse"></i>
					Верификация <span class="badge bg-danger">5</span></router-link>
			</div>
			<div class="right">
				<router-link v-if="regKinder" to="/daily"><i class="fa-solid fa-expand"></i> Дневной план</router-link>
				<button v-else ><i class="fa-solid fa-expand"></i> Дневной план</button>
				<router-link to="/"><i class="fa-solid fa-table-columns"></i> Дашборд</router-link>
				<router-link to="/profile"><i class="fa-solid fa-user"></i> Профиль</router-link>
			</div>
		</nav>
	</header>
</template>

<script setup>
	import {computed} from 'vue';
	import {useStore} from 'vuex';
	const store = useStore();

	const regKinder = computed(() => store.getters.getRegKinder);
</script>