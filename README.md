# Astro Starter Kit: Basics

## Supabase

### Setup

For local development

```
npx supabase init 
npx supabase start  
```

And visit http://localhost:54323 for the local copy

### Typescript Schema

```bash
npx supabase gen types typescript --project-id "vvojfealyapeoegduhie" --schema public
```

### Link with remote db

```
npx supabase link --project-ref vvojfealyapeoegduhie
npx supabase db pull
npx supabase db reset
```

### Migrations
For migration follow the instructions here:

https://supabase.com/docs/guides/cli/local-development#database-migrations


## Astro

### 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

