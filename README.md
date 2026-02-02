
# 🚀 Taza AI Backend

Backend service for **Taza AI**, a quote-based image generation and sharing platform with premium features, watermark control, and user profiles.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Uploads)
- Express Rate Limit
- Helmet (Security)

---

## 📁 Project Structure

```

src/
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── quote.controller.js
│   ├── subscription.controller.js
│
├── models/
│   ├── User.js
│   ├── Quote.js
│   ├── Download.js
│   ├── Subscription.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── quote.routes.js
│   ├── download.routes.js
│   ├── subscription.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── errorHandler.js
│
├── utils/
│   ├── AppError.js
│   ├── catchAsync.js
│   ├── features.js
│
├── config/
│   ├── db.js
│   ├── multer.js
│
├── app.js
└── server.js

```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```

PORT=5000
NODE_ENV=production

MONGO_URI=xxxx

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
CLOUDINARY_UPLOAD_PRESET=xxxxx

```

---

## ▶️ Installation & Run

```

npm install
npm run dev      # Development
npm start        # Production

```

---

## 🔐 Authentication APIs

### Send OTP
```

POST /auth/send-otp

```

### Verify OTP
```

POST /auth/verify-otp

```

Response:
```

{
"token": "JWT_TOKEN"
}

```

Use this token in headers:

```

Authorization: Bearer <JWT_TOKEN>

```

---

## 👤 User APIs

### Get User Profile
```

GET /user/me

```

Response:
```

{
"success": true,
"user": {},
"features": {},
"downloads": []
}

```

---

### Update User Profile
```

PUT /user/me

```

Editable fields:
- name
- profileType
- photo
- showDate

Premium only:
- about
- contactDetails
- organizationDetails

---

## 🖼 Quote APIs

### Get Categories
```

GET /quotes/categories

```

---

### Get Quotes by Category
```

GET /quotes?category=GOOD_MORNING&page=1&limit=1

```

If no quotes found:
```

{
"success": true,
"quotes": [],
"message": "No quotes found for this category"
}

```

---

## 📥 Download APIs

### Save Download
```

POST /downloads

```

Body:
```

{
"imageUrl": "[https://cloudinary.com/image.png](https://cloudinary.com/image.png)",
"isBranded": true
}

```

---

### Get User Downloads
```

GET /downloads

```

---

## 💎 Subscription Features

| Feature | Free | Premium |
|-------|------|---------|
| Remove watermark | ❌ | ✅ |
| Custom text | ❌ | ✅ |
| Custom image | ❌ | ✅ |
| Download without branding | ❌ | ✅ |
| Edit locked fields | ❌ | ✅ |

---

## 🛡 Security

- JWT authentication
- Helmet security headers
- Rate limiting (300 requests / 15 minutes)
- Centralized error handling

---

## 🌍 Base URL

```

[https://taza-ai-backend-production.up.railway.app](https://taza-ai-backend-production.up.railway.app)

```

---

## 👨‍💻 Author

**Prakhar Srivastava**  
Flutter & Backend Developer

---




