# Ed Wong Website

This project uses Next.js 14 and content is served via strapi.

Goal of the project is to create a clean next js project utilising semantic html to create a fluid, responsive and accessible website showcasing my skills and a brief overview about me.

## Structure

In his project, we put everything inside the app folder. We utilise private folders (prepending folder names with underscores `_`) to group together different useful parts together such as components, utility functions etc.

We use a route group to then keep all of our routable parts of the project for further separation.

## Requirements

To run this project locally, along with a local instance of strapi, ensure you have PostgreSQL installed and running.

## Setting up the project

1. Clone the CMS repository and follow the instructions there to set it up. Ensure the CMS server is running.

2. After starting the strapi server, get an API token with read permissions. Put this in a `.env.local` file (along with the public strapi url). See `.env.example` for an example.

3. Start the dev server with:

```bash
yarn dev
```
