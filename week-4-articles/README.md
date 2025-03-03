# week-1-demo-code-counter

## About

This project contains a article app demonstrating how to make API requests inside a Vue app.

This project needs the API to be running at the same time (read the README) [https://github.com/danpaul/web_development_2_api_boilerplate](https://github.com/danpaul/web_development_2_api_boilerplate)

After the API is up and running, run the following to get started:

`npm install`

`npm run dev`

Important files related to API requests:

- `src/components/ArticleTable.vue` - display the articles
- `src/components/ArticleCreate.vue` - create articles
- `src/components/ArticleEdit.vue` - edit articles
- `src/components/ArticleForm.vue` - general component used for creating and editing articles

There are some refactored components that better handle loading, success and error states for article updates. You can view these by going to `/articles-improved/[article ID]`

These are the main components involved in the refactor:

- `src/components/ArticleUpdateImproved.vue`
- `src/components/Notification.vue`
- `src/components/Loading.vue`
