// Raw shape returned directly by TheMealDB (fields we care about).
// The API returns strIngredient1..20 / strMeasure1..20 as flat fields,
// which we normalize into an array via `toIngredientList`.
export interface MealDBRaw {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

export interface MealSummary {
  id: string;
  name: string;
  thumbnail: string | null;
  category: string | null;
  area: string | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface MealDetail extends MealSummary {
  instructions: string[];
  ingredients: Ingredient[];
  youtubeId: string | null;
  source: string | null;
  tags: string[];
}

export interface MealDBSearchResponse {
  meals: MealDBRaw[] | null;
}
