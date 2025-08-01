const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY || '84ba0bee1f244231abd03afe7e1d83cb'; // Replace if not using .env

app.use(cors());

app.get('/', (req, res) => {
  res.send('News API Backend is Running');
});

// News API route
app.get('/api/news', async (req, res) => {
  const category = req.query.category || 'general';

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category,
        apiKey: NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
