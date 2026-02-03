# FPL Retro: Crisis Mode Feature Design

## Overview
**Crisis Mode** is an intelligent intervention system that prevents rash FPL decisions, specifically -4 point hits and emotional transfers.

---

## 🚨 Trigger Conditions

Crisis Mode activates when ANY of these conditions are met:

### 1. **The -4 Hit Warning**
- User attempts more transfers than available free transfers
- Hit value: -4, -8, -12, etc.

### 2. **The Fixture Trap**
- Transferring OUT a player with next 3 fixtures rated "Easy" (difficulty ≤ 2.5)
- Transferring IN a player with next 3 fixtures rated "Hard" (difficulty ≥ 4.0)

### 3. **The Emotional Transfer**
- Player transferred out scored < 2 points last GW
- User makes transfer within 2 hours of deadline
- Pattern: Same player transferred out/in within 3 GWs

### 4. **The Differential Risk**
- Transferring out a top-10 owned player
- For a player with < 5% ownership and no recent form

### 5. **The Captain Killer**
- Transferring out your current captain
- Without having a clear replacement captain

---

## 🎨 UI Components

### Crisis Alert Modal
```
╔══════════════════════════════════════════╗
║ ⚠️ CRISIS MODE ACTIVATED ⚠️              ║
╠══════════════════════════════════════════╣
║                                          ║
║  You're about to take a -4 hit for:     ║
║  ❌ Salah → Son                          ║
║                                          ║
║  🔴 This may cost you 12 points          ║
║     over the next 5 gameweeks           ║
║                                          ║
╚══════════════════════════════════════════╝
```

**Visual Design:**
- Red pulsing border (animation)
- Warning siren sound (optional)
- Full-screen overlay with blur
- Cannot be dismissed immediately (5-second delay)

### Alternative Strategies Panel
Three data-driven alternatives presented:

```
┌─────────────────────────────────────────────────────┐
│ 💡 ALTERNATIVE STRATEGIES                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 1️⃣ KEEP & CAPTAIN                                   │
│    Keep Salah, captain him vs BOU (H)              │
│    Projected: 8-12 points                          │
│    [Select This]                                   │
│                                                     │
│ 2️⃣ WAIT FOR PRESSERS                              │
│    Son has ankle knock - wait for news             │
│    Set reminder for Friday 19:00                   │
│    [Remind Me]                                     │
│                                                     │
│ 3️⃣ DIFFERENTIAL PICK                              │
│    Consider Isak (4% owned, 3G in 2)              │
│    Projected: 6-10 points, better fixtures         │
│    [Compare Stats]                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Stats Comparison View
Side-by-side player comparison:
```
┌─────────────────┬─────────────────┐
│   MO SALAH      │    SON          │
│   (Keep)        │   (Transfer In) │
├─────────────────┼─────────────────┤
│ £12.5m          │ £9.7m           │
│ Form: 8.5       │ Form: 4.2 ⬇️    │
│ Next 3: 🟢🟢🟡  │ Next 3: 🟡🔴🔴  │
│ xG: 4.2         │ xG: 1.8         │
│ %Owned: 45%     │ %Owned: 22%     │
│ Captain %: 35%  │ Captain %: 8%   │
└─────────────────┴─────────────────┘
```

### Fixture Difficulty Visual
Color-coded next 5 gameweeks:
```
Fixtures:
🟢 BOU (H)  🟢 LUT (A)  🟡 WHU (H)  🟢 BRE (A)  🟢 SHU (H)
  Easy        Easy        Medium       Easy        Easy
```

### "Sleep On It" Button
- **Primary CTA** - Largest button
- Saves transfer to "Pending" state
- Sends reminder notification before deadline
- Tracks if user still wants transfer after cooling off

### Impulse Score Badge
```
┌────────────────────┐
│  🧠 Impulse Score  │
│                    │
│  This Season: 3/10 │
│  🟢 Good control   │
│                    │
│  You avoided 12    │
│  potential hits!   │
└────────────────────┘
```

---

## 🛡️ Prevention Mechanisms

### 1. **Forced Cooldown**
- 10-second countdown before "Confirm Transfer" is clickable
- Shows rotating tips: "Did you check the fixtures?"

### 2. **Opportunity Cost Calculator**
```
💰 Opportunity Cost:
   -4 hit this GW
   + Potential captain points lost
   = -8 to -16 projected points
   
   Over 5 GWs: -12 points expected
```

### 3. **Gamified Impulse Score**
- Tracks rash vs. thoughtful decisions
- Rewards: "Cool-headed Manager" badge
- Season-long metric displayed on profile

### 4. **Community Intelligence**
```
👥 Community Data:
   • 78% of top 10k kept Salah this GW
   • 12% transferred him out (avg rank drop: 45k)
   • Only 3% brought in Son
```

### 5. **AI Prediction Engine**
```
🤖 AI Analysis (Kimi-powered):
   "Based on fixture difficulty, form, and 
    historical data, this transfer has a 
    73% chance of losing points over 5 GWs."
```

---

## ⚙️ Implementation Plan

### Phase 1: Core Detection (Week 1)
- [ ] Create `crisisDetector.ts` utility
- [ ] Define trigger conditions
- [ ] Hook into transfer confirmation flow

### Phase 2: UI Components (Week 2)
- [ ] `CrisisModal` component
- [ ] `AlternativeStrategies` panel
- [ ] `StatsComparison` view
- [ ] `FixtureVisualizer` component

### Phase 3: Smart Features (Week 3)
- [ ] AI prediction integration
- [ ] Community data aggregation
- [ ] Impulse scoring system
- [ ] "Sleep On It" reminders

### Phase 4: Polish (Week 4)
- [ ] Animations & sound
- [ ] Settings (toggle Crisis Mode)
- [ ] Analytics dashboard
- [ ] Mobile optimization

---

## 📁 File Structure

```
lib/
  crisis/
    detector.ts          # Trigger logic
    analyzer.ts          # Opportunity cost calc
    scorer.ts            # Impulse score tracking
    
components/
  crisis/
    CrisisModal.tsx      # Main intervention UI
    AlternativePanel.tsx # Strategy options
    StatsComparison.tsx  # Side-by-side view
    FixtureViz.tsx       # Fixture difficulty
    ImpulseBadge.tsx     # Score display
    
store/
  crisisStore.ts         # Zustand for crisis state
```

---

## 🔌 Integration Points

### With Existing Store
```typescript
// teamStore.ts - Add crisis check before transfer
confirmTransfer: () => {
  const crisis = detectCrisis(get().transfers);
  if (crisis.shouldIntervene) {
    set({ crisisAlert: crisis });
    return; // Block transfer, show modal
  }
  // Proceed with transfer...
}
```

### With AI Advisor
- Crisis Mode can call AI for prediction
- "Should I make this transfer?" → AI analysis

### With Notifications
- "Sleep On It" → Push notification before deadline
- Weekly: "You avoided X hits this week!"

---

## 📊 Success Metrics

1. **Intervention Rate** - How often Crisis Mode triggers
2. **Compliance Rate** - Users who change decision after alert
3. **Points Saved** - Estimated points preserved
4. **Impulse Score Distribution** - User behavior trends
5. **User Satisfaction** - "This saved my season" feedback

---

## 🎨 Design Tokens

```css
/* Crisis Mode Colors */
--crisis-red: #ef4444;
--crisis-orange: #f97316;
--crisis-glow: 0 0 20px rgba(239, 68, 68, 0.5);

/* Animations */
@keyframes pulse-warning {
  0%, 100% { border-color: var(--crisis-red); }
  50% { border-color: var(--crisis-orange); }
}

/* Cooldown Timer */
--cooldown-duration: 10s;
```

---

*Designed by Gotchi N - 2026-02-03*
