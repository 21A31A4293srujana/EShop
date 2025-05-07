import { Product } from '../model/Product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smart TV 4K',
    title: 'Ultra HD Smart Television',
    description: '55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps.',
    price: 49999.99,
    stockQuantity: 25,
    category: 'Televisions',
    brand: 'Samsung',
    specifications: {
      dimensions: '48.5 x 28.1 x 3.9 inches',
      weight: '35.3 lbs',
      powerConsumption: '120W',
      warranty: '2 years',
      features: ['4K Resolution', 'Smart TV', 'HDR', 'Voice Control']
    },
    color: 'BLACK',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.7,
    reviews: 180
  },
  {
    id: '2',
    name: 'Smart Refrigerator',
    title: 'Smart Wi-Fi Enabled Refrigerator',
    description: 'French door refrigerator with smart features and energy efficiency.',
    price: 89999.99,
    stockQuantity: 15,
    category: 'Appliances',
    brand: 'LG',
    specifications: {
      dimensions: '70.5 x 35.75 x 36.25 inches',
      weight: '320 lbs',
      powerConsumption: '700 kWh/year',
      warranty: '1 year',
      features: ['Wi-Fi Enabled', 'Smart Diagnosis', 'Door-in-Door', 'Ice Maker']
    },
    color: 'STAINLESS STEEL',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.5,
    reviews: 95
  },
  {
    id: '3',
    name: 'Smart Coffee Maker',
    title: 'Wi-Fi Enabled Coffee Maker',
    description: 'Programmable coffee maker with smart features and app control.',
    price: 9999.99,
    stockQuantity: 50,
    category: 'Small Appliances',
    brand: 'Cuisinart',
    specifications: {
      dimensions: '14.5 x 8.5 x 11.5 inches',
      weight: '5.5 lbs',
      powerConsumption: '1200W',
      warranty: '1 year',
      features: ['Wi-Fi Enabled', 'Programmable', '12-Cup Capacity', 'Auto Shutoff']
    },
    color: 'SILVER',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.3,
    reviews: 120
  },
  {
    id: '4',
    name: 'Smart Speaker',
    title: 'Voice-Controlled Smart Speaker',
    description: 'High-quality smart speaker with voice assistant and multi-room audio.',
    price: 7999.99,
    stockQuantity: 75,
    category: 'Audio',
    brand: 'Amazon',
    specifications: {
      dimensions: '5.8 x 5.8 x 5.8 inches',
      weight: '1.8 lbs',
      powerConsumption: '15W',
      warranty: '1 year',
      features: ['Voice Control', 'Multi-Room Audio', 'HD Audio', 'Smart Home Hub']
    },
    color: 'BLACK',
    imageUrl: 'https://images.unsplash.com/photo-1606220588911-5117e869d833?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.6,
    reviews: 250
  },
  {
    id: '5',
    name: 'Smart Thermostat',
    title: 'Wi-Fi Smart Thermostat',
    description: 'Energy-saving smart thermostat with app control and learning capabilities.',
    price: 12999.99,
    stockQuantity: 40,
    category: 'Smart Home',
    brand: 'Nest',
    specifications: {
      dimensions: '3.3 x 3.3 x 1.2 inches',
      weight: '0.3 lbs',
      powerConsumption: '2W',
      warranty: '2 years',
      features: ['Wi-Fi Enabled', 'Learning Thermostat', 'Energy Saving', 'App Control']
    },
    color: 'WHITE',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055e3fdf0ab?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.8,
    reviews: 300
  }
]; 