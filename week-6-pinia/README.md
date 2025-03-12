# week-1-demo-code-counter

## About

This project contains vue code related to the use of Pinia for state management.

This project needs the API to be running at the same time (read the README) [https://github.com/danpaul/web_development_2_api_boilerplate](https://github.com/danpaul/web_development_2_api_boilerplate)

After the API is up and running, run the following to get started:

`npm install`

`npm run dev`

Important files related to Pinia:

- `src/main.js` - handles Pinia setup
- `src/stores/articles.js` - read later article store
- `src/components/ArticleTable.vue` - use of store methods and data
- `src/components/ReadLaterTable.vue` - using the store in a component

Important files related to Pinia and Auth:

- `src/stores/auth.js` - auth sore
- `src/components/Auth.vue` - component to manage login and registration
- `src/main.js` - initialize auth store and user
- `src/App.vue` - dynamically updating navbar menu with login/logout depending on auth store
