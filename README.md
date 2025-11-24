# Tiger API v3

Tiger Tools backend for:

- Tiger Prompts (`/prompts/run`)
- Tiger Compose / TigerFlow (`/compose/runFlow`)
- Chrome/Edge Extensions (`/extension/quickPrompt`)

Features:

- OpenAI integration
- Stripe subscriptions
- Stripe webhooks
- Firestore user storage
- Per-user API keys
- Monthly token usage limits per plan

## Quick Start

1. Copy `.env.example` to `.env` and fill in values.
2. Add your Firebase Admin service account JSON as `serviceAccount.json` in project root.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the server:

   ```bash
   npm start
   ```
