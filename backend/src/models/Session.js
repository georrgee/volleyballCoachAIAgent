const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "Volleyball Coaching Session",
    },
    category: {
      type: String,
      enum: [
        "rules",
        "techniques",
        "strategy",
        "training",
        "position-specific",
        "general",
      ],
      default: "general",
    },
    messages: [messageSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate title based on first user message
sessionSchema.pre("save", function (next) {
  if (this.isNew && this.messages.length > 0) {
    const firstUserMessage = this.messages.find((msg) => msg.role === "user");
    if (firstUserMessage) {
      // Generate a short title from the first message
      const title =
        firstUserMessage.content.substring(0, 50) +
        (firstUserMessage.content.length > 50 ? "..." : "");
      this.title = title;
    }
  }
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
