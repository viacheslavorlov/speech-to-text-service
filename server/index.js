const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Vosk = require('vosk');

// Создаем экземпляр модели Vosk
const model = new Vosk.Model('model');

// Создаем экземпляр речевого распознавателя
const recognizer = new Vosk.Recognizer({ model: model });

// Настраиваем парсер для аудио данных
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

// Обработчик POST-запроса на распознавание речи
app.post('/recognize', (req, res) => {
  const data = req.body;

  // Декодируем аудио данные
  const buffer = Buffer.from(data, 'base64');
  const audioData = new Uint8Array(buffer);

  // Распознаем речь
  recognizer.acceptWaveform(audioData);
  const result = recognizer.result();

  // Отправляем результат обратно
  res.json(result);
});

// Запускаем сервер на порту 4000
app.listen(4000, () => {
  console.log('Сервер запущен на порту 4000');
});