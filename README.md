Tiger API v3

Unified Backend for Tiger Prompts, Tiger Compose, and Tiger Tools Extensions

Tiger API v3 is a production-grade backend powering the entire Tiger Tools ecosystem — including Tiger Prompts, Tiger Compose, Chrome/Edge extensions, and all future Tiger automation products.

It handles authentication, billing, AI execution, usage limits, and secure API access in one scalable platform.

--
🚀 Core Features
✅ AI Routing Layer

Tiger Prompts (/prompts/run)

Tiger Compose / TigerFlow (/compose/runFlow)

Chrome/Edge Extension Fast Prompting (/extension/quickPrompt)

Built-in OpenAI integration (chat + token usage tracking)

✅ Stripe-Based Subscription System

Subscription creation via Stripe Checkout

Webhook-driven activation & deactivation

Plan → Features mapping (token limits, access levels)

Automated pro/free/enterprise tiering

✅ Secure User System

Per-user API keys

Firestore-backed user storage

Per-user usage tracking

Monthly reset of token usage

Automatic blocking of inactive or unpaid users

✅ Usage Limits

Monthly token caps per Stripe plan

Real usage metered via OpenAI usage metadata

Centralized enforcement layer

Automatic monthly reset on the 1st

Usage returned in responses for frontend tracking

✅ TigerFlow Pipeline Executor

Sequential, step-based pipeline runner

Supports prompt steps + image steps

Expandable architecture for future automation logic

Total token accounting across steps

✅ Developer Friendly

Plug & play Express API

Clean modular file structure

Environment-driven configuration

Easily deployable (Cloud Run / Render / Vercel / Firebase)

🧱 Tech Stack
Backend Framework

Node.js + Express

AI / LLM

OpenAI API (openai SDK)

Database

Firestore (via Firebase Admin SDK)

Billing

Stripe (Checkout + Webhooks)

Auth

Custom API key auth

Firestore-backed identity + subscription status

Usage enforcement middleware

Core Utility Layers

Token usage metering

Plan → token limit mapping

TigerFlow pipeline executor

Modular controllers + routes

📁 Project Structure
tiger-api-v3/
 ├── server.js
 ├── package.json
 ├── .env.example
 ├── serviceAccount.example.json
 ├── routes/
 ├── controllers/
 ├── utils/
 ├── README.md

Key Folders
/routes

Defines REST endpoints for:

prompts

compose

extension

auth

billing

system

webhooks

/controllers

Business logic for each route.

/utils

OpenAI wrapper

Firebase admin

Stripe client

Usage enforcement

TigerFlow executor

Plan limits

⚙️ Setup Instructions
1. Install Dependencies
npm install

2. Configure Environment Variables

Copy .env.example → .env and fill out:

OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=3000
NODE_ENV=development

3. Add Firebase Admin Credentials

Place your real Firebase service account JSON file as:

/serviceAccount.json


You can download it from Firebase Console → Project Settings → Service Accounts.

4. Start Server
npm start


Server runs at:

http://localhost:3000

🔑 Authentication

All user requests require:

x-api-key: USER_API_KEY


API keys are generated when a user registers:

POST /auth/register
{
  "email": "user@example.com"
}


Response includes:

stripeCustomerId

apiKey (store this on client / extension)

💳 Stripe Billing Flow
1. App registers user → gets Stripe customer + API key

POST /auth/register

2. App redirects user to checkout

POST /billing/checkout

{
  "stripeCustomerId": "cus_123",
  "priceId": "price_ABC"
}

3. Stripe handles payment

User becomes active → webhook updates Firestore.

4. Usage is unlocked

User can now call Tiger endpoints.

📦 Endpoints Overview
🔥 1. Tiger Prompts
POST /prompts/run


Body:

{
  "prompt": "Write a cold email",
  "system": "You are a marketing AI",
  "model": "gpt-4.1-mini"
}


Returns:

{
  "success": true,
  "output": "...",
  "tokens": 42
}

🔥 2. Tiger Compose / TigerFlow
POST /compose/runFlow


Body:

{
  "input": "idea",
  "flow": {
    "steps": [
      { "id": "normalize", "type": "prompt", "template": "Normalize this: {{input}}" },
      { "id": "expand", "type": "prompt", "template": "Expand into 5 ideas: {{input}}" }
    ]
  }
}


Returns:

{
  "success": true,
  "result": {
    "final": "...",
    "trace": [...],
    "totalTokens": 118
  }
}

🔥 3. Chrome Extension Quick Prompt
POST /extension/quickPrompt


Body:

{
  "text": "Summarize this"
}


Fast, optimized for extensions.

🔥 4. System Utilities

Check server health:

GET /system/health


Check config:

GET /system/config

📊 Usage Limits & Token Metering

Each Stripe plan has a token allowance defined in:

utils/planLimits.js


Example:

export const PLAN_LIMITS = {
  "price_free": 5000,
  "price_basic": 100000,
  "price_pro": 1000000,
  "price_enterprise": Infinity
};

How usage works:

Every OpenAI request returns a usage.total_tokens

Tiger API adds that to the user’s monthly bucket

If the user hits their plan limit → 429 error

On the 1st of each month:

usage auto-resets

tokensUsed = 0

Usage is stored in Firestore:

"usage": {
  "tokensUsed": 13122,
  "periodStart": 1730419200000
}

🧩 Integrating With Chrome Extensions

Add API key to requests:

fetch("https://api.tiger.tools/extension/quickPrompt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": userApiKey
  },
  body: JSON.stringify({ text })
});


Tiger API handles:

auth

LLM calls

billing

usage tracking

Your extension stays lightweight.

🏁 Deployment Guide

Tiger API v3 can run on:

Google Cloud Run (recommended)

Render

Railway

Vercel (with API route wrappers)

Firebase Cloud Functions (minor adjustments needed)

Dockerfile can be added for GCR if you want.

🐅 Tiger API v3: The Backend for Your Entire AI Product Line

Tiger API powers:

Tiger Prompts

Tiger Compose

TigerFlow automated pipelines

Chrome & Edge extensions

iOS/Safari extensions (coming soon)

Future Tiger Tools LLM services

This is a full-stack SaaS backend capable of serving thousands of users, millions of tokens, and multiple LLM-driven product experiences.
