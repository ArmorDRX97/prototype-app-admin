<template>
	<div class="row align-items-end">
		<div class="col-12 col-md-8">
			<h4>Верификация детей</h4>
			<p class="m-0">Список нераспознанных детей. Измените статус до конца месяца. В противном случае они автоматически будут переведы в статус "отсутвует" и зафиксированы в отчете.</p>
		</div>
		<div class="col-12 col-md-4 text-end text-danger">
			<b>Тут нет действий. Станица только для просмотра и "тыкания"</b>
		</div>
	</div>
	<hr>
	<div class="row reports" v-for="num in 3" :key="num">
		<div class="col-12 col-md-2">
			<div class="verify-date">
				<i class="fa-solid fa-calendar-days"></i>
				1{{5 + num}}.01.2023
			</div>
		</div>
		<div class="col-12 col-md-10">
			<div class="row">
				<template v-for="(child, index) in finalList" :key="child.id">
					<div class="col-12 col-md-6 mb-3" v-if="index < num + 1">
						<div class="report-item" @click="openModal(child)">
							<div class="photo">
								<img :src="child.photo" alt="photo" v-if="child.photo">
								<img src="../assets/img/no_photo.svg" alt="photo" v-else>
							</div>
							<div class="content">
								<h5>{{`${child.surname} ${child.name} ${child.patronymic}`}}</h5>
								<p><i class="fa fa-children me-2"></i>{{child.groupName}}</p>
								<p><i class="fa-solid fa-user me-2"></i>{{child.teacherName}}</p>
								<p><i class="fa-solid fa-clock me-2"></i> 08:54:43</p>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>

	<div class="modal modal-xl fade" id="modal_demo" tabindex="-1" ref="modalRef">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<div class="modal-title">Сравнение фотографий</div>
					<button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					<div class="row align-items-center">
						<div class="col-12 col-md-6">
							<h5>Лицо было подтверждено воспитателем вручную</h5>
							Сравните фотографии и подтвердите, что лицо действиетльно принадлежит ребенку.
							Если лица не совпадают, отклоните. Ребенок будет считаться отсутсвующим в этот день.
						</div>
						<div class="col-12 col-md-6">
							<div class="info-block">
								<i class="fa-solid fa-circle-exclamation"></i>
								<span>Ручное подтверждение нераспознанного лица будет зафиксировано в отчете и
						автоматически отправлено на рассмотрение высшей инстанции для проверки</span>
							</div>
						</div>
					</div>
					<hr>
					<div class="d-flex justify-content-between">
						<div>
							<h4>До</h4>
							<img :src="currentPhoto" alt="photo" style="width: 500px; height: auto;">
						</div>
						<div>
							<h4>После</h4>
							<img :src="currentPhoto" alt="photo" style="width: 500px; height: auto;">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" @click="closeModal">Отклонить</button>
					<button type="button" class="btn btn-success" @click="closeModal">Подтвердить</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
	import {ref, computed, onMounted} from 'vue';
	import {useStore} from 'vuex';
	import {Modal} from "bootstrap";

	const store = useStore();
	let modal = null;
	const modalRef = ref(null);
	onMounted(() => {
		modal = new Modal(modalRef.value);
	});
	const currentPhoto = ref(null);

	const openModal = (child) => {
		currentPhoto.value = child.photo;
		modal.show();
	};

	function closeModal() {
		modal.hide();
		setTimeout(function () {
			currentPhoto.value = null;
		}, 300)
	}

	const groups = computed(() => store.getters.getGroups);
	const children = computed(() => store.getters.getChildren);
	const teachers = computed(() => store.getters.getTeachers);

	const group = (groupId) => {
		const result = groups.value.find(g => g.id === groupId);
		return result.name;
	};

	const teacher = (groupId) => {
		const result = teachers.value.find(t => t.groupId === groupId);
		return `${result.surname} ${result.name} ${result.patronymic}`;
	};

	const finalList = computed(() => {
		const childrenList = children.value.filter(c => c.photo !== null);
		for(let i = 0; i < childrenList.length; i++){
			childrenList[i].groupName = group(childrenList[i].groupId);
			childrenList[i].teacherName = teacher(childrenList[i].groupId);
		}
		return childrenList;
	});
</script>