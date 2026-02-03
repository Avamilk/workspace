# FPL Retro App — Design System

> A comprehensive UI specification for the FPL companion app  
> **Theme:** Cyberpunk × Honey Gold  
> **Stack:** Next.js 16 + Tailwind CSS v4 + Zustand  

---

## 1. Design Tokens

### Color Palette

```css
/* Primary - Honey Gold */
--gold-50: #FFFBEB;
--gold-100: #FEF3C7;
--gold-200: #FDE68A;
--gold-300: #FCD34D;
--gold-400: #FBBF24;
--gold-500: #FFD700;  /* Primary Gold */
--gold-600: #D97706;
--gold-700: #B45309;
--gold-800: #92400E;
--gold-900: #78350F;

/* Cyberpunk Dark */
--dark-900: #0A0A0F;  /* Deep background */
--dark-800: #12121A;  /* Card background */
--dark-700: #1A1A24;  /* Elevated surfaces */
--dark-600: #252533;  /* Borders, dividers */
--dark-500: #3A3A4A;  /* Disabled states */

/* Accent Colors */
--accent-cyan: #00F0FF;
--accent-pink: #FF00A0;
--accent-purple: #8B5CF6;
--accent-green: #10B981;  /* Success */
--accent-red: #EF4444;    /* Danger */
--accent-orange: #F59E0B; /* Warning */
```

### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Type Scale */
--text-xs: 0.75rem;     /* 12px - Captions */
--text-sm: 0.875rem;    /* 14px - Secondary text */
--text-base: 1rem;      /* 16px - Body */
--text-lg: 1.125rem;    /* 18px - Lead text */
--text-xl: 1.25rem;     /* 20px - Card titles */
--text-2xl: 1.5rem;     /* 24px - Section headers */
--text-3xl: 1.875rem;   /* 30px - Page titles */
--text-4xl: 2.25rem;    /* 36px - Hero numbers */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius

```css
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;    /* 12px - Cards */
--radius-xl: 1rem;       /* 16px - Large cards */
--radius-2xl: 1.5rem;    /* 24px - Modals */
--radius-full: 9999px;   /* Pills, circles */
```

### Shadows & Glows

```css
/* Elevation */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);

/* Glow Effects */
--glow-gold: 0 0 20px rgba(255, 215, 0, 0.3);
--glow-gold-lg: 0 0 40px rgba(255, 215, 0, 0.4);
--glow-cyan: 0 0 20px rgba(0, 240, 255, 0.3);
--glow-pink: 0 0 20px rgba(255, 0, 160, 0.3);
```

---

## 2. Component Library

### Buttons

#### Primary Button (Gold)
```tsx
<button className="
  relative px-6 py-3
  bg-gradient-to-r from-yellow-500 to-yellow-400
  text-dark-900 font-semibold
  rounded-lg
  shadow-lg shadow-yellow-500/20
  hover:shadow-yellow-500/40
  hover:scale-[1.02]
  active:scale-[0.98]
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
">
  <span className="relative z-10">Button Text</span>
  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
</button>
```

#### Secondary Button (Dark)
```tsx
<button className="
  px-6 py-3
  bg-dark-700 border border-dark-500
  text-gold-400 font-medium
  rounded-lg
  hover:bg-dark-600 hover:border-gold-500/50
  hover:text-gold-300
  transition-all duration-200
">
  Secondary Action
</button>
```

#### Ghost Button
```tsx
<button className="
  px-4 py-2
  text-dark-300 hover:text-gold-400
  font-medium
  transition-colors duration-200
">
  Ghost Action
</button>
```

#### Icon Button
```tsx
<button className="
  p-3
  bg-dark-700 rounded-full
  text-gold-400
  hover:bg-dark-600 hover:text-gold-300
  hover:shadow-glow-gold
  transition-all duration-200
">
  <Icon className="w-5 h-5" />
</button>
```

### Cards

#### Base Card
```tsx
<div className="
  bg-dark-800
  border border-dark-600
  rounded-xl
  shadow-lg
  overflow-hidden
">
  {/* Card content */}
</div>
```

#### Highlight Card (Gold Border)
```tsx
<div className="
  relative
  bg-dark-800
  rounded-xl
  overflow-hidden
">
  {/* Animated border */}
  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 opacity-20" />
  <div className="absolute inset-[1px] bg-dark-800 rounded-xl" />
  
  {/* Content */}
  <div className="relative p-4">
    {/* Card content */}
  </div>
</div>
```

#### Player Card
```tsx
<div className="
  flex items-center gap-3
  p-3
  bg-dark-700/50
  rounded-lg
  border border-transparent
  hover:border-gold-500/30
  hover:bg-dark-700
  transition-all duration-200
  cursor-pointer
">
  {/* Hexagon avatar */}
  <div className="relative w-12 h-12">
    <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600"
         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
      <img src={photo} className="w-full h-full object-cover p-[2px]" 
           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
    </div>
  </div>
  
  {/* Player info */}
  <div className="flex-1 min-w-0">
    <p className="text-white font-medium truncate">Player Name</p>
    <p className="text-dark-400 text-sm">Team • Position</p>
  </div>
  
  {/* Price/xP */}
  <div className="text-right">
    <p className="text-gold-400 font-bold">£8.5m</p>
    <p className="text-green-400 text-sm">4.2 xP</p>
  </div>
</div>
```

### Stats Display

#### Circular Progress (Player Stats)
```tsx
<div className="relative w-16 h-16">
  <svg className="w-full h-full transform -rotate-90">
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="none" stroke="#252533" strokeWidth="4" />
    {/* Progress circle */}
    <circle 
      cx="32" cy="32" r="28" fill="none" 
      stroke="url(#goldGradient)" strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={`${2 * Math.PI * 28}`}
      strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
      className="transition-all duration-1000 ease-out"
    />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-white font-bold">{value}</span>
  </div>
</div>
```

#### Stat Pill
```tsx
<div className="
  inline-flex items-center gap-2
  px-3 py-1.5
  bg-dark-700
  rounded-full
  border border-dark-500
">
  <span className="text-dark-400 text-xs uppercase tracking-wider">Label</span>
  <span className="text-gold-400 font-semibold">Value</span>
</div>
```

#### Form Indicator (Last 5)
```tsx
<div className="flex gap-1">
  {form.map((result, i) => (
    <div 
      key={i}
      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold
        ${result === 'W' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
          result === 'D' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
          'bg-red-500/20 text-red-400 border border-red-500/30'}`}
    >
      {result}
    </div>
  ))}
</div>
```

### Navigation

#### Bottom Tab Bar
```tsx
<nav className="
  fixed bottom-0 left-0 right-0
  bg-dark-800/95 backdrop-blur-lg
  border-t border-dark-600
  safe-area-pb
">
  <div className="flex justify-around items-center h-16 px-2">
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={`
          flex flex-col items-center justify-center
          flex-1 h-full
          ${activeTab === tab.id ? 'text-gold-400' : 'text-dark-400'}
          transition-colors duration-200
        `}
      >
        <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'drop-shadow-glow-gold' : ''}`} />
        <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
        {activeTab === tab.id && (
          <div className="absolute bottom-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        )}
      </button>
    ))}
  </div>
</nav>
```

#### Top Header
```tsx
<header className="
  sticky top-0 z-50
  bg-dark-900/80 backdrop-blur-md
  border-b border-dark-600
">
  <div className="flex items-center justify-between h-14 px-4">
    {/* Back button */}
    {showBack && (
      <button className="p-2 -ml-2 text-dark-300 hover:text-white transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
    )}
    
    {/* Title */}
    <h1 className="text-lg font-semibold text-white">{title}</h1>
    
    {/* Actions */}
    <div className="flex items-center gap-2">
      {actions}
    </div>
  </div>
</header>
```

### Inputs

#### Text Input
```tsx
<div className="relative">
  <input
    type="text"
    className="
      w-full px-4 py-3
      bg-dark-700
      border border-dark-500 rounded-lg
      text-white placeholder-dark-400
      focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20
      transition-all duration-200
    "
    placeholder="Enter text..."
  />
</div>
```

#### Search Input
```tsx
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
  <input
    type="search"
    className="
      w-full pl-12 pr-4 py-3
      bg-dark-700
      border border-dark-500 rounded-xl
      text-white placeholder-dark-400
      focus:outline-none focus:border-gold-500/50
      transition-all duration-200
    "
    placeholder="Search players..."
  />
</div>
```

### Modals

#### Slide-up Modal (Player Details)
```tsx
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="
          fixed bottom-0 left-0 right-0
          max-h-[85vh]
          bg-dark-800
          rounded-t-3xl
          z-50
          overflow-hidden
        "
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-dark-500 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-40px)] p-4">
          {children}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 3. Page Specifications

### My Team Page

**Layout:**
```
┌─────────────────────────────────────┐
│  Header: "My Team"        [Settings]│
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  Gameweek 24      45 pts   │    │
│  │  Overall Rank: 125,432 ↓   │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │     [Pitch View Toggle]     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │        PITCH (4-3-3)        │    │
│  │                             │    │
│  │         [GKP]               │    │
│  │    [DEF][DEF][DEF][DEF]     │    │
│  │      [MID][MID][MID]        │    │
│  │      [FWD][FWD][FWD]        │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Bench]                            │
│  ┌─────────────────────────────┐    │
│  │ [P1] [P2] [P3] [P4]        │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Transfer Info]                    │
│  ┌─────────────────────────────┐    │
│  │  1 FT  •  £2.1m ITB  •  -4  │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Key Components:**
- **Pitch Background:** Gradient from dark-800 to dark-900 with subtle pitch lines
- **Player Shirts:** Hexagonal avatars with position-based colors
  - GKP: #F59E0B (Orange)
  - DEF: #3B82F6 (Blue)
  - MID: #10B981 (Green)
  - FWD: #EF4444 (Red)
- **Captain Badge:** Gold star overlay on captain's shirt
- **Bench Row:** Horizontal scroll, smaller avatars

**Interactions:**
- Tap player → Open player modal (slide up)
- Long press → Quick actions (captain, sub, transfer)
- Swipe on player → Transfer suggestion overlay

### AI Captain Page

**Layout:**
```
┌─────────────────────────────────────┐
│  Header: "AI Captain"               │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  🤖 AI Analysis Complete   │    │
│  │  Confidence: 87%           │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Recommended Captain]              │
│  ┌─────────────────────────────┐    │
│  │  ┌─────┐                    │    │
│  │  │Photo│  Erling Haaland   │    │
│  │  └─────┘  vs LIV (H)       │    │
│  │           Projected: 8.4   │    │
│  │           Form: W W W W D  │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Alternative Options]              │
│  ┌─────────────────────────────┐    │
│  │  2. Salah      7.2 pts    │    │
│  │  3. Palmer     6.8 pts    │    │
│  │  4. Saka       6.5 pts    │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  [Make Captain]             │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Key Features:**
- Animated confidence ring around AI icon
- Fixture difficulty color coding
- Expandable "Why this pick?" section

### Transfer Optimizer Page

**Layout:**
```
┌─────────────────────────────────────┐
│  Header: "Transfers"      [Auto]    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  Suggested Transfers (1)   │    │
│  │  Expected gain: +4.2 pts   │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Transfer Card]                    │
│  ┌─────────────────────────────┐    │
│  │  OUT: Watkins               │    │
│  │       £8.2m  •  3.2 xP     │    │
│  │       ↓                     │    │
│  │  IN:  Isak                  │    │
│  │       £8.5m  •  5.8 xP     │    │
│  │                             │    │
│  │  [Apply] [Dismiss]          │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Transfer History]                 │
│  ┌─────────────────────────────┐    │
│  │  GW23: Son → Salah (+12)   │    │
│  │  GW22: --                  │    │
│  │  GW21: Nketiah → Watkins   │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Visual Indicators:**
- Green arrow up for transfers in
- Red arrow down for transfers out
- Price change indicators (▲▼)
- xP delta highlighting

### Spy Hub Page

**Layout:**
```
┌─────────────────────────────────────┐
│  Header: "Spy Hub"       [+ Add]    │
├─────────────────────────────────────┤
│  [Search Rivals]                    │
│  ┌─────────────────────────────┐    │
│  │  🔍 Enter manager ID...    │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Tracked Rivals]                   │
│  ┌─────────────────────────────┐    │
│  │  ┌─────┐  Rival #1         │    │
│  │  │     │  52 pts (GW24)   │    │
│  │  └─────┘  OR: 89,231       │    │
│  │  ───────────────────────   │    │
│  │  Differential: Foden (C)   │    │
│  │  You don't have: Salah     │    │
│  └─────────────────────────────┘    │
│                                     │
│  [League Comparison]                │
│  ┌─────────────────────────────┐    │
│  │  Mini League: "The Boys"   │    │
│  │                             │    │
│  │  1. You        1,245 pts   │    │
│  │  2. Mike       1,198 pts   │    │
│  │  3. Sarah      1,156 pts   │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### League Page

**Layout:**
```
┌─────────────────────────────────────┐
│  Header: "Leagues"                  │
├─────────────────────────────────────┤
│  [League Selector ▼]                │
│                                     │
│  [Standings]                        │
│  ┌─────────────────────────────┐    │
│  │  #  Manager       GW  Total │    │
│  │  ─────────────────────────  │    │
│  │  1  🥇 You       45  1245  │    │
│  │  2  🥈 Mike      38  1198  │    │
│  │  3  🥉 Sarah     52  1156  │    │
│  │  4     Tom       41  1142  │    │
│  │  5     Alex      33  1089  │    │
│  └─────────────────────────────┘    │
│                                     │
│  [This Week's High Scorer]          │
│  ┌─────────────────────────────┐    │
│  │  Sarah - 52 points          │    │
│  │  Captain: Haaland (16)      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 4. Animation Guidelines

### Micro-interactions

#### Button Press
```tsx
// Scale down on press
transition: transform 150ms ease-out;
&:active { transform: scale(0.96); }
```

#### Card Hover
```tsx
// Subtle lift and glow
transition: all 200ms ease-out;
&:hover { 
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.15);
}
```

#### Tab Switch
```tsx
// Sliding indicator
<motion.div
  layoutId="activeTab"
  className="absolute bottom-0 h-0.5 bg-gold-400"
  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
/>
```

### Page Transitions

#### Fade + Slide
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
>
  {pageContent}
</motion.div>
```

### Loading States

#### Skeleton Loader
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-dark-600 rounded w-3/4 mb-2" />
  <div className="h-4 bg-dark-600 rounded w-1/2" />
</div>
```

#### Spinner
```tsx
<div className="w-8 h-8 border-2 border-dark-600 border-t-gold-400 rounded-full animate-spin" />
```

---

## 5. Code Patterns

### Tailwind Configuration

```typescript
// tailwind.config.ts additions
{
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0A0A0F',
          800: '#12121A',
          700: '#1A1A24',
          600: '#252533',
          500: '#3A3A4A',
        },
        gold: {
          400: '#FBBF24',
          500: '#FFD700',
        }
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'glow-gold-lg': '0 0 40px rgba(255, 215, 0, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)' },
        },
      },
    },
  },
}
```

### Responsive Breakpoints

```typescript
// Mobile-first approach
const breakpoints = {
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
};

// Usage: className="text-sm md:text-base lg:text-lg"
```

### CSS Variables Setup

```css
/* globals.css */
@layer base {
  :root {
    --background: 240 10% 4%;
    --foreground: 0 0% 100%;
    --card: 240 10% 8%;
    --card-foreground: 0 0% 100%;
    --primary: 48 100% 50%;
    --primary-foreground: 240 10% 4%;
    --muted: 240 10% 15%;
    --muted-foreground: 240 5% 65%;
    --border: 240 10% 20%;
    --input: 240 10% 15%;
    --ring: 48 100% 50%;
  }
}
```

---

## 6. Iconography

### Icon Set: Lucide React

```typescript
import { 
  Home,           // My Team
  Sparkles,       // AI Captain
  ArrowLeftRight, // Transfers
  Eye,            // Spy Hub
  Trophy,         // Leagues
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Minus,
  Star,
  TrendingUp,
  TrendingDown,
  Info,
  MoreHorizontal,
  User,
  Users,
  Target,
  Zap,
  Shield,
  Award,
} from 'lucide-react';
```

### Icon Sizes
- **Navigation:** 24px
- **Buttons:** 20px
- **Inline:** 16px
- **Large displays:** 32px

---

## 7. Accessibility

### Focus States
```css
/* Gold ring on focus */
*:focus-visible {
  outline: 2px solid #FFD700;
  outline-offset: 2px;
}
```

### Touch Targets
- Minimum touch target: 44×44px
- Navigation items: 64px height
- Buttons: 44px minimum height

### Color Contrast
- Gold on dark: 7.2:1 (AAA)
- White on dark-800: 15.3:1 (AAA)
- Dark-400 on dark-800: 4.6:1 (AA)

### Reduced Motion
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Disable animations for users who prefer reduced motion
```

---

## 8. Quick Reference

### Common Class Combinations

| Element | Classes |
|---------|---------|
| Page container | `min-h-screen bg-dark-900 pb-20` |
| Section | `px-4 py-6` |
| Card | `bg-dark-800 border border-dark-600 rounded-xl p-4` |
| Primary button | `bg-gradient-to-r from-yellow-500 to-yellow-400 text-dark-900 font-semibold rounded-lg px-6 py-3` |
| Ghost button | `text-dark-300 hover:text-gold-400 transition-colors` |
| Input | `w-full bg-dark-700 border border-dark-500 rounded-lg px-4 py-3 text-white focus:border-gold-500/50` |
| Heading 1 | `text-2xl font-bold text-white` |
| Heading 2 | `text-lg font-semibold text-white` |
| Body text | `text-base text-dark-200` |
| Muted text | `text-sm text-dark-400` |

### Spacing Patterns
- **Between sections:** 24px (space-6)
- **Between cards:** 16px (space-4)
- **Inside cards:** 16px padding
- **Between list items:** 12px (space-3)
- **Icon + text gap:** 8px (space-2)

---

*Last updated: 2026-02-03*  
*For questions or updates, check the FPL app repository*
