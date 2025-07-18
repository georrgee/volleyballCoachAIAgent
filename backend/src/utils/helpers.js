exports.categorizeMessage = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('rule') || lowerMessage.includes('regulation')) {
    return 'rules';
  } else if (
    lowerMessage.includes('serve') ||
    lowerMessage.includes('spike') ||
    lowerMessage.includes('block') ||
    lowerMessage.includes('dig') ||
    lowerMessage.includes('set') ||
    lowerMessage.includes('pass')
  ) {
    return 'techniques';
  } else if (
    lowerMessage.includes('strategy') ||
    lowerMessage.includes('tactic') ||
    lowerMessage.includes('formation') ||
    lowerMessage.includes('rotation')
  ) {
    return 'strategy';
  } else if (
    lowerMessage.includes('drill') ||
    lowerMessage.includes('training') ||
    lowerMessage.includes('practice') ||
    lowerMessage.includes('exercise')
  ) {
    return 'training';
  } else if (
    lowerMessage.includes('setter') ||
    lowerMessage.includes('libero') ||
    lowerMessage.includes('hitter') ||
    lowerMessage.includes('blocker') ||
    lowerMessage.includes('position')
  ) {
    return 'position-specific';
  }

  return 'general';
};