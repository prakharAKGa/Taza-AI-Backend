
require('./dnsFix');

require('dotenv').config();
const mongoose = require('mongoose');
const Quote = require('../models/Quote');

const seedQuotes = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);

    console.log('🧹 Clearing old quotes...');
    await Quote.deleteMany();

    console.log('📥 Inserting quotes...');
    await Quote.insertMany([
      // 🌅 GOOD MORNING (3)
      {
        category: 'GOOD_MORNING',
        textHindi: 'सुप्रभात! आपका दिन मंगलमय हो',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968633/3_cxvagp.jpg',
      },
      {
        category: 'GOOD_MORNING',
        textHindi: 'नई सुबह, नई उम्मीदें',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968632/4_vhp5pz.jpg',
      },
      {
        category: 'GOOD_MORNING',
        textHindi: 'हर सुबह एक नया अवसर लाती है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968632/6_hsnbil.jpg',
      },

      // 💪 MOTIVATIONAL (3)
      {
        category: 'MOTIVATIONAL',
        textHindi: 'संघर्ष ही सफलता की कुंजी है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968795/6_eb9mxj.jpg',
      },
      {
        category: 'MOTIVATIONAL',
        textHindi: 'हार मानना विकल्प नहीं है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968796/8_hn4f3l.jpg',
      },
      {
        category: 'MOTIVATIONAL',
        textHindi: 'मेहनत कभी बेकार नहीं जाती',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968794/7_xvl35e.jpg',
      },

      // ✍️ SHAYARI (3)
      {
        category: 'SHAYARI',
        textHindi: 'हर लम्हा खूबसूरत है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968870/11_y0rsov.jpg',
      },
      {
        category: 'SHAYARI',
        textHindi: 'खामोशी भी बहुत कुछ कह जाती है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968868/12_ty9du1.jpg',
      },
      {
        category: 'SHAYARI',
        textHindi: 'कुछ बातें अधूरी ही अच्छी लगती हैं',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968868/10_jfp7pj.jpg',
      },

      // 🛕 RELIGIOUS (2)
      {
        category: 'RELIGIOUS',
        textHindi: 'ईश्वर पर विश्वास रखो, सब अच्छा होगा',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968927/20_xgktln.jpg',
      },
      {
        category: 'RELIGIOUS',
        textHindi: 'श्रद्धा में ही शक्ति है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968925/19_wraelc.jpg',
      },

      // ❤️ LOVE (2)
      {
        category: 'LOVE',
        textHindi: 'प्यार हर दर्द की दवा है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968969/18_uqkbuz.jpg',
      },
      {
        category: 'LOVE',
        textHindi: 'सच्चा प्यार कभी खत्म नहीं होता',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769968968/17_oopyrx.jpg',
      },

      // 🎉 FESTIVAL (2)
      {
        category: 'FESTIVAL',
        textHindi: 'त्योहार खुशियों का संदेश लाते हैं',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769969012/18_fek7wp.jpg',
      },
      {
        category: 'FESTIVAL',
        textHindi: 'हर त्योहार नई उमंग लाता है',
        templateImageUrl:
          'https://res.cloudinary.com/dhg6zx0nd/image/upload/v1769969010/9_wlrm7w.jpg',
      },
    ]);

    console.log('✅ 15 Quotes seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding quotes:', error);
    process.exit(1);
  }
};

seedQuotes();
