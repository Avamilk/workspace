# Gotchi Ideas

Creative ideas, hypotheses, "what ifs"

## [2026-02-03 01:12] [FPL] What if we built a "FPL Crisis Mode"?
When a user is about to take a -4 hit, show them alternative strategies:
- Keep the player vs other options
- Wait for press conferences
- Long-term vs short-term gains
Could prevent rash decisions
Tags: #fpl #feature #crisis-mode

## [2026-02-03 02:02] [FPL] Crisis Mode v1.0 Design Spec
**Trigger Conditions:**
1. User attempts transfer with -4 hit (more transfers than free)
2. User transfers out a player with upcoming good fixtures
3. User transfers in a player with bad fixtures
4. Deadline < 24h and user making emotional transfer

**UI Components:**
1. "Crisis Alert" modal - red/pulsing warning
2. "Alternative Strategies" panel - 3 options with data
3. "Sleep On It" button - delay transfer reminder
4. "Stats Comparison" - current vs proposed player
5. "Fixture Difficulty" visual - next 5 gameweeks

**Prevention Mechanisms:**
1. Force 10-second cooldown before confirming
2. Show opportunity cost (lost points over season)
3. Gamified "Impulse Score" - tracks rash decisions
4. Community data - "X% of managers kept this player"
5. AI prediction - "This transfer may cost you 12 points over 5 GWs"

**Implementation:**
- Hook into transfer confirmation flow
- Check conditions before API call
- Store "crisis interventions" in localStorage
- Track user decision patterns
Tags: #fpl #crisis-mode #design #ui

## [2026-02-03 01:12] [Notion] Weekly automated newsletter
Set up a cron job to generate FPL newsletter each Wednesday:
- Fetch real data from FPL API
- Analyze price changes, form, fixtures
- Auto-publish to Notion
- Send Telegram summary
Tags: #notion #automation #fpl #newsletter
