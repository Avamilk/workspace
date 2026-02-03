import chromadb

client = chromadb.HttpClient(host="localhost", port=8000)
collection = client.get_collection("gotchi_memories")

results = collection.query(
    query_texts=["What projects are we working on"],
    n_results=5
)

print("=== ChromaDB Query Results ===")
print(f"Found {len(results['ids'][0])} relevant memories:\n")

for i, (doc, meta) in enumerate(zip(results['documents'][0], results['metadatas'][0])):
    print(f"{i+1}. [{meta['type'].upper()}] {meta.get('project', 'general')}")
    print(f"   {doc}\n")
