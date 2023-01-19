<template>
	<h4>Регистрация учреждения</h4>
	<hr>
	<div class="row">
		<div class="col-12 col-md-4">
			<div class="form-group mb-3">
				<label class="form-label">Выберите детский сад</label>
				<select class="form-control" v-model="garden">
					<option v-for="garden in gardenList" :key="garden">{{garden}}</option>
				</select>
			</div>
		</div>
		{{garden}}
	</div>
</template>

<script>
	export default {
		name: 'Setting',
		data(){
			return{
				gardenList: [
					'Шабыт, детский сад №95',
					'Сункар, детский сад №21',
					'Алижан Хаматов, детский сад №44',
					'Керемет, детский сад №23',
					'Казакамаанаа, детский сад №77',
				],
				garden: null
			}
		}
	}
</script>