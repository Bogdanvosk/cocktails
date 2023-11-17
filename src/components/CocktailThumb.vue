<script setup lang="ts">
import type { Cocktail } from '@/types';

interface Props {
	cocktail: Cocktail;
}

defineProps<Props>();
</script>

<template>
	<li class="cocktail">
		<RouterLink :to="`/cocktail/${cocktail.idDrink}`">
			<div class="cocktail__image" :style="`background-image: url(${cocktail.strDrinkThumb})`">
			</div>
		</RouterLink>
		<h3 class="cocktail__name">{{ cocktail.strDrink }}</h3>
	</li>
</template>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

.cocktail {
	max-width: 156px;
	padding-bottom: 20px;

	&__name {
		font-weight: normal;
		letter-spacing: .1em;
		font-size: 16px;
		margin-top: 15px;
	}

	&__image {
		width: 120px;
		height: 120px;
		margin: 0 auto;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: 50%;
	}
}
</style>