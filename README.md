# vue-onboarding

A small Vue 3 app written while learning the framework: router, Pinia store,
composables, slots and the component lifecycle.

Live: https://dmitry-olada.github.io/vue-onboarding/

## Stack

Vue 3 (`<script setup>` + TypeScript), Vue Router, Pinia, Vite, Vitest.

## What is in it

| Page | Shows |
|------|-------|
| `/` | store, async loading, list rendering |
| `/user/:id` | dynamic route, `computed` + `watch`, props/emits, a composable |
| `/lifecycle` | every lifecycle hook, and what `<KeepAlive>` changes |
| `/slots` | default, named and scoped slots |

## Run

```bash
npm install
npm run dev      # http://localhost:5190
npm test         # unit tests
npm run build    # production build
```

Needs Node 20+.
