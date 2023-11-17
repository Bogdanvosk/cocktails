import { defineStore } from 'pinia'
import axios from 'axios'
import { INGREDIENTS_URL, COCKTAILS_BY_INGREDIENT_URL } from '../constants'
import type { Cocktail, Ingredient, Items, RootState } from '@/types'

export const useRootStore = defineStore('root', {
  state: (): RootState => ({
    ingredients: [],
    cocktails: [],
    currentIngredient: null
  }),
  getters: {},
  actions: {
    async getIngredients() {
      const { data } = await axios.get<Items<Ingredient>>(INGREDIENTS_URL)
      this.ingredients = data.drinks
    },
    async getCocktail(ingredient: string | null) {
      const { data } = await axios.get<Items<Cocktail>>(COCKTAILS_BY_INGREDIENT_URL + ingredient)
      this.cocktails = data.drinks
    },
    setIngredient(value: string | null) {
      this.currentIngredient = value
    }
  }
})
