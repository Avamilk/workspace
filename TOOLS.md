# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Notion Integration

**API Key**: `ntn_Bf4634339116rYJKfbeLdlUzUcfKMArRa7PA6BSeNzR4tJ`
**Email**: noahmrage@gmail.com

### Commands I can run:
- Test connection to Notion
- List your databases
- Create pages
- Add entries to databases
- Query/search your data

### Usage:
Just ask me to:
- "Save this to Notion"
- "Show my Notion databases"
- "Create a page about [topic]"
- "Add this to my [database]"

---

## Moonshot (Kimi) API

**API Key Location:** `.env.moonshot` (workspace root)
**Base URL:** `https://api.moonshot.cn/v1`
**Default Model:** `moonshot-v1-8k`

### Pricing (as of Feb 2026):
- Input: ¥0.006 / 1K tokens (~$0.0008)
- Output: ¥0.006 / 1K tokens (~$0.0008)
- Context: Up to 2M tokens

### Usage:
```typescript
const kimi = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.ai/v1',
})
```

---

## Gotchi's Brain (Personal Knowledge Base) v2.0

**Hybrid System: File Brain + Vector Brain**

### Layer 1: File Brain (Human-Readable)
**Location:** `brain/`
- `ideas.md` — Creative ideas, hypotheses
- `learnings.md` — Technical lessons, mistakes
- `todos.md` — Personal goals (not project tasks)
- `context.md` — Current session context

### Layer 2: Vector Brain (AI-Searchable)
**Location:** `localhost:8000` (ChromaDB)
- Collection: `gotchi_memories`
- Embedding: `all-MiniLM-L6-v2`
- API: `http://localhost:8000/api/v1/collections/gotchi_memories`

### When to Use Which:
| Situation | Action |
|-----------|--------|
| User asks "what did we do last week?" | Query ChromaDB semantic search |
| Need exact code/command from past | Read learnings.md directly |
| End of session summary | Write to BOTH file and ChromaDB |
| Complex query with vague keywords | ChromaDB semantic search first |

### ChromaDB Operations:
```bash
# ADD memory
curl -X POST http://localhost:8000/api/v1/collections/gotchi_memories/add \
  -H "Content-Type: application/json" \
  -d '{"ids":["mem_001"],"documents":["Your memory"],"metadatas":[{"type":"learning","date":"2026-02-03","project":"fpl"}]}'

# QUERY memory
curl -X POST http://localhost:8000/api/v1/collections/gotchi_memories/query \
  -H "Content-Type: application/json" \
  -d '{"query_texts":["how to fix api errors"],"n_results":5}'
```

### Session Routines:
- **Start:** Read context.md + Query ChromaDB "What projects are we working on?"
- **End:** Summarize → Append to learnings.md + Add to ChromaDB
- **Compression:** If any file >100 lines, archive old content

---

## Obsidian Vault (Shared with Bror)

**Location:** `C:\Users\noahm\Documents\Obsidian Vault\GotchiBrain\`

### Vault Structure:
- `README.md` — Overview and workflow
- `01-Inbox.md` — Quick captures (you write here)
- `02-Projects.md` — Active projects
- `03-Resources.md` — Reference materials
- `04-Archive.md` — Completed projects
- `05-Gotchi.md` — AI-generated insights

### How I Connect:
- I read/write Markdown files directly
- Changes appear instantly in Obsidian
- No sync needed — same filesystem

### Commands I can run:
- "Read my Obsidian vault" — Load all notes
- "Add this to my Inbox" — Append to 01-Inbox
- "Update Projects page" — Modify 02-Projects
- "What did I write about [topic]?" — Search vault

---

Add whatever helps you do your job. This is your cheat sheet.
