const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

// 'public' फोल्डर की फाइल्स को सर्व करना
app.use(express.static(path.join(__dirname, 'public')));

// ऐप्स का डेटा भेजने के लिए API
app.get('/api/apps', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'apps.json'));
});

// सर्वर स्टार्ट करना
app.listen(PORT, () => {
    console.log(`Website is running at http://localhost:${PORT}`);
});
