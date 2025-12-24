export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'groceries' | 'vegetables' | 'dairy' | 'essentials';
  emoji: string;
  unit: string;
  image: string;
}

export const products: Product[] = [
  // Groceries
  {
    id: 1,
    name: "Basmati Rice",
    price: 450,
    category: "groceries",
    emoji: "🍚",
    unit: "5 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Toor Dal",
    price: 160,
    category: "groceries",
    emoji: "🫘",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Wheat Flour",
    price: 240,
    category: "groceries",
    emoji: "🌾",
    unit: "5 kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Sugar",
    price: 45,
    category: "groceries",
    emoji: "🧊",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop"
  },

  // Vegetables
  {
    id: 5,
    name: "Tomatoes",
    price: 40,
    category: "vegetables",
    emoji: "🍅",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1546470427-227c7369a9b8?w=300&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Onions",
    price: 35,
    category: "vegetables",
    emoji: "🧅",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Potatoes",
    price: 30,
    category: "vegetables",
    emoji: "🥔",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82ber33a?w=300&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Green Chillies",
    price: 20,
    category: "vegetables",
    emoji: "🌶️",
    unit: "250 g",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=300&h=300&fit=crop"
  },

  // Dairy
  {
    id: 9,
    name: "Fresh Milk",
    price: 60,
    category: "dairy",
    emoji: "🥛",
    unit: "1 L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Curd",
    price: 35,
    category: "dairy",
    emoji: "🥣",
    unit: "500 g",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Paneer",
    price: 80,
    category: "dairy",
    emoji: "🧀",
    unit: "200 g",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop"
  },
  {
    id: 12,
    name: "Butter",
    price: 55,
    category: "dairy",
    emoji: "🧈",
    unit: "100 g",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop"
  },

  // Daily Essentials
  {
    id: 13,
    name: "Cooking Oil",
    price: 180,
    category: "essentials",
    emoji: "🫒",
    unit: "1 L",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop"
  },
  {
    id: 14,
    name: "Salt",
    price: 25,
    category: "essentials",
    emoji: "🧂",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1518110925495-5fe2c7223bb7?w=300&h=300&fit=crop"
  },
  {
    id: 15,
    name: "Tea Leaves",
    price: 120,
    category: "essentials",
    emoji: "🍵",
    unit: "250 g",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop"
  },
  {
    id: 16,
    name: "Bread",
    price: 40,
    category: "essentials",
    emoji: "🍞",
    unit: "400 g",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop"
  },
];

export const categories = [
  { id: 'all', name: 'All', emoji: '🛒' },
  { id: 'groceries', name: 'Groceries', emoji: '🍚' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'essentials', name: 'Essentials', emoji: '🧴' },
] as const;
