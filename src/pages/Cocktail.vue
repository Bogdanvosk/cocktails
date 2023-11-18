<script setup lang="ts">
import { useRoute } from 'vue-router';
import axios from 'axios';
import AppLayout from '@/components/AppLayout.vue';
import { computed, ref } from 'vue';
import { COCKTAIL_BY_ID } from '@/constants';
import type { FullCocktail, Items } from '@/types';

type Ingredient = {
	name: string,
	measure: string;
};

const cocktail = ref<FullCocktail | any>();
const route = useRoute();
const cocktailId = computed(() => route.path.split('/').pop());

const ingredients = computed(() => {
	const ingredients: Ingredient[] = [];

	for (let i = 0; i < 15; i++) {
		if (cocktail.value && !cocktail.value[`strIngredient${i + 1}`]) break;

		const ingredient: Ingredient = {
			name: '',
			measure: ''
		};

		ingredient.name = cocktail.value[`strIngredient${i + 1}`];
		ingredient.measure = cocktail.value[`strMeasure${i + 1}`];

		ingredients.push(ingredient);
	}

	return ingredients;
});

const getCocktail = async () => {
	const { data } = await axios.get<Items<FullCocktail>>(COCKTAIL_BY_ID + cocktailId.value);
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
					<div class="line"></div>
					<ul class="list">
						<li class="list-item" v-for="(item, idx) in ingredients" :key="idx">
							<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_22_188)">
									<path
										d="M9.68345 5.52731C10.3776 5.059 10.9355 4.6397 11.5332 4.28849C12.5523 3.68931 13.6207 3.56076 14.7582 4.00681C16.8182 4.82879 17.9329 6.34308 18.2134 8.51606C18.3675 9.71314 17.8665 10.7219 17.2151 11.649C16.5337 12.6259 15.763 13.538 15.0527 14.4983C14.0721 15.8134 13.3948 17.2556 13.2176 18.9141C13.1822 19.2401 12.9796 19.5485 12.879 19.8003C12.4183 19.9693 12.104 19.9558 11.8559 19.6105C11.711 19.415 11.5315 19.2443 11.3792 19.0535C10.7132 18.2255 9.88798 17.5844 9.01582 16.9912C7.71201 16.1068 6.36315 15.2896 5.13336 14.3009C4.1116 13.4852 3.28408 12.4517 2.71095 11.2755C2.06545 9.94158 1.96245 8.52286 2.55167 7.09055C3.22667 5.44522 5.55791 3.76901 7.9489 4.4708C8.43782 4.61414 8.8706 4.95586 9.31871 5.22088C9.44969 5.31124 9.57181 5.41384 9.68345 5.52731ZM11.8642 17.5229C11.9309 17.4399 11.986 17.3484 12.0281 17.2507C12.4861 15.5576 13.3857 14.115 14.4913 12.7735C15.1579 11.9644 15.7855 11.1191 16.3695 10.245C17.2837 8.89525 17.0365 7.67278 16.1283 6.44989C15.8417 6.09575 15.5032 5.78712 15.1243 5.53448C14.3933 5.00824 13.587 4.91051 12.7287 5.20938C11.8486 5.51664 11.0949 5.98348 10.5265 6.7485C10.2088 7.17428 9.74061 7.18544 9.3436 6.83977C9.23813 6.74739 9.14322 6.64359 9.06058 6.53027C8.54665 5.83287 7.81931 5.66886 7.01382 5.69295C6.30874 5.7147 5.62369 5.93301 5.03566 6.32335C4.74087 6.50953 4.49112 6.75909 4.30453 7.05394C3.6311 8.20175 3.46481 9.42567 3.95795 10.6856C4.38882 11.8077 5.13651 12.7797 6.10972 13.4832C6.79146 13.9832 7.48158 14.4539 8.18298 14.9169C9.35309 15.688 10.5473 16.4201 11.5772 17.3843C11.666 17.4436 11.7626 17.4902 11.8642 17.5229Z"
										fill="#FF0F82" />
									<path
										d="M11.8642 17.5229C11.7635 17.4891 11.6678 17.4417 11.58 17.3817C10.5502 16.4175 9.35592 15.6854 8.18581 14.9142C7.48156 14.4539 6.7923 13.9761 6.1097 13.4832C5.13619 12.7811 4.38771 11.8103 3.95558 10.6893C3.46394 9.43277 3.62873 8.2055 4.30216 7.05768C4.48875 6.76283 4.7385 6.51327 5.03329 6.32709C5.6216 5.93501 6.30755 5.71538 7.0138 5.69296C7.81929 5.66886 8.54998 5.83137 9.06056 6.53028C9.1432 6.6436 9.23812 6.7474 9.34358 6.83977C9.74059 7.18544 10.2087 7.17428 10.5265 6.74851C11.0948 5.98349 11.852 5.51514 12.7287 5.20938C13.587 4.91052 14.3933 5.00824 15.1243 5.53448C15.5031 5.78713 15.8417 6.09576 16.1283 6.44989C17.0365 7.67278 17.2802 8.88743 16.3695 10.245C15.784 11.1157 15.1579 11.9644 14.4913 12.7735C13.3857 14.115 12.4841 15.5531 12.0281 17.2507C11.986 17.3484 11.9309 17.4399 11.8642 17.5229Z"
										fill="#FF0F82" />
								</g>
								<defs>
									<clipPath id="clip0_22_188">
										<rect width="16.9748" height="16.9949" fill="white"
											transform="matrix(0.912494 -0.409089 0.407875 0.913038 0 6.94417)" />
									</clipPath>
								</defs>
							</svg>
							{{ item.name }}
							<template v-if="item.measure">
								| {{ item.measure }}
							</template>
						</li>
					</ul>
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

.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.info {
	width: 100%;
	padding: 0 0 80px 0;
	text-align: center;
}

.list {
	max-width: 560px;
	list-style-type: none;
	text-align: left;
	margin: 50px 0 80px;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;

	&-item {
		display: flex;
		align-items: center;
		gap: 23px;

		font-size: 18px;
		line-height: 27px;
		letter-spacing: .1em;
	}
}
</style>