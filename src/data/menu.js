

export const CATEGORIES = ['Burgers', 'Drinks', 'Desserts'];

export const MENU = [
  
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    category: 'Burgers',
    price: 7,
    calories: 640,
    prepTime: 12,
    tags: [],
    description:
      'A juicy beef patty with melted cheddar, lettuce, tomato, pickles and our house sauce on a soft bun.',
    ingredients: ['Beef patty', 'Cheddar', 'Pickles', 'Lettuce', 'Tomato', 'House sauce', 'Brioche bun'],
    tint: '#FFD9AE',
    art: { kind: 'burger', bun: '#E9A04A', patty: '#6B3A1F', cheese: true },
  },
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken Burger',
    category: 'Burgers',
    price: 8,
    calories: 710,
    prepTime: 13,
    tags: ['New'],
    description: 'Golden fried chicken with crunchy slaw and honey mustard on a toasted bun.',
    ingredients: ['Fried chicken', 'Cabbage slaw', 'Honey mustard', 'Pickles', 'Potato bun'],
    tint: '#FFE6A8',
    art: { kind: 'burger', bun: '#EDB25C', patty: '#D48A2C', cheese: false },
  },

 
  {
    id: 'mint-lemonade',
    name: 'Fresh Mint Lemonade',
    category: 'Drinks',
    price: 4,
    calories: 140,
    prepTime: 3,
    tags: ['Vegetarian'],
    description: 'Fresh lemons, mint leaves and a little sugar over crushed ice.',
    ingredients: ['Lemon juice', 'Fresh mint', 'Sugar', 'Sparkling water', 'Ice'],
    tint: '#FFF3A8',
    art: { kind: 'drink', liquid: '#F7DE5A', straw: '#2F9E5B', lemon: true, ice: true },
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    category: 'Drinks',
    price: 2,
    calories: 150,
    prepTime: 1,
    tags: [],
    description: 'An ice-cold Coca-Cola served in a 500 ml cup.',
    ingredients: ['Coca-Cola', 'Ice'],
    tint: '#F5D0C4',
    art: { kind: 'drink', liquid: '#5A2414', straw: '#E4572E', lid: true, cup: '#D62D2D' },
  },

  
  {
    id: 'fudge-brownie',
    name: 'Brownie',
    category: 'Desserts',
    price: 3,
    calories: 460,
    prepTime: 2,
    tags: ['Vegetarian'],
    description: 'Soft and gooey chocolate brownies with a drizzle of white chocolate.',
    ingredients: ['Dark chocolate', 'Brown sugar', 'Butter', 'Eggs', 'White chocolate'],
    tint: '#E6D3C3',
    art: { kind: 'brownie' },
  },
  {
    id: 'glazed-donut',
    name: 'Pink Glazed Donut',
    category: 'Desserts',
    price: 2,
    calories: 300,
    prepTime: 1,
    tags: ['Vegetarian'],
    description: 'A fluffy donut dipped in pink glaze and covered with colourful sprinkles.',
    ingredients: ['Dough', 'Strawberry glaze', 'Sprinkles'],
    tint: '#FFD6E2',
    art: { kind: 'donut', icing: '#F57BA6' },
  },
];

export function getDish(id) {
  return MENU.find((dish) => dish.id === id);
}


export const CATEGORY_META = {
  Burgers: { tint: '#FFD9AE', blurb: 'Grilled, juicy and stacked high.', art: getDish('classic-burger').art },
  Drinks: { tint: '#FFF3A8', blurb: 'Fresh lemonade and cold drinks.', art: getDish('mint-lemonade').art },
  Desserts: { tint: '#FFD6E2', blurb: 'Something sweet to finish.', art: getDish('glazed-donut').art },
};
