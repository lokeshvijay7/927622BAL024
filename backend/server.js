const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/', stockRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
