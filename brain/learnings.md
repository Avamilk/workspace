# Gotchi Learnings

Technical lessons, mistakes, and solutions.

## [2026-02-03 01:12] [Setup] Initialized personal knowledge base
Created brain/ directory with ideas.md, learnings.md, todos.md, context.md
Tags: #setup #memory #protocol

## [2026-02-03 01:14] [Notion] SDK is server-side only - use API routes for browser
When integrating Notion SDK with Next.js:
- SDK imports fail in browser with "Illegal invocation" error
- Solution: Create API routes (app/api/notion/...) that use SDK server-side
- Client fetches from API routes instead of importing SDK directly
- Pattern: Client → API Route → Notion SDK → Notion API
This applies to any server-only SDK (Stripe, Database ORMs, etc.)
Tags: #notion #nextjs #api-routes #server-client-split

## [2026-02-03 01:16] [Memory] Gotchi Memory Protocol v2.0 - Hybrid Brain System
Now using dual-layer knowledge base:
- Layer 1: File Brain (human-readable markdown at brain/)
  - ideas.md, learnings.md, todos.md, context.md
- Layer 2: Vector Brain (AI-searchable at localhost:8000 ChromaDB)
  - Collection: gotchi_memories
  - Embedding: all-MiniLM-L6-v2
  - Semantic search for complex queries

When to use which:
- Exact code/commands → Read files directly
- Vague queries → ChromaDB semantic search first
- Session summaries → Write to BOTH file and ChromaDB
- User asks "what did we do?" → Query ChromaDB

ChromaDB ops via curl to http://localhost:8000/api/v1/collections/gotchi_memories
Tags: #memory #chromadb #vector-search #ai #protocol

## [2026-02-03 02:08] [AI Stack] Gotchi+Kimi architecture analysis
Intelligence = Base Model × Memory × Tools × Autonomy
- ChatGPT: 0 (stateless)
- Claude: 0.45 (basic memory)
- Devin: 0.28 (expensive, closed)
- Gotchi+Kimi: 0.54 (and growing)

Key insight: Most AI companies bet on bigger models. We built better memory + tools + model. Competitive moat: data ownership, custom hybrid architecture, tool ecosystem, cost control.

Next upgrades for "greatest": vision API, IDE integration (VS Code extension), multi-agent spawning, self-improvement.
Tags: #ai #kimi #architecture #strategy
