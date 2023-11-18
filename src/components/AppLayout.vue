<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { ROUTES_PATHS } from '@/constants';

interface Props {
	imgUrl: string;
	isBackButtonVisible: boolean;
	backFunc?: () => void;
}

const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();

const routeName = computed(() => route.name);

const goForRandomCocktail = () => {
	router.push(ROUTES_PATHS.COCKTAIL_RANDOM);
	if (routeName.value === ROUTES_PATHS.COCKTAIL_RANDOM) {
		router.go(0);
	}
};

const goBack = () => {
	props.backFunc ? props.backFunc() : router.go(-1);
}

</script>

<template>
	<div class="root">
		<div :style="{ backgroundImage: `url(${props.imgUrl})` }" class="img"></div>
		<div class="main">
			<div class="head">
				<el-button v-if="isBackButtonVisible" :icon="Back" size="large" circle @click="goBack" />
				<!-- <router-link to="/random" class="random-link"> -->
				<el-button class="btn" @click="goForRandomCocktail">Get random cocktail</el-button>
				<!-- </router-link> -->
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
	margin-bottom: 80px;
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

.random-link {
	margin-left: auto;
}
</style>