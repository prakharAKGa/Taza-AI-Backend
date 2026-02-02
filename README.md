📦 Taza AI Backend

Backend service for Taza AI, a quote-based image generation platform with premium features, watermark control, downloads, and user profiles.

🚀 Features

🔐 JWT Authentication (OTP based)

👤 User Profile Management (Personal / Business)

💎 Premium Subscription Support

🖼️ Quote Templates with Categories

✍️ Edit & Generate Quote Images

☁️ Cloudinary Image Upload

📥 Download History Tracking

🚫 Watermark control (Premium)

🛡️ Rate Limiting & Security Headers

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary

Multer

Helmet

Express Rate Limit

📁 Project Structure
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

⚙️ Environment Variables

Create a .env file in root:

PORT=5000
NODE_ENV=production

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taza_ai

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
CLOUDINARY_UPLOAD_PRESET=xxxxx

▶️ Installation & Run
npm install
npm run dev      # development
npm start        # production

🔐 Authentication Flow

Send OTP

POST /auth/send-otp


Verify OTP

POST /auth/verify-otp


Returns:

{
  "token": "JWT_TOKEN"
}


Use this token in headers:

Authorization: Bearer <TOKEN>

👤 User APIs
🔹 Get Profile
GET /user/me


Response:

{
  "success": true,
  "user": {...},
  "features": {...},
  "downloads": [...]
}

🔹 Update Profile
PUT /user/me


Editable:

name

photo

profileType

showDate

Premium only:

about

contactDetails

organizationDetails

🖼️ Quote APIs
🔹 Get Categories
GET /quotes/categories

🔹 Get Quotes by Category
GET /quotes?category=GOOD_MORNING&page=1&limit=1


Empty state response (NO ERROR):

{
  "success": true,
  "quotes": [],
  "message": "No quotes found for this category"
}

📥 Download APIs
🔹 Save Download (after Cloudinary upload)
POST /downloads


Body:

{
  "imageUrl": "https://cloudinary.com/image.png",
  "isBranded": true
}

🔹 Get User Downloads
GET /downloads

💎 Subscription APIs
GET /subscription/plans
POST /subscription/activate


Used to unlock:

No watermark

Custom text/image

Locked profile fields

🧠 Premium Feature Logic
Feature	Free	Premium
Watermark removal	❌	✅
Custom text	❌	✅
Custom image	❌	✅
Download without branding	❌	✅
Edit locked fields	❌	✅
🛡️ Security

Helmet enabled

Rate limiting (300 req / 15 min)

JWT verification middleware

Centralized error handling

🧪 Error Handling Example
{
  "success": false,
  "message": "Upgrade to Premium to edit locked fields"
}

🌍 Base URL
https://taza-ai-backend-production.up.railway.app

📌 Future Improvements

Payment Gateway (Razorpay / Stripe)

Admin panel for quotes

Analytics for downloads

CDN caching

Webhook support

👨‍💻 Author

Prakhar Srivastava
Flutter & Backend Developer
🚀 Built for scalable mobile-first apps
