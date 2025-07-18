module.exports = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_MODEL || 'gpt-4',
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000,
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
  presencePenalty: 0.1,
  frequencyPenalty: 0.1
};