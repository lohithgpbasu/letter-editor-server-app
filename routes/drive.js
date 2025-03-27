const express = require('express');
const { google, oauth2Client } = require('../config/google');
const router = express.Router();

router.post('/save', async (req, res) => {
  const { token, content, title } = req.body;
  
  try {
    oauth2Client.setCredentials({ access_token: token });
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const fileMetadata = {
      name: title || 'Untitled Letter',
      mimeType: 'application/vnd.google-apps.document'
    };

    const fileContent = {
      mimeType: 'text/plain',
      body: content
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: fileContent,
      fields: 'id'
    });

    res.json({ fileId: response.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;