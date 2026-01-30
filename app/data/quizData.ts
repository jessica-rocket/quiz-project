export type PersonalityType = 'explorer' | 'classic' | 'adventurer' | 'mindful';

export interface Answer {
  text: string;
  emoji: string;
  personality: PersonalityType;
}

export interface Question {
  id: number;
  question: string;
  emoji: string;
  answers: Answer[];
}

export interface Personality {
  id: PersonalityType;
  name: string;
  tagline: string;
  description: string;
  drink: string;
  drinkDescription: string;
  image: string;
  color: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "It's Saturday morning. What's your ideal start?",
    emoji: "🌅",
    answers: [
      { text: "Quiet reading with coffee", emoji: "📚", personality: "mindful" },
      { text: "Hitting my favorite cafe", emoji: "☕", personality: "classic" },
      { text: "Trying a new coffee spot", emoji: "🗺️", personality: "explorer" },
      { text: "Adventure first, caffeine later", emoji: "🏃", personality: "adventurer" },
    ],
  },
  {
    id: 2,
    question: "A friend asks for a coffee recommendation. You suggest...",
    emoji: "💬",
    answers: [
      { text: "The same thing I always get", emoji: "⭐", personality: "classic" },
      { text: "Something new I just discovered", emoji: "🔍", personality: "explorer" },
      { text: "Whatever matches their vibe", emoji: "🎯", personality: "mindful" },
      { text: "The most unique thing on the menu", emoji: "🌟", personality: "adventurer" },
    ],
  },
  {
    id: 3,
    question: "How do you feel about trying new coffee drinks?",
    emoji: "🧪",
    answers: [
      { text: "Love it! Variety is the spice of life", emoji: "🎉", personality: "adventurer" },
      { text: "Occasionally, if it sounds interesting", emoji: "🤔", personality: "explorer" },
      { text: "I like what I like", emoji: "👍", personality: "classic" },
      { text: "Depends on my mood that day", emoji: "🌙", personality: "mindful" },
    ],
  },
  {
    id: 4,
    question: "Your perfect coffee moment is...",
    emoji: "✨",
    answers: [
      { text: "Quiet contemplation alone", emoji: "🧘", personality: "mindful" },
      { text: "Chatting with a friendly barista", emoji: "👋", personality: "explorer" },
      { text: "Comfortable and predictable", emoji: "🛋️", personality: "classic" },
      { text: "Part of an exciting outing", emoji: "🎒", personality: "adventurer" },
    ],
  },
  {
    id: 5,
    question: "When choosing where to sit in a coffee shop, you prefer...",
    emoji: "🪑",
    answers: [
      { text: "My usual spot", emoji: "📍", personality: "classic" },
      { text: "Somewhere with a good view", emoji: "🌳", personality: "mindful" },
      { text: "Near the action", emoji: "👀", personality: "explorer" },
      { text: "Wherever looks fun today", emoji: "🎲", personality: "adventurer" },
    ],
  },
  {
    id: 6,
    question: "What matters most to you in a coffee experience?",
    emoji: "❤️",
    answers: [
      { text: "Consistency and quality", emoji: "💯", personality: "classic" },
      { text: "Discovery and learning", emoji: "📖", personality: "explorer" },
      { text: "Peace and presence", emoji: "🕊️", personality: "mindful" },
      { text: "Fun and spontaneity", emoji: "🎈", personality: "adventurer" },
    ],
  },
];

export const personalities: Record<PersonalityType, Personality> = {
  explorer: {
    id: "explorer",
    name: "Espresso Explorer",
    tagline: "Always curious, never boring",
    description: "You love discovering new flavors and learning about coffee origins. Every cup is an opportunity to explore something new.",
    drink: "Single-Origin Espresso",
    drinkDescription: "Try our rotating single-origin shots to satisfy your curious palate",
    image: "/images/espresso.jpg",
    color: "#e57373",
  },
  classic: {
    id: "classic",
    name: "Classic Comfort",
    tagline: "Reliable, refined, always right",
    description: "You know what you like and you stick with it. There's beauty in consistency and you appreciate quality over novelty.",
    drink: "House Drip Coffee",
    drinkDescription: "Our perfectly balanced house blend, crafted for everyday excellence",
    image: "/images/drip-coffee.jpg",
    color: "#8d6e63",
  },
  adventurer: {
    id: "adventurer",
    name: "Bold Adventurer",
    tagline: "Life's too short for boring coffee",
    description: "You embrace the unexpected and love when coffee surprises you. Seasonal specials and limited editions are your thing.",
    drink: "Caramel Hazelnut Latte",
    drinkDescription: "Our most creative seasonal creation with unexpected flavor twists",
    image: "/images/caramel-latte.jpg",
    color: "#ffb74d",
  },
  mindful: {
    id: "mindful",
    name: "Mindful Sipper",
    tagline: "Present in every pour",
    description: "Coffee is your moment of calm. You savor each sip and appreciate the ritual as much as the drink itself.",
    drink: "Oat Milk Americano",
    drinkDescription: "Smooth, simple, and perfect for savoring slowly",
    image: "/images/oat-milk-americano.jpg",
    color: "#81c784",
  },
};
