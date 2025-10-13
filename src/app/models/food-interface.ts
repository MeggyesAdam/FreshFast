export interface Dish {
    id: number;
    name: string;
    description: string;
    calories: number;
    allergens: string[];
    price: number;
    category: DishCategory;
    imageUrl: string;
    ingredients: string[];
}

export enum DishCategory {
    Soups = 'Levesek',
    MainCourses = 'Főételek',
    Desserts = 'Desszertek',
    Drinks = 'Italok'
}