# 🐟 Fishllet Public API

API sederhana untuk menampilkan produk ikan custom di aplikasi Fishllet.

## 📦 Produk yang Tersedia

| Produk | Harga |
|--------|-------|
| Gurame | Rp 42.000 |
| Udang | Rp 78.000 |
| Cumi Ring | Rp 75.000 |
| Cumi Tube | Rp 74.000 |
| Dori | Rp 33.000 |
| Gurita Cut | Rp 58.000 |
| Kakap | Rp 66.000 |
| Nila | Rp 35.000 |

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan server
npm start
```

Server akan berjalan di: **http://localhost:3000**

## 📚 API Endpoints

### 1. Get All Products
```
GET http://localhost:3000/api/products
```

### 2. Get Product Detail
```
GET http://localhost:3000/api/products/:id
```

### 3. Search Products
```
GET http://localhost:3000/api/products/search/:query
```
Contoh: `/api/products/search/udang`

### 4. Filter by Price
```
GET http://localhost:3000/api/products/filter/price?min=30000&max=70000
```

### 5. Get Categories
```
GET http://localhost:3000/api/categories
```

### 6. Get Products by Category
```
GET http://localhost:3000/api/categories/:category
```
Contoh: `/api/categories/Seafood`

### 7. Health Check
```
GET http://localhost:3000/api/health
```

## 🧪 Testing API

Buka browser dan akses:
- http://localhost:3000 (API Info)
- http://localhost:3000/api/products (Semua produk)
- http://localhost:3000/api/products/1 (Detail produk)

## 🔓 Access

API ini **PUBLIC** - tidak memerlukan autentikasi.
Bisa diakses dari mana saja termasuk Flutter app.

## 📱 Integrasi dengan Flutter

Update file `lib/services/api_services.dart`:

```dart
final Dio _dio = Dio(BaseOptions(
  baseUrl: "http://localhost:3000/api",
  // Atau setelah deploy: "https://your-api.com/api"
));
```

## 🌐 Deploy (Optional)

Untuk deploy gratis:
- **Railway.app**: Push ke GitHub → Connect → Deploy
- **Render.com**: Import dari GitHub → Deploy
- **Vercel**: `vercel deploy`

---

**Made with ❤️ for Fishllet App**
