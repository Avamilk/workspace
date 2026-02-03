import chromadb

# Connect to ChromaDB
client = chromadb.HttpClient(host="localhost", port=8000)

# Get collection
collection = client.get_collection("gotchi_memories")

print(f"Memories in ChromaDB: {collection.count()}")

# Test query
results = collection.query(
    query_texts=["How do I fix Notion SDK errors"],
    n_results=2
)
print(f"Query test: Found {len(results['ids'][0])} relevant memories")
for i, doc in enumerate(results['documents'][0]):
    print(f"  {i+1}. {doc[:80]}...")
