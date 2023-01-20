<template>
	<div class="d-flex justify-content-between align-items-center">
		<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
			<li class="nav-item" role="presentation">
				<button class="nav-link active" id="await-tab" data-bs-toggle="pill" data-bs-target="#await"
				        type="button" role="tab" aria-controls="await" aria-selected="true">
					Присутствуют ({{filteredChildren.length}})
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="done-tab" data-bs-toggle="pill" data-bs-target="#done"
				        type="button" role="tab" aria-controls="done" aria-selected="false">
					Ожидают отметки ({{filteredChildren.length - 5}})
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="boleut-tab" data-bs-toggle="pill" data-bs-target="#boleut"
				        type="button" role="tab" aria-controls="boleut" aria-selected="false">
					Болеют (3)
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="otpusk-tab" data-bs-toggle="pill" data-bs-target="#otpusk"
				        type="button" role="tab" aria-controls="otpusk" aria-selected="false">
					Болеют (2)
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="none-tab" data-bs-toggle="pill" data-bs-target="#none"
				        type="button" role="tab" aria-controls="none" aria-selected="false" disabled>
					Отсутсвуют (0)
				</button>
			</li>
		</ul>
		<select class="form-control" v-model="selectedGroup" style="width: 200px;">
			<option value="all">Фильтр по группам</option>
			<option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
		</select>
	</div>
	<div class="tab-content" id="pills-tabContent">
		<div class="tab-pane fade show active" id="await" role="tabpanel" aria-labelledby="await-tab">
			<table class="table table-bordered table-responsive">
				<thead>
				<tr>
					<th>№</th>
					<th>ФИО ребенка</th>
					<th>Время</th>
					<th>Воспитатель</th>
					<th>Группа</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(child, index) in filteredChildren" :key="child.id"
				    :class="{'error' : child.id === 1674135049707 || child.id === 1674134900044 || child.id === 1674134755220}"
				    @click="openModal(child)">
					<td>{{index + 1}}</td>
					<td>
						{{`${child.surname} ${child.name} ${child.patronymic}`}}
						<span class="badge bg-danger"
						      v-if="child.id === 1674135049707 || child.id === 1674134900044 || child.id === 1674134755220">Лицо не распознано</span>
						<div v-if="child.id === 1674135049707 || child.id === 1674134900044 || child.id === 1674134755220">
							<small>нажмите, чтобы посмотреть</small>
						</div>
					</td>
					<td>08:54:23</td>
					<td>{{teacher(child.groupId)}}</td>
					<td>{{group(child.groupId)}}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="tab-pane fade" id="done" role="tabpanel" aria-labelledby="done-tab">
			<table class="table table-bordered table-responsive">
				<thead>
				<tr>
					<th>№</th>
					<th>ФИО ребенка</th>
					<th>Время</th>
					<th>Воспитатель</th>
					<th>Группа</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(child, index) in filteredChildren" :key="child.id">
					<td>{{index + 1}}</td>
					<td>{{`${child.surname} ${child.name} ${child.patronymic}`}}</td>
					<td>08:54:23</td>
					<td>{{teacher(child.groupId)}}</td>
					<td>{{group(child.groupId)}}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="tab-pane fade" id="boleut" role="tabpanel" aria-labelledby="boleut-tab">
			<table class="table table-bordered table-responsive">
				<thead>
				<tr>
					<th>№</th>
					<th>ФИО ребенка</th>
					<th>Время</th>
					<th>Воспитатель</th>
					<th>Группа</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(child, index) in filteredChildren" :key="child.id">
					<template v-if="index < 3">
						<td>{{index + 1}}</td>
						<td>{{`${child.surname} ${child.name} ${child.patronymic}`}}</td>
						<td>08:54:23</td>
						<td>{{teacher(child.groupId)}}</td>
						<td>{{group(child.groupId)}}</td>
					</template>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="tab-pane fade" id="otpusk" role="tabpanel" aria-labelledby="otpusk-tab">
			<table class="table table-bordered table-responsive">
				<thead>
				<tr>
					<th>№</th>
					<th>ФИО ребенка</th>
					<th>Время</th>
					<th>Воспитатель</th>
					<th>Группа</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(child, index) in filteredChildren" :key="child.id">
					<template v-if="index < 2">
						<td>{{index + 1}}</td>
						<td>{{`${child.surname} ${child.name} ${child.patronymic}`}}</td>
						<td>08:54:23</td>
						<td>{{teacher(child.groupId)}}</td>
						<td>{{group(child.groupId)}}</td>
					</template>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="tab-pane fade" id="none" role="tabpanel" aria-labelledby="otpusk-tab">

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
							Присвоен статус "на рассмотрении". Вы сможете изменить статус после окончания рабочего дня или в
								любой другой день. Если вы не измените статус до конца месяца, ребенок будет автоматически числиться как "отсутствующий"
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
					<button type="button" class="btn btn-secondary" @click="closeModal">Закрыть</button>
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
		if (child.id === 1674135049707 || child.id === 1674134900044 || child.id === 1674134755220) {
			modal.show();
		}
	};

	function closeModal() {
		modal.hide();
		setTimeout(function () {
			currentPhoto.value = null;
		}, 300)
	}

	const groups = computed(() => store.getters.getGroups);
	const selectedGroup = ref('all');
	const children = computed(() => store.getters.getChildren);
	const teachers = computed(() => store.getters.getTeachers);
	const filteredChildren = computed(() => {
		return selectedGroup.value !== 'all' ? children.value.filter(c => c.groupId === selectedGroup.value) : children.value;
	});

	const group = (groupId) => {
		const result = groups.value.find(g => g.id === groupId);
		return result.name;
	};

	const teacher = (groupId) => {
		const result = teachers.value.find(t => t.groupId === groupId);
		return `${result.surname} ${result.name} ${result.patronymic}`;
	};
</script>