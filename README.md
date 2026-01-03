
# Justify API (TicTacTrip Test)

REST API in Node.js + TypeScript that justifies a text to 80 characters per line.

## Features
- `POST /api/token` returns a token from an email
- `POST /api/justify` returns justified text (80 chars/line)
- Token authentication
- Daily rate limit per token: **80,000 words/day**
- Returns **402 Payment Required** when quota is exceeded
- No external library used for the justification algorithm

## Requirements
- Node.js 18+ recommended

## Install

npm install

# justify-api
