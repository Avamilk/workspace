# Google Cloud APIs for FPL App

**Date:** 2026-02-03  
**Purpose:** Enhance FPL Terminal with Google Cloud AI/ML capabilities

---

## Overview

Google Cloud offers several APIs that can significantly enhance the FPL (Fantasy Premier League) app with predictive analytics, automation, and real-time insights.

---

## Recommended APIs

### 1. BigQuery (Data Analytics)

**What it does:**
- Store massive FPL historical data
- Run complex SQL queries for analysis
- **1 TB free queries per month**

**FPL Applications:**
- Historical player performance analysis
- Fixture difficulty calculations
- Price change predictions
- League standings analytics
- Long-term trend analysis

**Implementation:**
```sql
-- Example: Find players with best home form vs top 6 teams
SELECT 
  player_name,
  AVG(points) as avg_points,
  COUNT(*) as games_played
FROM fpl_player_stats
WHERE opponent_rank <= 6 
  AND venue = 'Home'
  AND season = '2024-25'
GROUP BY player_name
ORDER BY avg_points DESC
```

---

### 2. Vertex AI (Machine Learning)

**What it does:**
- Build prediction models
- AutoML for tabular data
- Deploy ML models as APIs

**FPL Applications:**
- **Captain recommendations** (predict highest scorer)
- **Transfer suggestions** (buy/sell timing)
- **Points predictions** for upcoming gameweeks
- **Form analysis** (detect hot streaks early)

**Implementation Ideas:**
- Train model on: player_stats + fixtures + opponent_strength
- Predict: expected_points for next GW
- AutoML trains automatically on your data

---

### 3. Cloud Functions (Serverless)

**What it does:**
- Run code without servers
- Event-driven triggers
- **2 million free invocations/month**

**FPL Applications:**
- Auto-update player stats when FPL API updates
- Send alerts on price changes
- Calculate optimal transfers
- Scheduled jobs (deadline reminders)

**Implementation:**
```javascript
// Trigger: Every hour
// Check FPL API for price changes
// Notify users if their players rising/falling
```

---

### 4. Cloud Scheduler + Pub/Sub

**What it does:**
- Schedule automated tasks
- Trigger workflows at specific times

**FPL Applications:**
- **Deadline reminders** (auto-message before deadline)
- **Daily price updates**
- **Weekly team optimization** runs
- **Gameweek reviews**

**Schedule Examples:**
- Daily at 6 AM: Check price changes
- Fridays at 5 PM: Deadline reminder
- Sunday nights: Gameweek summary

---

### 5. Firebase (Real-time Database)

**What it does:**
- Real-time data sync
- User authentication
- **Free tier available**

**FPL Applications:**
- Live league standings
- User preferences
- Authentication
- Push notifications

---

### 6. Looker Studio (Dashboards)

**What it does:**
- Visual dashboards
- Shareable insights
- **Free**

**FPL Applications:**
- Manager performance dashboards
- League analytics
- Player comparison charts
- Historical trends

---

## Recommended Implementation Stack

| Feature | Google Cloud Service | Free Tier |
|---------|---------------------|-----------|
| Player predictions | **Vertex AI** | Yes |
| Historical data | **BigQuery** | 1TB queries |
| Auto-updates | **Cloud Functions** | 2M calls |
| Deadline alerts | **Cloud Scheduler** | Yes |
| Live leagues | **Firebase** | Yes |
| Visualizations | **Looker Studio** | Yes |

---

## Potential Features to Add

### AI Captain Advisor (Vertex AI)
```
Input: Player stats, fixtures, form, ownership
Output: "Saka: 78% chance of being top captain"
Reasoning: Home vs weak defense, high xG, 80% captained
```

### Price Change Predictions
```
Input: Transfer trends, historical patterns
Alert: "Haaland likely to rise tonight - buy now"
```

### Optimal Transfer Algorithm
```
Input: Your team, budget, fixtures
Output: "Sell Salah → Buy Palmer (+12 expected points)"
```

### Rival Intelligence
```
"Rival captained Haaland 8 weeks straight
If he blanks: you'll gain 15+ ranks"
```

---

## Cost Estimate

With your **$270 Google Cloud credit**:
- **Months 1-3:** Free (credits cover everything)
- **Ongoing:** $20-50/month at scale
- **Startup phase:** $0-10/month

---

## Next Steps

### Priority 1: Captain Predictions
1. Export FPL historical data to BigQuery
2. Train Vertex AI model on player performance
3. Integrate predictions into FPL Terminal

### Priority 2: Automated Alerts
1. Set up Cloud Functions for FPL API monitoring
2. Configure Cloud Scheduler for deadline alerts
3. Add Telegram notifications

### Priority 3: Advanced Analytics
1. Build BigQuery dashboards
2. Add rival analysis features
3. Create transfer recommendation engine

---

## Resources

- **BigQuery:** https://cloud.google.com/bigquery
- **Vertex AI:** https://cloud.google.com/vertex-ai
- **Cloud Functions:** https://cloud.google.com/functions
- **Firebase:** https://firebase.google.com
- **Free tier details:** https://cloud.google.com/free

---

*Saved for future FPL enhancement using $270 Google Cloud credit.*
