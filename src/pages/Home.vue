<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import CocktailThumb from '@/components/CocktailThumb.vue';
import { useRootStore } from '@/stores/root';
import { storeToRefs } from 'pinia';

const rootStore = useRootStore();
rootStore.getIngredients();

const { ingredients, cocktails, currentIngredient } = storeToRefs(rootStore);

const getCocktailByIngredient = () => {
	rootStore.getCocktail(rootStore.currentIngredient);
};

const removeIngredient = () => {
	rootStore.setIngredient(null);
}

</script>

<template>
	<AppLayout :backFunc="removeIngredient" :isBackButtonVisible="!!currentIngredient">
		<div class="wrapper">
			<div v-if="!currentIngredient || !cocktails" class="info">
				<h1 class="title">Choose your drink</h1>
				<div class="line"></div>
				<div class="select-wrapper">
					<el-select v-model="rootStore.currentIngredient" class="select" placeholder="Choose main ingredient"
						size="large" allow-create @change="getCocktailByIngredient">
						<el-option v-for="item in ingredients" :key="item.strIngredient1" :label="item.strIngredient1"
							:value="item.strIngredient1" />
					</el-select>
				</div>
				<div class="text">
					<p>Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient
						through our cocktail generator.</p>
				</div>
				<img src="/src/assets/img/cocktails.png" alt="Cocktails" class="img">
			</div>
			<div v-else class="info">
				<h1 class="title">Cocktails with {{ currentIngredient }}</h1>
				<div class="line"></div>
				<ul class="cocktails">
					<CocktailThumb v-for="item in cocktails" :key="item.idDrink" :cocktail="item" />
				</ul>
			</div>
		</div>
	</AppLayout>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.info {
	padding: 80px 0;
	text-align: center;
}

.select-wrapper {
	padding-top: 50px;
}

.select {
	width: 220px;
}

.text {
	max-width: 516px;
	line-height: 36px;
	letter-spacing: .1em;
	margin-top: 50px;
	color: $text-muted-color;
}

.img {
	margin-top: 60px;
}

.cocktails {
	margin: 60px 0 0 0;
	padding: 0;
	list-style-type: none;
	display: grid;
	grid-template: 1fr 1fr / 1fr 1fr 1fr;
	gap: 40px;
	justify-items: center;
	max-height: 400px;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: hsl(0 0% 50%);
}

.cocktails::-webkit-scrollbar {
	width: 10px;
	height: 10px;

}

.cocktails::-webkit-scrollbar-thumb {
	background-color: $accent-color;
	border-radius: 10px;
}

.cocktails::-webkit-scrollbar-track {
	background: #333;
	border-radius: 10px;
}
</style>