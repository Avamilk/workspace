# Notion API Configuration

## Credentials
- **API Key**: ntn_Bf4634339116rYJKfbeLdlUzUcfKMArRa7PA6BSeNzR4tJ
- **Email**: noahmrage@gmail.com

## Setup

### 1. Install Notion SDK
```bash
npm install @notionhq/client
```

### 2. Environment Variables
Create `.env.local`:
```
NOTION_API_KEY=ntn_Bf4634339116rYJKfbeLdlUzUcfKMArRa7PA6BSeNzR4tJ
NOTION_USER_EMAIL=noahmrage@gmail.com
```

### 3. Create API Client
```typescript
import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY
})
```

## What do you want to do with Notion?

Options:
1. **Sync FPL team data** to a Notion database
2. **Create game week notes** in Notion
3. **Track player watchlist** in Notion
4. **Build a dashboard** in Notion
5. **Something else?**

Let me know and I'll build the integration!
