const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ════════════════════════════════════════════════════════════════
app.use(cors()); // ✅ Izinkan semua origin (PUBLIK)
app.use(express.json());

// ✅ Serve static files (untuk gambar JPG/PNG)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// ════════════════════════════════════════════════════════════════
// DATA PRODUK (In-Memory Database)
// ════════════════════════════════════════════════════════════════
const products = [
  {
    id: "1",
    idMeal: "1",
    strMeal: "Gurame Segar",
    strMealThumb: "http://10.0.2.2:3000/images/6.png",
    strCategory: "Ikan Air Tawar",
    strArea: "Indonesia",
    strInstructions: "Gurame segar pilihan untuk berbagai masakan. Bisa digoreng, dibakar, atau dikukus.",
    price: 42000,
    stock: 50,
    category: "Ikan Air Tawar",
    description: "Gurame segar berkualitas premium"
  },
  {
    id: "2",
    idMeal: "2",
    strMeal: "Udang Segar",
    strMealThumb: "http://10.0.2.2:3000/images/8.png",
    strCategory: "Seafood",
    strArea: "Indonesia",
    strInstructions: "Udang segar pilihan untuk berbagai masakan seafood. Cocok untuk tumis, bakar, atau goreng tepung.",
    price: 78000,
    stock: 40,
    category: "Seafood",
    description: "Udang segar berkualitas tinggi"
  },
  {
    id: "3",
    idMeal: "3",
    strMeal: "Cumi Ring",
    strMealThumb: "http://10.0.2.2:3000/images/Cumi Ring.png",
    strCategory: "Seafood",
    strArea: "Indonesia",
    strInstructions: "Cumi ring siap pakai, tinggal goreng dengan tepung crispy. Sempurna untuk camilan atau lauk.",
    price: 75000,
    stock: 35,
    category: "Seafood",
    description: "Cumi ring siap goreng"
  },
  {
    id: "4",
    idMeal: "4",
    strMeal: "Cumi Tube",
    strMealThumb: "http://10.0.2.2:3000/images/Cumi Tube.png",
    strCategory: "Seafood",
    strArea: "Indonesia",
    strInstructions: "Cumi tube fresh, cocok untuk isi atau diiris untuk tumisan. Tekstur kenyal dan lezat.",
    price: 74000,
    stock: 30,
    category: "Seafood",
    description: "Cumi tube segar berkualitas"
  },
  {
    id: "5",
    idMeal: "5",
    strMeal: "Ikan Dori",
    strMealThumb: "http://10.0.2.2:3000/images/Dori.png",
    strCategory: "Ikan Laut",
    strArea: "Indonesia",
    strInstructions: "Ikan dori fillet tanpa duri, sangat cocok untuk anak-anak. Bisa digoreng tepung atau dikukus.",
    price: 33000,
    stock: 60,
    category: "Ikan Laut",
    description: "Dori fillet tanpa duri"
  },
  {
    id: "6",
    idMeal: "6",
    strMeal: "Gurita Cut",
    strMealThumb: "http://10.0.2.2:3000/images/Gurita Cut.png",
    strCategory: "Seafood",
    strArea: "Indonesia",
    strInstructions: "Gurita sudah dipotong-potong siap masak. Cocok untuk tumis atau bakar dengan saus pedas.",
    price: 58000,
    stock: 25,
    category: "Seafood",
    description: "Gurita potong siap masak"
  },
  {
    id: "7",
    idMeal: "7",
    strMeal: "Kakap Merah",
    strMealThumb: "http://10.0.2.2:3000/images/Kakap.png",
    strCategory: "Ikan Laut",
    strArea: "Indonesia",
    strInstructions: "Kakap merah segar dari laut Indonesia. Daging tebal, cocok untuk bakar atau goreng bumbu.",
    price: 66000,
    stock: 45,
    category: "Ikan Laut",
    description: "Kakap merah segar premium"
  },
  {
    id: "8",
    idMeal: "8",
    strMeal: "Ikan Nila",
    strMealThumb: "http://10.0.2.2:3000/images/Nila.png",
    strCategory: "Ikan Air Tawar",
    strArea: "Indonesia",
    strInstructions: "Nila segar dari kolam terpilih. Harga ekonomis, rasa tetap enak. Cocok untuk digoreng atau dibakar.",
    price: 35000,
    stock: 70,
    category: "Ikan Air Tawar",
    description: "Nila segar harga ekonomis"
  }
];

// ════════════════════════════════════════════════════════════════
// 🌍 PUBLIC API ROUTES
// ════════════════════════════════════════════════════════════════

// 📌 ROOT - API Info
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🐟 Fishllet Public API - Custom Products',
    version: '1.0.0',
    totalProducts: products.length,
    endpoints: {
      root: 'GET /',
      allProducts: 'GET /api/products',
      productDetail: 'GET /api/products/:id',
      search: 'GET /api/products/search/:query',
      categories: 'GET /api/categories',
      productsByCategory: 'GET /api/categories/:category',
      health: 'GET /api/health'
    }
  });
});

// 📌 GET - List All Products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    count: products.length,
    meals: products, // Format sesuai TheMealDB API
    data: products
  });
});

// 📌 GET - Product Detail by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id || p.idMeal === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    meals: [product], // Format sesuai TheMealDB API
    data: product
  });
});

// 📌 GET - Search Products
app.get('/api/products/search/:query', (req, res) => {
  const { query } = req.params;
  const searchQuery = query.toLowerCase();
  
  const results = products.filter(p => 
    p.strMeal.toLowerCase().includes(searchQuery) ||
    p.strCategory.toLowerCase().includes(searchQuery) ||
    p.description.toLowerCase().includes(searchQuery)
  );
  
  res.json({
    success: true,
    count: results.length,
    query: query,
    meals: results,
    data: results
  });
});

// 📌 GET - Filter by Price Range
app.get('/api/products/filter/price', (req, res) => {
  const { min = 0, max = 999999 } = req.query;
  
  const results = products.filter(p => 
    p.price >= parseInt(min) && p.price <= parseInt(max)
  );
  
  res.json({
    success: true,
    count: results.length,
    filter: { min, max },
    meals: results,
    data: results
  });
});

// 📌 GET - All Categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  
  res.json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// 📌 GET - Products by Category
app.get('/api/categories/:category', (req, res) => {
  const { category } = req.params;
  
  const results = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    success: true,
    category: category,
    count: results.length,
    meals: results,
    data: results
  });
});

// 📌 GET - Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    totalProducts: products.length
  });
});

// ════════════════════════════════════════════════════════════════
// 404 HANDLER
// ════════════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// ════════════════════════════════════════════════════════════════
// START SERVER
// ════════════════════════════════════════════════════════════════
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔════════════════════════════════════════════════════════════════╗
  ║                                                                ║
  ║  🐟 FISHLLET PUBLIC API - CUSTOM PRODUCTS                      ║
  ║  📡 Server running on http://localhost:${PORT}                   ║
  ║  🌐 Network: http://0.0.0.0:${PORT} (accessible from network)    ║
  ║  📱 Android Emulator: http://10.0.2.2:${PORT}                    ║
  ║  🗄️  Data: In-Memory (${products.length} products)                           ║
  ║  🔓 Access: PUBLIC (No authentication)                         ║
  ║                                                                ║
  ║  📦 Your Products:                                             ║
  ║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
  ║  • Gurame       - Rp 42.000                                    ║
  ║  • Udang        - Rp 78.000                                    ║
  ║  • Cumi Ring    - Rp 75.000                                    ║
  ║  • Cumi Tube    - Rp 74.000                                    ║
  ║  • Dori         - Rp 33.000                                    ║
  ║  • Gurita Cut   - Rp 58.000                                    ║
  ║  • Kakap        - Rp 66.000                                    ║
  ║  • Nila         - Rp 35.000                                    ║
  ║                                                                ║
  ║  📚 Endpoints:                                                 ║
  ║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
  ║  GET  /                              - API Info                ║
  ║  GET  /api/products                  - All products            ║
  ║  GET  /api/products/:id              - Product detail          ║
  ║  GET  /api/products/search/:query    - Search products         ║
  ║  GET  /api/products/filter/price     - Filter by price         ║
  ║  GET  /api/categories                - All categories          ║
  ║  GET  /api/categories/:category      - By category             ║
  ║  GET  /api/health                    - Health check            ║
  ║                                                                ║
  ║  🧪 Test it: http://localhost:${PORT}/api/products               ║
  ║                                                                ║
  ╚════════════════════════════════════════════════════════════════╝
  `);
});
