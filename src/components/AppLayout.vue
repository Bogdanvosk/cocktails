<script setup lang="ts">
import { Back } from '@element-plus/icons-vue';
interface Props {
	backFunc: () => void;
	isBackButtonVisible: boolean;
}

defineProps<Props>();


</script>

<template>
	<div class="root">
		<div class="img"></div>
		<div class="main">
			<div class="head">
				<el-button v-if="isBackButtonVisible" :icon="Back" size="large" circle @click="backFunc" />
				<el-button class="btn">Get random cocktail</el-button>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.root {
	min-height: 100vh;
	display: flex;
	background-color: $bg-color;
}

.img {
	width: 50%;
	background-repeat: no-repeat;
	background-size: cover;

	background-image: url(/src/assets/img/bg.jpg);
}

.main {
	position: relative;
	width: 50%;
	padding: 32px 40px;
}

.head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.btn {
	display: block;
	margin-left: auto;
	background-color: $accent-color;
	border-color: $accent-color;
	color: $text-color;
	font-size: 16px;
	font-family: $primary-font;

	&:hover {
		background-color: darken($accent-color, 20%);
	}

	&:active {
		border-color: lighten($accent-color, 20%);
	}
}
</style>