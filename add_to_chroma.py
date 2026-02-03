import chromadb

# Connect to ChromaDB
client = chromadb.HttpClient(host="localhost", port=8000)

# Get collection
collection = client.get_collection("gotchi_memories")

# Add memories (embeddings auto-generated)
collection.upsert(
    ids=["mem_001", "mem_002", "mem_003", "mem_004", "mem_005"],
    documents=[
        "Initialized personal knowledge base with brain directory containing ideas learnings todos and context markdown files",
        "Notion SDK is server-side only in Next.js. SDK imports fail in browser. Solution is to create API routes that use SDK server-side. Client fetches from API routes.",
        "Gotchi Memory Protocol v2.0 uses dual-layer knowledge base. Layer 1 is File Brain with human-readable markdown. Layer 2 is Vector Brain with AI-searchable ChromaDB.",
        "FPL Crisis Mode feature idea: When user about to take -4 hit, show alternative strategies like keeping player vs other options or waiting for press conferences.",
        "Weekly automated FPL newsletter idea: Set up cron job to generate FPL newsletter each Wednesday with price changes form and fixtures analysis."
    ],
    metadatas=[
        {"type": "setup", "date": "2026-02-03", "project": "memory"},
        {"type": "learning", "date": "2026-02-03", "project": "notion"},
        {"type": "learning", "date": "2026-02-03", "project": "memory"},
        {"type": "idea", "date": "2026-02-03", "project": "fpl"},
        {"type": "idea", "date": "2026-02-03", "project": "fpl"}
    ]
)

print(f"✅ Added {collection.count()} memories to ChromaDB!")

# Test query
results = collection.query(
    query_texts=["How do I fix Notion SDK errors"],
    n_results=2
)
print(f"\n🔍 Query test: Found {len(results['ids'][0])} relevant memories")
