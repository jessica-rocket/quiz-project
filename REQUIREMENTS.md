# Coffee Personality Quiz - Requirements

## Overview
A fun personality quiz that recommends coffee drinks based on user answers. Users answer 6 questions, and at the end they see which coffee personality they match with - along with a drink recommendation.

---

## Personality → Coffee Pairings

| Personality | Coffee Drink | Tagline |
|-------------|--------------|---------|
| Bold Adventurer | Double Espresso | "You live for intensity" |
| Cozy Classic | Medium Roast Drip | "Comfort in every cup" |
| Sweet Enthusiast | Caramel Latte | "Life's too short for bitter" |
| Health Nut | Oat Milk Americano | "Wellness in every sip" |

---

## Result Display
**Show all percentages** - Users see their full breakdown (e.g., "You're 50% Bold Adventurer, 30% Cozy Classic, 20% Sweet Enthusiast") with all coffee recommendations visible. The top result is featured prominently.

---

## Visual Style
**Playful & Colorful (Style 1)**
- Bright gradient background (purples, pinks)
- Rounded shapes and corners
- Fun, bouncy feel
- White card container with shadow
- Emoji icons on answer options
- Font: Nunito or similar friendly sans-serif

---

## Images
Yes - one image per result:
- `public/images/espresso.jpg` → Bold Adventurer
- `public/images/drip-coffee.jpg` → Cozy Classic
- `public/images/caramel-latte.jpg` → Sweet Enthusiast
- `public/images/oat-milk-americano.jpg` → Health Nut

---

## Icons
Yes - emoji icons next to each answer option for visual polish.

---

## Quiz Questions

### Q1: Pick your ideal Saturday morning:
- 🏃 Up at 6am for a workout → Bold Adventurer
- 📚 Slow morning with a good book → Cozy Classic
- 🥐 Brunch with friends → Sweet Enthusiast
- 🥗 Farmers market for fresh produce → Health Nut

### Q2: Choose a superpower:
- ⚡ Super strength → Bold Adventurer
- 🛡️ Ability to make anyone feel at home → Cozy Classic
- ✨ Make anyone smile instantly → Sweet Enthusiast
- 🧘 Perfect mind-body balance → Health Nut

### Q3: Pick a travel destination:
- 🏔️ Mountain climbing in Patagonia → Bold Adventurer
- 🏡 Cozy cabin in the woods → Cozy Classic
- 🎡 Paris for pastries and sightseeing → Sweet Enthusiast
- 🧘 Wellness retreat in Bali → Health Nut

### Q4: What's your Netflix vibe?
- 🎬 Intense thriller that keeps you on edge → Bold Adventurer
- 📺 Comfort rewatch of a favorite show → Cozy Classic
- 💕 Rom-com with a happy ending → Sweet Enthusiast
- 🌿 Nature documentary → Health Nut

### Q5: Pick a dessert:
- 🌶️ Dark chocolate with chili → Bold Adventurer
- 🍪 Warm chocolate chip cookies → Cozy Classic
- 🧁 Frosted cupcake with sprinkles → Sweet Enthusiast
- 🍓 Fresh fruit with honey → Health Nut

### Q6: How do you handle a stressful day?
- 💪 Hit the gym hard → Bold Adventurer
- 🛁 Hot bath and early bedtime → Cozy Classic
- 📱 Call a friend to vent → Sweet Enthusiast
- 🧘 Meditation and herbal tea → Health Nut

---

## Logic Summary
1. User answers 6 questions
2. Each answer adds a point to one personality type
3. At the end, calculate percentages for each personality
4. Display results with top personality featured, all percentages shown
5. Show coffee recommendation with image for each personality type
