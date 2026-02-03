# Moonshot Usage Tracker

## Files Created

### Core Tracker
- `moonshot_tracker.py` - Main tracking class
- `moonshot_usage.json` - Usage data storage
- `check_usage.py` - Quick usage check
- `generate_report.py` - Generate periodic reports

### Reports
- Daily, weekly, monthly reports saved to Obsidian
- Format: `Moonshot Usage Report YYYY-MM-DD.md`

## Usage

### Quick Check
```bash
python check_usage.py
```

### Generate Report
```bash
# Daily report
python generate_report.py daily

# Weekly report
python generate_report.py weekly

# Monthly report
python generate_report.py monthly
```

## Current Stats (2026-02-03)

| Metric | Value |
|--------|-------|
| Sessions | 1 |
| Tokens | 229,000 |
| Cost | **$0.1832 USD** |

## Pricing

- **Rate:** $0.0008 per 1K tokens
- **Model:** moonshot/kimi-k2.5
- **Context:** Up to 2M tokens

## Automated Reports

Set up cron job for daily Telegram reports:
```bash
# Daily at 9am
0 9 * * * cd ~/.openclaw/workspace && python generate_report.py daily

# Weekly on Sundays
0 10 * * 0 cd ~/.openclaw/workspace && python generate_report.py weekly
```
