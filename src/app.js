const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/user.routes');
const quoteRoutes = require('./routes/quote.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const downloadRoutes = require('./routes/download.routes');
const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
}));






app.use(express.json({ limit: '10mb' }));



app.use('/quotes', quoteRoutes);

app.use('/downloads', downloadRoutes);

app.use('/subscription', subscriptionRoutes);

app.use('/user', userRoutes);

app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running' });
});


app.use(errorHandler);

module.exports = app;
