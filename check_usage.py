#!/usr/bin/env python3
"""
Quick Moonshot Usage Check
Run this to get instant usage stats
"""

import json
from pathlib import Path
from datetime import datetime

def quick_check():
    data_file = Path.home() / ".openclaw" / "workspace" / "moonshot_usage.json"
    
    if not data_file.exists():
        print("No usage data found yet!")
        return
    
    with open(data_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Calculate today's usage
    today = datetime.now().strftime("%Y-%m-%d")
    today_sessions = [
        s for s in data['sessions']
        if s['timestamp'].startswith(today)
    ]
    
    today_input = sum(s['input_tokens'] for s in today_sessions)
    today_output = sum(s['output_tokens'] for s in today_sessions)
    today_cost = sum(s['cost_usd'] for s in today_sessions)
    
    print("=" * 50)
    print("MOONSHOT API USAGE REPORT")
    print("=" * 50)
    print()
    print(f"TODAY ({today}):")
    print(f"  Sessions: {len(today_sessions)}")
    print(f"  Tokens: {today_input + today_output:,}")
    print(f"  Cost: ${today_cost:.4f} USD")
    print()
    print("ALL TIME:")
    print(f"  Total Sessions: {len(data['sessions'])}")
    print(f"  Total Tokens: {data['total_input_tokens'] + data['total_output_tokens']:,}")
    print(f"  Total Cost: ${data['total_cost_usd']:.4f} USD")
    print()
    print("=" * 50)
    print(f"Report saved to Obsidian: Moonshot Usage Report {today}.md")
    print("=" * 50)

if __name__ == "__main__":
    quick_check()
