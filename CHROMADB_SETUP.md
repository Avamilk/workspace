# ChromaDB Docker Setup

## Option 1: Run ChromaDB via Docker (Recommended)

```bash
docker run -d \
  --name chromadb \
  -p 8000:8000 \
  -v $(pwd)/chroma_data:/chroma/chroma \
  chromadb/chroma:latest
```

## Option 2: Use File-Based Search (Fallback)

If Docker isn't available, I can:
1. Read all brain/ files
2. Use simple text matching for search
3. Cache results in memory

## Option 3: Install Python 3.11
ChromaDB has better support for Python 3.11 with pre-built wheels.

---

**Current Status:** File Brain operational, Vector Brain pending ChromaDB setup.
