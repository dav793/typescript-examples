
export const CATEGORY = {
    MAIN_DISH:  0,
    SIDE_DISH:  1,
    BEVERAGE:   2
} as const;
type CategoryKey = keyof typeof CATEGORY;                           // 'MAIN_DISH' | 'SIDE_DISH' | 'BEVERAGE'

export const MAIN_DISH = {
    PIZZA:      0,
    BURGER:     1
} as const;
type MainDishItemKey = keyof typeof MAIN_DISH;                      // 'PIZZA' | 'BURGER'
type MainDishItemValue = typeof MAIN_DISH[keyof typeof MAIN_DISH];  // 0 | 1

export const SIDE_DISH = {
    FRIES:      0,
    SALAD:      1
} as const;
type SideDishItemKey = keyof typeof SIDE_DISH;                      // 'FRIES' | 'SALAD'
type SideDishItemValue = typeof SIDE_DISH[keyof typeof SIDE_DISH];  // 0 | 1

export const BEVERAGE = {
    SODA:       0,
    ICED_TEA:   1,
    WATER:      2
} as const;
type BeverageItemKey = keyof typeof BEVERAGE;                       // 'SODA' | 'ICED_TEA' | 'WATER'
type BeverageItemValue = typeof BEVERAGE[keyof typeof BEVERAGE];    // 0 | 1 | 2


export type CategoryMap =
    | typeof MAIN_DISH
    | typeof SIDE_DISH
    | typeof BEVERAGE;

export type AnyItemKey =        // 'PIZZA' | 'BURGER' | 'FRIES' | 'SALAD' | 'SODA' | 'ICED_TEA' | 'WATER'
    | MainDishItemKey
    | SideDishItemKey
    | BeverageItemKey;

export type AnyItemValue =      // 0 | 1 | 2
    | MainDishItemValue
    | SideDishItemValue
    | BeverageItemValue;


// generate random price for an item
const lookupPrice = (item: AnyItemValue) => Math.random();

const getItemMap = (category: CategoryKey): CategoryMap => {
    switch (category) {
        case 'MAIN_DISH':
            return MAIN_DISH;
        case 'SIDE_DISH':
            return SIDE_DISH;
        case 'BEVERAGE':
            return BEVERAGE;
    }
};

// assign a price to every item in a given category
const generatePriceTable = (category: CategoryKey) => {
    const itemCategoryMap = getItemMap(category);

    const priceTable: Partial<{
        [key in AnyItemKey]: number
    }> = {};

    Object.keys(itemCategoryMap)
        .forEach((itemKey) => {

            const itemValue = (itemCategoryMap as any)[itemKey];        // how can you avoid using type any here??
            priceTable[itemKey as AnyItemKey] = lookupPrice(itemValue);
        });
}
