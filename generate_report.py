#!/usr/bin/env python3
"""
Generate periodic Moonshot usage reports
Usage: python generate_report.py [daily|weekly|monthly]
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from moonshot_tracker import MoonshotUsageTracker

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_report.py [daily|weekly|monthly]")
        sys.exit(1)
    
    report_type = sys.argv[1].lower()
    tracker = MoonshotUsageTracker()
    
    if report_type == "daily":
        days = 1
        report = tracker.get_daily_report(1)
    elif report_type == "weekly":
        days = 7
        report = tracker.get_weekly_report()
    elif report_type == "monthly":
        days = 30
        report = tracker.get_monthly_report()
    else:
        print(f"Unknown report type: {report_type}")
        print("Use: daily, weekly, or monthly")
        sys.exit(1)
    
    # Save to Obsidian
    report_path = tracker.save_report_to_obsidian(days)
    
    # Print summary
    print(f"\n{'='*60}")
    print(f"MOONSHOT {report_type.upper()} USAGE REPORT")
    print(f"{'='*60}")
    print(f"\nPeriod: {report['period']}")
    print(f"Sessions: {report['sessions_count']}")
    print(f"Total Tokens: {report['total_tokens']:,}")
    print(f"Cost: {report['cost_formatted']}")
    print(f"\n{'='*60}")
    print(f"Full report saved to:")
    print(f"  {report_path}")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
