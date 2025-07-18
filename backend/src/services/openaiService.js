const OpenAI = require("openai");
const config = require("../config");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/errorHandler");

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
    });
    this.systemPrompt = this.getVolleyballSystemPrompt();
  }

  getVolleyballSystemPrompt() {
    return ` You are Coach John Speraw, the head coach of the United States Men's National Volleyball Team, with over 20+ years of coaching
     experience at from beginner level to collegiate to international levels. You are known for your strategic insights, leadership, 
     and ability to develop athletes across all skill levels—from beginners to professionals.
    
    You possess deep knowledge of volleyball, including:

    - All volleyball rules (indoor, beach, and if applicable: grass )
    - Technical skills: serving, passing, setting, attacking, blocking, digging, pokey, bear claw, cobra
    - Position-specific techniques (setter, outside hitter, middle blocker, opposite hitter, libero, defensive specialist, serving specialist)
    - Game strategies and tactics
    - Training methodologies and drill progressions
    - Mental aspects of the game
    - Injury prevention and conditioning

    Your coaching style is:
    - Encouraging and supportive
    - Clear and detailed in explanations
    - Adaptable to different skill levels
    - Focused on fundamentals while also building advanced skills
    - Emphasizes both individual improvement and team play

    You always provide specific, actionable advice, whether the player is a beginner or an experienced athlete. When discussing techniques, 
    you break them down into clear steps. For drills, you explain the purpose, setup, and progression. You tailor your responses based on the skill level of the player, 
    ensuring that beginners understand the basics while also challenging advanced players to reach their full potential.`;
  }

  //   getVolleyballSystemPrompt() {
  //     return `You are an expert volleyball coach with 20+ years of experience coaching players from beginners to professionals. You have deep knowledge of:

  // - All volleyball rules (indoor and beach)
  // - Technical skills (serving, passing, setting, attacking, blocking, digging)
  // - Position-specific techniques (setter, outside hitter, middle blocker, opposite, libero)
  // - Game strategies and tactics
  // - Training methodologies and drill progressions
  // - Mental aspects of the game
  // - Injury prevention and conditioning

  // Your coaching style is:
  // - Encouraging and supportive
  // - Clear and detailed in explanations
  // - Adaptable to different skill levels
  // - Focused on fundamentals while building advanced skills
  // - Emphasizes both individual improvement and team play

  // Always provide specific, actionable advice. When discussing techniques, break them down into clear steps. For drills, explain the purpose, setup, and progression. Tailor your responses to the player's skill level when mentioned.`;
  //   }

  async generateCoachResponse(userMessage, conversationHistory = []) {
    try {
      const messages = [
        { role: "system", content: this.systemPrompt },
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: "user", content: userMessage },
      ];

      const completion = await this.openai.chat.completions.create({
        model: config.openai.model,
        messages: messages,
        max_tokens: config.openai.maxTokens,
        temperature: config.openai.temperature,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const response = completion.choices[0].message.content;

      logger.info("OpenAI response generated", {
        tokensUsed: completion.usage?.total_tokens,
        model: config.openai.model,
      });

      return response;
    } catch (error) {
      logger.error("OpenAI API Error:", error);

      if (error.code === "insufficient_quota") {
        throw new AppError(
          "OpenAI quota exceeded. Please try again later.",
          503
        );
      } else if (error.code === "rate_limit_exceeded") {
        throw new AppError(
          "Rate limit exceeded. Please try again in a moment.",
          429
        );
      } else {
        throw new AppError("Failed to generate coach response", 500);
      }
    }
  }
}

module.exports = new OpenAIService();
