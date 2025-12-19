# 📸 Cara Pakai Gambar Sendiri (JPG/PNG)

## ✅ Setup Sudah Selesai!

API server sudah dikonfigurasi untuk serve gambar lokal Anda.

---

## 🎯 LANGKAH MUDAH:

### **1. Copy Gambar JPG Anda ke Folder `images/`**

```
fishllet-api/
├── server.js
├── package.json
└── images/           👈 Taruh gambar di sini
    ├── gurame.jpg
    ├── udang.jpg
    ├── cumi-ring.jpg
    ├── cumi-tube.jpg
    ├── dori.jpg
    ├── gurita.jpg
    ├── kakap.jpg
    └── nila.jpg
```

**Copy gambar Anda:**
```bash
# Contoh: Copy gambar dari folder Downloads
copy "C:\Users\YourName\Downloads\gurame.jpg" "d:\Programming\Pem. Mobile\Praktikum\Modul 4\TUGAS\fishllet-api\images\"
```

Atau **drag & drop** file JPG ke folder `images/`

---

### **2. Edit server.js - Ganti URL Gambar**

Buka file `server.js`, cari bagian `products`, lalu edit `strMealThumb`:

**SEBELUM:**
```javascript
{
  id: "1",
  strMeal: "Gurame Segar",
  strMealThumb: "https://images.unsplash.com/photo-xxx", // URL online
  price: 42000,
}
```

**SESUDAH:**
```javascript
{
  id: "1",
  strMeal: "Gurame Segar",
  strMealThumb: "http://10.0.2.2:3000/images/gurame.jpg", // File lokal Anda
  price: 42000,
}
```

**Format URL:**
```
http://10.0.2.2:3000/images/NAMA_FILE.jpg
```

**Contoh Lengkap untuk 8 Produk:**
```javascript
const products = [
  {
    id: "1",
    strMeal: "Gurame Segar",
    strMealThumb: "http://10.0.2.2:3000/images/gurame.jpg",
    price: 42000,
  },
  {
    id: "2",
    strMeal: "Udang Segar",
    strMealThumb: "http://10.0.2.2:3000/images/udang.jpg",
    price: 78000,
  },
  {
    id: "3",
    strMeal: "Cumi Ring",
    strMealThumb: "http://10.0.2.2:3000/images/cumi-ring.jpg",
    price: 75000,
  },
  // ... dst
];
```

---

### **3. Restart API Server**

```bash
# Stop server (Ctrl+C)
# Jalankan ulang
node server.js
```

---

### **4. Test Gambar di Browser**

Buka browser:
```
http://localhost:3000/images/gurame.jpg
```

**Harus muncul gambar Anda!** ✅

---

### **5. Hot Restart Flutter App**

```bash
# Di terminal Flutter
R
```

**Gambar JPG Anda akan muncul di app!** 🎉

---

## 📝 Tips Penamaan File:

✅ **BAGUS:**
- `gurame.jpg`
- `udang-segar.jpg`
- `cumi_ring.jpg`

❌ **HINDARI:**
- `Gurame Segar.jpg` (ada spasi)
- `ikan#1.jpg` (ada karakter khusus)
- `IMG_12345.JPG` (tidak deskriptif)

---

## 🎨 Format Gambar yang Didukung:

✅ JPG / JPEG
✅ PNG
✅ WebP
✅ GIF

---

## 📐 Ukuran Gambar Recommended:

- **Width:** 500-800px
- **Height:** 500-800px
- **Aspect Ratio:** 1:1 (square) atau 4:3
- **File Size:** < 500KB per gambar

**Compress gambar jika terlalu besar:**
- https://tinypng.com
- https://squoosh.app

---

## ⚠️ Troubleshooting

### **Problem: Gambar tidak muncul (404)**

**Cek:**
1. File JPG ada di folder `images/`?
2. Nama file di `strMealThumb` sama persis dengan file asli?
3. Server sudah di-restart?

**Test:**
```bash
# Check file ada
dir images\

# Test di browser
http://localhost:3000/images/gurame.jpg
```

---

### **Problem: Gambar terlalu besar/lambat load**

**Compress dulu:**
```bash
# Pakai TinyPNG.com atau
# Install ImageMagick, lalu:
magick gurame.jpg -resize 800x800 -quality 80 gurame-optimized.jpg
```

---

### **Problem: Gambar muncul di browser tapi tidak di app**

**Ganti `localhost` jadi `10.0.2.2`:**
```javascript
strMealThumb: "http://10.0.2.2:3000/images/gurame.jpg"
// Jangan: http://localhost:3000/images/gurame.jpg
```

---

## 🎯 Quick Checklist:

- [ ] Copy 8 file JPG ke folder `images/`
- [ ] Edit `server.js` - ganti semua `strMealThumb`
- [ ] Restart server (`node server.js`)
- [ ] Test di browser: `http://localhost:3000/images/gurame.jpg`
- [ ] Hot restart app (tekan `R`)
- [ ] Gambar muncul di app! ✨

---

**SELAMAT! Sekarang app pakai gambar produk Anda sendiri!** 🎉📸
