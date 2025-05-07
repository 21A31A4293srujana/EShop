import CatalogProduct from './model/CatalogProduct';

export const mockProducts: CatalogProduct[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    title: 'Latest iPhone with A17 Pro chip',
    description: 'The most powerful iPhone ever with a titanium design, A17 Pro chip, and advanced camera system.',
    price: 134999.00,
    stockQuantity: 50,
    category: 'Smartphones',
    brand: 'Apple',
    specifications: {
      dimensions: '146.6 x 70.6 x 8.25 mm',
      weight: '187g',
      warranty: '1 year',
      features: ['A17 Pro chip', 'Titanium design', '48MP camera', 'USB-C']
    },
    color: 'Titanium',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    title: 'Powerful laptop for professionals',
    description: '16-inch MacBook Pro with M3 Pro chip, 18GB unified memory, and 512GB SSD storage.',
    price: 249999.00,
    stockQuantity: 30,
    category: 'Laptops',
    brand: 'Apple',
    specifications: {
      dimensions: '355.7 x 248.1 x 16.8 mm',
      weight: '2.1 kg',
      powerConsumption: '100W',
      warranty: '1 year',
      features: ['M3 Pro chip', '18GB unified memory', '512GB SSD', 'Liquid Retina XDR display']
    },
    color: 'Space Gray',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'AirPods Pro',
    title: 'Wireless earbuds with noise cancellation',
    description: 'AirPods Pro with active noise cancellation, transparency mode, and spatial audio.',
    price: 24999.00,
    stockQuantity: 100,
    category: 'Accessories',
    brand: 'Apple',
    specifications: {
      dimensions: '24.0 x 21.8 x 24.0 mm',
      weight: '5.3g',
      warranty: '1 year',
      features: ['Active Noise Cancellation', 'Transparency mode', 'Spatial audio', 'Water resistant']
    },
    color: 'White',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    title: 'Ultimate Android smartphone',
    description: 'Samsung Galaxy S24 Ultra with S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
    price: 129999.00,
    stockQuantity: 45,
    category: 'Smartphones',
    brand: 'Samsung',
    specifications: {
      dimensions: '162.3 x 79.2 x 8.6 mm',
      weight: '233g',
      warranty: '1 year',
      features: ['200MP camera', 'S Pen', 'Snapdragon 8 Gen 3', 'Titanium frame']
    },
    color: 'Titanium Gray',
    imageUrl: 'https://images.unsplash.com/photo-1706887041416-4c7b5c2c0e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Dell XPS 15',
    title: 'Premium Windows laptop',
    description: 'Dell XPS 15 with Intel Core i9, 32GB RAM, and 1TB SSD storage.',
    price: 189999.00,
    stockQuantity: 25,
    category: 'Laptops',
    brand: 'Dell',
    specifications: {
      dimensions: '344.4 x 230.1 x 16.3 mm',
      weight: '1.8 kg',
      powerConsumption: '130W',
      warranty: '1 year',
      features: ['Intel Core i9', '32GB RAM', '1TB SSD', 'NVIDIA RTX 4070']
    },
    color: 'Silver',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    title: 'Premium noise-cancelling headphones',
    description: 'Industry-leading noise cancellation with exceptional sound quality and comfort.',
    price: 29999.00,
    stockQuantity: 60,
    category: 'Accessories',
    brand: 'Sony',
    specifications: {
      dimensions: '168.5 x 248.4 x 72.3 mm',
      weight: '250g',
      warranty: '1 year',
      features: ['Active Noise Cancellation', '30-hour battery', 'Touch controls', 'Multi-device pairing']
    },
    color: 'Black',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'iPad Pro 12.9"',
    title: 'Ultimate tablet for creativity',
    description: '12.9-inch iPad Pro with M2 chip, perfect for artists and professionals.',
    price: 109999.00,
    stockQuantity: 40,
    category: 'Tablets',
    brand: 'Apple',
    specifications: {
      dimensions: '280.6 x 214.9 x 6.4 mm',
      weight: '682g',
      warranty: '1 year',
      features: ['M2 chip', 'Liquid Retina XDR display', 'Apple Pencil support', 'Thunderbolt 4']
    },
    color: 'Space Gray',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Samsung Galaxy Tab S9 Ultra',
    title: 'Premium Android tablet',
    description: '14.6-inch Galaxy Tab S9 Ultra with S Pen and Snapdragon 8 Gen 2.',
    price: 119999.00,
    stockQuantity: 35,
    category: 'Tablets',
    brand: 'Samsung',
    specifications: {
      dimensions: '326.4 x 208.6 x 5.5 mm',
      weight: '732g',
      warranty: '1 year',
      features: ['Snapdragon 8 Gen 2', 'S Pen included', '12GB RAM', '256GB storage']
    },
    color: 'Graphite',
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Samsung QN90B Neo QLED 4K',
    title: 'Premium 4K Smart TV with Neo QLED',
    description: '55-inch Samsung Neo QLED 4K Smart TV with Quantum Matrix Technology and Object Tracking Sound.',
    price: 149999.00,
    stockQuantity: 25,
    category: 'Televisions',
    brand: 'Samsung',
    specifications: {
      dimensions: '123.2 x 70.6 x 2.6 cm',
      weight: '18.5 kg',
      powerConsumption: '150W',
      warranty: '1 year',
      features: ['Neo QLED 4K', 'Quantum HDR 24X', 'Object Tracking Sound', 'Gaming Mode']
    },
    color: 'Black',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    name: 'LG C3 OLED 4K',
    title: 'Premium OLED Smart TV',
    description: '65-inch LG OLED 4K Smart TV with perfect blacks and infinite contrast.',
    price: 249999.00,
    stockQuantity: 15,
    category: 'Televisions',
    brand: 'LG',
    specifications: {
      dimensions: '144.9 x 83.3 x 4.6 cm',
      weight: '24.5 kg',
      powerConsumption: '180W',
      warranty: '1 year',
      features: ['OLED 4K', 'AI ThinQ', 'Dolby Vision', 'NVIDIA G-SYNC']
    },
    color: 'Black',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '11',
    name: 'Sony Bravia XR A95K',
    title: 'QD-OLED Smart TV',
    description: '65-inch Sony QD-OLED Smart TV with Cognitive Processor XR.',
    price: 299999.00,
    stockQuantity: 10,
    category: 'Televisions',
    brand: 'Sony',
    specifications: {
      dimensions: '144.8 x 83.2 x 3.3 cm',
      weight: '23.5 kg',
      powerConsumption: '200W',
      warranty: '1 year',
      features: ['QD-OLED 4K', 'Cognitive Processor XR', 'Acoustic Surface Audio+', 'Google TV']
    },
    color: 'Black',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];