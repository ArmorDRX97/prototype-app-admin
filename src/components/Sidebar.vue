<template>
	<div class="sidebar">
		<div class="sidebar-top">
			<span class="logo">LOGO</span>
		</div>
		<ul class="sidebar-list">
			<li><router-link to="/children"><i class="fa fa-children"></i> Дети</router-link> </li>
			<li><router-link to="/groups"><i class="fa-solid fa-users-line"></i> Группы</router-link> </li>
			<li><router-link to="/teachers"><i class="fa fa-user"></i> Воспитатели</router-link> </li>
			<li v-if="regKinder"><router-link to="/reports"><i class="fa-regular fa-file-lines"></i> Отчеты</router-link> </li>
			<li v-else><button disabled><i class="fa-regular fa-file-lines"></i> Отчеты </button> </li>
<!--			<li><button class="dev" disabled><i class="fa-solid fa-chart-gantt"></i> Статистика</button> </li>-->
			<li><router-link to="/settings"><i class="fa-solid fa-cog"></i> Настройки</router-link> </li>
			<li><router-link to="/kindergarten-register" style="white-space: nowrap" v-if="!regKinder"><i class="fa-solid fa-circle-exclamation text-danger"></i> Регистрация учреждения</router-link> </li>
		</ul>
	</div>
</template>

<script setup>
	import {computed} from 'vue';
	import {useStore} from 'vuex';

	const store = useStore();
	const regKinder = computed(() => store.getters.getRegKinder)
</script>