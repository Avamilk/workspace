import chromadb
from chromadb.config import Settings
import os

# Create data directory
data_dir = os.path.expanduser("~/.openclaw/workspace/chroma_data")
os.makedirs(data_dir, exist_ok=True)

# Start ChromaDB server
client = chromadb.PersistentClient(
    path=data_dir,
    settings=Settings(
        anonymized_telemetry=False
    )
)

# Create or get collection
collection = client.get_or_create_collection(
    name="gotchi_memories",
    metadata={"description": "Gotchi's vector memory storage"}
)

print("✅ ChromaDB started successfully!")
print(f"📁 Data directory: {data_dir}")
print(f"🧠 Collection: gotchi_memories")
print(f"📊 Documents in collection: {collection.count()}")
