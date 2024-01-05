const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const vosk = require('vosk');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
const port = 4000;

// Load the Vosk model
const model = new vosk.Model('model');
const sampleRate = 16000;

// Middleware
app.use(cors());
app.use(bodyParser.raw({ type: 'audio/webm', limit: '50mb' }));

// POST endpoint for audio transcription
app.post('/transcribe', (req, res) => {
  const audioData = req.body;
  const webmFileName = `${uuidv4()}.webm`;
  const wavFileName = webmFileName.replace('.webm', '.wav');

  // Save the WebM audio to a file
  fs.writeFileSync(webmFileName, audioData);

  // Convert WebM to WAV using ffmpeg
  exec(`ffmpeg -i ${webmFileName} -ac 1 -ar ${sampleRate} -f wav ${wavFileName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting file: ${error.message}`);
      return res.status(500).send('Error converting audio file');
    }

    // Transcribe the WAV file
    const rec = new vosk.Recognizer({model, sampleRate});
    const stream = fs.createReadStream(wavFileName);
    stream.on('data', (data) => {
      if (!rec.acceptWaveform(data)) {
        // continue processing, as this is not the final result
        console.log('проблема не в стриме')
      }
    });
    stream.on('end', () => {
      const result = rec.finalResult();
      console.log(result);

      // Send the transcription result
      res.json({ text: result.text });

      // Clean up temporary files
      fs.unlinkSync(webmFileName);
      fs.unlinkSync(wavFileName);

      // Destroy the recognizer
      rec.free();
    });
    stream.on('error', (streamError) => {
      console.error(`Stream error: ${streamError.message}`);
      res.status(500).send('Error transcribing audio file');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
