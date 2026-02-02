
require('./dnsFix');

require('dotenv').config();

const mongoose = require('mongoose');
const SubscriptionPlan = require('../models/SubscriptionPlan');

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env');
  process.exit(1);
}

(async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    await SubscriptionPlan.deleteMany();

    await SubscriptionPlan.insertMany([
      {
        key: 'MONTHLY',
        title: 'Monthly Plan',
        price: 199,
        durationInDays: 30,
      },
      {
        key: 'YEARLY',
        title: 'Yearly Plan',
        price: 999,
        durationInDays: 365,
      },
    ]);

    console.log('✅ Subscription plans seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
})();
