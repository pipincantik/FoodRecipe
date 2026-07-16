import type {
  MealDBRaw,
  MealDBSearchResponse,
  MealDetail,
  MealSummary,
  Ingredient,
} from "@/types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function toSummary(raw: MealDBRaw): MealSummary {
  return {
    id: raw.idMeal,
    name: raw.strMeal,
    thumbnail: raw.strMealThumb,
    category: raw.strCategory,
    area: raw.strArea,
  };
}

function toIngredientList(raw: MealDBRaw): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];
    if (name && name.trim().length > 0) {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim() || "",
      });
    }
  }
  return ingredients;
}

function extractYoutubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

function toDetail(raw: MealDBRaw): MealDetail {
  return {
    ...toSummary(raw),
    instructions: (raw.strInstructions || "")
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter(Boolean),
    ingredients: toIngredientList(raw),
    youtubeId: extractYoutubeId(raw.strYoutube),
    source: raw.strSource,
    tags: (raw.strTags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
}

async function fetchMeals(url: string): Promise<MealDBRaw[]> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`MealDB request failed: ${res.status}`);
  }
  const data: MealDBSearchResponse = await res.json();
  return data.meals ?? [];
}

export async function searchMealsByName(query: string): Promise<MealSummary[]> {
  if (!query.trim()) return [];
  const raw = await fetchMeals(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );
  return raw.map(toSummary);
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const raw = await fetchMeals(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  return raw[0] ? toDetail(raw[0]) : null;
}

export async function getRandomMeal(): Promise<MealDetail | null> {
  const raw = await fetchMeals(`${BASE_URL}/random.php`);
  return raw[0] ? toDetail(raw[0]) : null;
}

export async function getRandomMeals(count: number): Promise<MealSummary[]> {
  // Public API only exposes a single random meal per call, so we fan out
  // and de-dupe by id.
  const seen = new Map<string, MealSummary>();
  let attempts = 0;
  while (seen.size < count && attempts < count * 3) {
    attempts++;
    const meal = await getRandomMeal();
    if (meal) seen.set(meal.id, meal);
  }
  return Array.from(seen.values());
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/list.php?c=list`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`MealDB categories request failed: ${res.status}`);
  const data = await res.json();
  // API shape: { meals: [{ strCategory: 'Beef' }, ...] }
  const items: { strCategory?: string | null }[] = data.meals ?? [];
  return items
    .map((i) => i.strCategory ?? "")
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

export async function searchMealsByCategory(category: string): Promise<MealSummary[]> {
  if (!category.trim()) return [];
  const raw = await fetchMeals(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return raw.map((r) => ({
    id: r.idMeal,
    name: r.strMeal,
    thumbnail: r.strMealThumb,
    category: category,
    area: null,
  }));
}
