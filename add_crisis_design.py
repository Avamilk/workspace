import chromadb

client = chromadb.HttpClient(host="localhost", port=8000)
collection = client.get_collection("gotchi_memories")

collection.upsert(
    ids=["mem_006"],
    documents=["FPL Crisis Mode feature design v1.0. Triggers on -4 hits, fixture traps, emotional transfers. UI includes Crisis Alert modal with red pulsing border, Alternative Strategies panel with 3 data-driven options, Stats Comparison view, Fixture Difficulty visual, Sleep On It button, and Impulse Score badge. Prevention mechanisms include 10-second forced cooldown, opportunity cost calculator, gamified impulse scoring, community intelligence showing what top managers do, and AI prediction engine. Implementation plan is 4 weeks: core detection, UI components, smart features, polish."],
    metadatas=[{"type": "design", "date": "2026-02-03", "project": "fpl", "feature": "crisis-mode"}]
)

print("Crisis Mode design added to vector memory!")
