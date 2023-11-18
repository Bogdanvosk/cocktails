<script setup lang="ts">
import axios from 'axios';
import AppLayout from '@/components/AppLayout.vue';
import { computed, ref } from 'vue';
import { COCKTAIL_RANDOM, INGREDIENTS_THUMB_URL } from '@/constants';
import type { FullCocktail, Items } from '@/types';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

type Ingredient = {
	name: string,
	measure: string;
};

const cocktail = ref<FullCocktail | any>();

const ingredients = computed(() => {
	const ingredients: string[] = [];

	for (let i = 0; i < 15; i++) {
		if (!cocktail.value[`strIngredient${i + 1}`]) break;

		const ingredient = cocktail.value[`strIngredient${i + 1}`];
		ingredients.push(ingredient);
	}
	return ingredients;
});

const getCocktail = async () => {
	const { data } = await axios.get<Items<FullCocktail>>(COCKTAIL_RANDOM);
	cocktail.value = data.drinks[0];
};
getCocktail();

</script>

<template>
	<div v-if="cocktail" class="wrap">
		<AppLayout :imgUrl="cocktail.strDrinkThumb" :isBackButtonVisible="true">
			<div class="wrapper">
				<div class="info">
					<h1 class="title">{{ cocktail.strDrink }}</h1>
					<div class="slider">
						<swiper class="swiper" :slides-per-view="3" :space-between="80">
							<swiper-slide class="swiper-slide" v-for="ingredient in ingredients" :key="ingredient">
								<img :src="`${INGREDIENTS_THUMB_URL}${ingredient}-Small.png`" alt="Igredient thumb">
								<h3 class="ingredient-title">{{ ingredient }}</h3>
							</swiper-slide>
						</swiper>
					</div>
					<div class="text">
						<p>
							{{ cocktail.strInstructions }}
						</p>
					</div>
				</div>
			</div>
		</AppLayout>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.slider {
	margin: 50px 0;
}

.swiper-slide {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

.ingredient-title {
	font-weight: normal;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 1.6px;
	text-align: center;
}
</style>