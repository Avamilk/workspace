# FPL App Design V3 — Digital Flight Board

## Inspiration Sources

### 1. Solari Split-Flap Display
- Mechanical rotating letter/number panels
- Classic airport/train station departure boards
- Satisfying flip animation when changing
- Each character on individual flap

### 2. Modern FIDS (Flight Information Display Systems)
- LED dot-matrix aesthetic
- High contrast black background
- Amber/orange or green phosphor text
- Grid-based layout

### 3. Cyberpunk Neon Aesthetic
- Glowing green text (#00ff41, #39ff14)
- Scan lines and subtle CRT effects
- Dark backgrounds with neon accents
- Grid overlays

### 4. Contemporary Dark Apps
- High information density
- Clear hierarchy
- Animated micro-interactions
- Smooth state transitions

---

## Design System

### Color Palette

#### Primary Neon
```
--neon-green: #39ff14
--neon-green-dim: #2dd412
--neon-green-glow: rgba(57, 255, 20, 0.5)
--neon-amber: #ffb000
--neon-amber-dim: #cc8d00
```

#### Dark Backgrounds
```
--board-black: #0a0a0a
--board-dark: #111111
--board-panel: #1a1a1a
--board-grid: rgba(255, 255, 255, 0.03)
```

#### Text
```
--text-bright: #ffffff
--text-neon: #39ff14
--text-dim: rgba(255, 255, 255, 0.6)
--text-dark: rgba(0, 0, 0, 0.8)
```

#### Accents
```
--status-ontime: #39ff14
--status-delayed: #ffb000
--status-boarding: #00d4ff
--status-cancelled: #ff3333
```

---

## Typography

### Fonts
- **Display/Flaps:** 'JetBrains Mono' or 'Roboto Mono' — monospace for alignment
- **Headers:** 'Inter' or 'SF Pro Display' — clean sans-serif
- **Data:** Monospace consistently for numbers

### Text Styles
```css
/* Flight Board Header */
.board-header {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
}

/* Flight Data */
.flight-data {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 16px;
  color: #39ff14;
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
}

/* Large Numbers (Scores) */
.score-display {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 48px;
  color: #39ff14;
  text-shadow: 
    0 0 10px rgba(57, 255, 20, 0.8),
    0 0 20px rgba(57, 255, 20, 0.4),
    0 0 40px rgba(57, 255, 20, 0.2);
}
```

---

## Components

### 1. Split-Flap Display

#### Visual Design
- Individual character cells
- 3D depth with shading
- Horizontal split line in middle
- Slight shadow for depth
- Black background with green text

#### Animation
```css
@keyframes flip {
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-90deg); }
  100% { transform: rotateX(0deg); }
}

.flip-character {
  animation: flip 0.3s ease-in-out;
}
```

### 2. Flight Information Row

#### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [GATE]  [DESTINATION]              [TIME]     [STATUS]    │
│   GW24   PREMIER LEAGUE              45 PTS    ON TIME     │
└─────────────────────────────────────────────────────────────┘
```

#### Visual Treatment
- Full-width row
- Subtle bottom border
- Hover: slight brightness increase
- Status: colored badge with glow

### 3. Scoreboard Display

#### Layout
```
┌────────────────────────────────────────┐
│  OVERALL RANK                          │
│                                        │
│    ┌──┬──┬──┬──┬──┬──┐                 │
│    │ 1│ 2│ 5│ 4│ 3│ 2│                 │
│    └──┴──┴──┴──┴──┴──┘                 │
│                                        │
│    #125,432                           │
└────────────────────────────────────────┘
```

### 4. Neon Button

#### Visual
```css
.neon-button {
  background: transparent;
  border: 2px solid #39ff14;
  color: #39ff14;
  box-shadow: 
    0 0 10px rgba(57, 255, 20, 0.3),
    inset 0 0 10px rgba(57, 255, 20, 0.1);
  text-shadow: 0 0 5px rgba(57, 255, 20, 0.5);
}

.neon-button:hover {
  background: rgba(57, 255, 20, 0.1);
  box-shadow: 
    0 0 20px rgba(57, 255, 20, 0.5),
    inset 0 0 20px rgba(57, 255, 20, 0.2);
}
```

### 5. Player Card (Flight Style)

#### Layout
```
┌─────────────────────────────────────────────┐
│  [POS]  PLAYER NAME              PRICE   XP │
│   FWD   E. HAALAND               £14.0m 8.5 │
│   🏆    MAN CITY vs ARS (H)                 │
└─────────────────────────────────────────────┘
```

#### Colors by Position
- GK: Amber (#ffb000)
- DEF: Blue (#00d4ff)
- MID: Green (#39ff14)
- FWD: Red (#ff3333)

---

## Page Layout

### Header (Flight Board Style)
```
┌──────────────────────────────────────────────────────────────┐
│  FPL PRO                    GW 24        [CONNECT TEAM]      │
│  ───────                                                  │
└──────────────────────────────────────────────────────────────┘
```

### Main Dashboard
```
┌──────────────────────────────────────────────────────────────┐
│  LIVE DASHBOARD                                              │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │ GW POINTS           │  │ OVERALL RANK        │           │
│  │                     │  │                     │           │
│  │     [ 4 ][ 5 ]      │  │  [ 1 ][ 2 ][ 5 ]    │           │
│  │                     │  │  [ 4 ][ 3 ][ 2 ]    │           │
│  │       45 pts        │  │                     │           │
│  └─────────────────────┘  │    #125,432         │           │
│                           └─────────────────────┘           │
├──────────────────────────────────────────────────────────────┤
│  QUICK ACTIONS                                               │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐│
│  │ GATE   DESTINATION              TIME       STATUS        ││
│  │ ──────────────────────────────────────────────────────── ││
│  │ A1     AI CAPTAIN PICK          NOW        ON TIME  🟢   ││
│  │ A2     TRANSFER OPTIMIZER       12:45      BOARDING 🟡   ││
│  │ A3     SPY HUB                  15:20      ON TIME  🟢   ││
│  └──────────────────────────────────────────────────────────┘│
├──────────────────────────────────────────────────────────────┤
│  MY TEAM                              FORMATION: 4-3-3      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌──────────┐                              │
│                    │  [GKP]   │                              │
│                    └──────────┘                              │
│          ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│          │  [DEF]   │  │  [DEF]   │  │  [DEF]   │           │
│          └──────────┘  └──────────┘  └──────────┘           │
│          ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│          │  [MID]   │  │  [MID] ★ │  │  [MID]   │           │
│          └──────────┘  └──────────┘  └──────────┘           │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│   │  [FWD]   │  │  [FWD]   │  │  [FWD]   │                  │
│   └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│   [VIEW FULL TEAM →]                                         │
└──────────────────────────────────────────────────────────────┘
```

### Bottom Navigation
```
┌──────────────────────────────────────────────────────────────┐
│  [TEAM]  [LEAGUES]  [TRANSFERS]  [AI]                        │
│   🟢                                                    │
└──────────────────────────────────────────────────────────────┘
```

---

## Animations & Effects

### 1. Flip Animation
- Duration: 300ms
- Easing: ease-in-out
- 3D rotation on X-axis
- Shadow during flip

### 2. Neon Glow Pulse
```css
@keyframes neon-pulse {
  0%, 100% { 
    text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
  }
  50% { 
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
  }
}
```

### 3. Scan Line Effect (Subtle)
```css
background: linear-gradient(
  to bottom,
  transparent 50%,
  rgba(0, 0, 0, 0.1) 50%
);
background-size: 100% 4px;
```

### 4. Cursor Blink
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

---

## Implementation Notes

### Tech Stack
- **Framework:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS with custom animations
- **Animations:** Framer Motion for complex flips
- **Fonts:** JetBrains Mono + Inter

### Key Libraries
- `framer-motion` — Flip animations
- `react-flip-toolkit` — Layout animations
- Custom CSS — Neon glows, scan lines

### Performance
- Use `will-change: transform` on flip elements
- Limit animations to visible elements
- Debounce rapid updates
- Use CSS containment

---

## Reference Images (Mental Model)

### Solari Board
- https://upload.wikimedia.org/wikipedia/commons/thumb/Solari_board.jpg
- Mechanical split-flap characters
- Click-clack sound (optional visual)

### Airport FIDS
- https://example.com/airport-display.jpg
- LED dot matrix aesthetic
- Grid layout with clear hierarchy

### Cyberpunk UI
- https://example.com/cyberpunk-ui.jpg
- Neon green on black
- CRT scan lines
- Grid overlays

---

## Deliverables

1. **globals.css** — Complete design system
2. **SplitFlap.tsx** — Character animation component
3. **FlightBoard.tsx** — Flight row component
4. **ScoreBoard.tsx** — Large number display
5. **page.tsx** — Full dashboard with all components

---

*Design V3 - Flight Board Edition*
