const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: 'sk-proj-9WFCJvsVBaAobz72VlyKT3BlbkFJID3NnzbJv4Y1lm8clbIp', // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message,
    max_tokens: 150,
  });
  res.json({ response: response.data.choices[0].text.trim() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
y