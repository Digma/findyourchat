# Astro Starter Kit: Basics

# Quickstart
Follow this guide to quickly set up Firebase for your project. For more in-depth instructions, see FIREBASE_SETUP.md.

## Firebase - Obtain Firebase Keys
### Service Account Key

1. Go to the Firebase Console.
2. Navigate to Project settings > Service accounts.
3. Click Generate new private key, then download and secure the JSON file.

### Web App Configuration

1. If you haven't added a web app to Firebase, click the web icon (</>) in Project settings > Your apps to create one.
2. Find your web app and you should see your configuration
3. Copy the configuration object.


## Firebase - Update Configuration Files
Place your keys in the appropriate files:

* .env: Add service account key values from the downloaded JSON.
* src/firebase/client.ts: Insert the web app configuration object.

### Set up .env

Add the appropriate Firebase Env variables. See https://docs.astro.build/en/guides/backend/google-firebase/#creating-the-server-endpoints

## Firebase - Enable Authentication

### Configure Auth Methods

1. In Firebase Console, go to Authentication.
2. Click Get started.
3. Enable your desired sign-in methods and configure each according to Firebase's prompts.

## Supabase

### Setup

For local development

```
npx supabase init 
npx supabase start  
```

And visit http://localhost:54323 for the local copy

### Typescript Schema

Create new table on supabase website and update local schema

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

