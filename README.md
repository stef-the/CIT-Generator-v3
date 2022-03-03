# CIT Generator v3

## Developing

Once you've downloaded the project and have installed the dependencies with `npm i` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the CIT Generator:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Data Folder

The script in the data folder (`static/data/loader.js`) loads all the required data for the website.

From the base of the project, `cd static/data` and then `git clone https://github.com/NotEnoughUpdates/NotEnoughUpdates-REPO`.

To create the data files, `cd static/data` and `node loader`.