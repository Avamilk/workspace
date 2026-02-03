# Notion Integration for Gotchi N

## API Key
- **Token**: ntn_Bf4634339116rYJKfbeLdlUzUcfKMArRa7PA6BSeNzR4tJ
- **User**: noahmrage@gmail.com

## What I can do with your Notion:

1. **Save notes** from our conversations
2. **Create todo lists** and track tasks
3. **Build a knowledge base** of things you tell me
4. **Sync FPL data** (if you want)
5. **Create databases** for projects

## Available Tools:

```typescript
// Test connection
notionTestConnection()

// List your databases
notionListDatabases()

// Create a page
createNotionPage(parentId, title, content)

// Query a database
queryNotionDatabase(databaseId, filters)

// Add to database
addToNotionDatabase(databaseId, properties)
```

## Example uses:
- "Save this to Notion"
- "Create a todo list in Notion"
- "What databases do I have?"
- "Add this player to my FPL tracker"

Ready to use! Tell me what to save or create.
