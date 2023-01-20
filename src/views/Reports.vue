<template>
	<h4>Отметки детей</h4>
	<hr>
	<div class="row">
		<div class="col-12 col-md-3">
			<div class="form-group">
				<label class="form-label">Группа</label>
				<select class="form-control" v-model="selectedGroup">
					<option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
				</select>
			</div>
		</div>
		<div class="col-12 col-md-3">
			<div class="form-group">
				<label class="form-label">Дата</label>
				<input type="date" class="form-control" v-model="dateFitler">
			</div>
		</div>
	</div>
	<hr>
	<table class="table table-bordered table-responsive">
		<thead>
		<tr>
			<th>№</th>
			<th>ФИО ребенка</th>
			<th>Время</th>
			<th>Воспитатель</th>
			<th>Статус</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="(child, index) in filteredChildren" :key="child.id">
			<td>{{index + 1}}</td>
			<td>{{`${child.surname} ${child.name} ${child.patronymic}`}}</td>
			<td>08:54:23</td>
			<td>{{`${teacher.surname} ${teacher.name} ${teacher.patronymic}`}}</td>
			<td v-if="index === 2"><span class="badge bg-info">Болел</span></td>
			<td v-else-if="index === 3"><span class="badge bg-warning">Отпуск</span></td>
			<td v-else-if="index === 4"><span class="badge bg-secondary">Отсутвовал</span></td>
			<td v-else><span class="badge bg-success">Был</span></td>
		</tr>
		</tbody>
	</table>

	<h4>Статичная таблица для демонстрации (статусы нераспознанных лиц)</h4>
	<table class="table table-bordered table-responsive">
		<thead>
		<tr>
			<th>№</th>
			<th>ФИО ребенка</th>
			<th>Время</th>
			<th>Воспитатель</th>
			<th>Статус</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>1</td>
			<td>Маликов Мерей Каримович</td>
			<td>08:54:23</td>
			<td>Куйрушева Маргарита Васильевна</td>
			<td>
				<i style="position: relative; bottom: -2px; margin-right: 5px; font-size: 18px;"
				   class="fa-solid fa-circle-exclamation"
				   ref="tooltipRef1"
				   data-bs-toggle="popover"
				   data-bs-trigger="hover focus"
				   title="нераспознанные лица"
				   data-bs-content="Этого ребенка в день сканирования проверяют на достоверность"
				></i>
				<span class="badge bg-dark">На рассмотрении</span>
			</td>
		</tr>
		<tr>
			<td>2</td>
			<td>Салимов Кайрат Лаковович</td>
			<td>08:54:23</td>
			<td>Куйрушева Маргарита Васильевна</td>
			<td>
				<i style="position: relative; bottom: -2px; margin-right: 5px; font-size: 18px;"
				   class="fa-solid fa-circle-exclamation"
				   ref="tooltipRef2"
				   data-bs-toggle="popover"
				   data-bs-trigger="hover focus"
				   title="нераспознанные лица"
				   data-bs-content="Лицо принадлежало этому ребенку в день сканирования"
				></i>
				<span class="badge bg-success">Подтвержден</span>
			</td>
		</tr>
		<tr>
			<td>3</td>
			<td>Керимжанов Масалим Харимович</td>
			<td>08:54:23</td>
			<td>Куйрушева Маргарита Васильевна</td>
			<td>
				<i style="position: relative; bottom: -2px; margin-right: 5px; font-size: 18px;"
				   class="fa-solid fa-circle-exclamation"
				   ref="tooltipRef3"
				   data-bs-toggle="popover"
				   data-bs-trigger="hover focus"
				   title="нераспознанные лица"
				   data-bs-content="Проверка в высшей инстанции была проведена. Лицо не принадлежит этому ребенку. Ребенок будет числиться отсутствующим в этот день. Будет проведена проверка, расследование или какой-нибудь выговор (что-то же должно случиться =) )."
				></i>
				<span class="badge bg-danger">Отклонен</span>
			</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	import {ref, computed, onMounted} from 'vue';
	import {useStore} from 'vuex';
	import {Popover} from 'bootstrap';

	const store = useStore();

	let date = new Date(),
		month = '' + date.getMonth() + 1,
		day = '' + date.getDate(),
		year = date.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	const dateFitler = ref(`${year}-${month}-${day}`);

	const groups = computed(() => store.getters.getGroups);
	const selectedGroup = ref(1674134590949);
	const children = computed(() => store.getters.getChildren);
	const teachers = computed(() => store.getters.getTeachers);
	const filteredChildren = computed(() => children.value.filter(c => c.groupId === selectedGroup.value))

	const teacher = computed(() => teachers.value.find(t => t.groupId === selectedGroup.value));
	const tooltipRef1 = ref();
	const tooltipRef2 = ref();
	const tooltipRef3 = ref();

	onMounted(() => {
		new Popover(tooltipRef1.value);
		new Popover(tooltipRef2.value);
		new Popover(tooltipRef3.value);
	});
</script>