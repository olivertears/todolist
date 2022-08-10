# Innowise Lab Internship: Level 1: Clever to-do list
##Task
- [Requirements](https://docs.google.com/document/d/1heFuihWrsw14bCpUdr6fla9ysqE6IrsobSMKAOpBiKA/edit)
- [Deployment](https://todolist-olivertears.vercel.app/)
## How to run the app
1. Clone the repository to your local machine
2. Run "cd todolist" command to move into the project directory
3. Run "npm i" command to install all the dependencies
4. Switch to the dev branch if you're planning to change app
5. Run "npm start" command to run the app in your browser
### Additional scripts
- npm run lint (Simply checks the code for linting errors, doesn't fix anything)
- npm run lint:fix (fixes possible linting errors)
### How to create git hooks
- Run npm run prepare
- Add a hook, e.g. npx husky add .husky/pre-commit "npm lint" (Will run npm test before making a commit)
- For more information, visit [husky npm page](https://www.npmjs.com/package/husky)
## Database snapshot
There is a user collection in Firestore where for each user the task collection is created. Inside each of the task collections the user tasks are stored as an array of documents.
- Each task has the following structure:
  - date: string
  - description: string
  - done: boolean
  - task: string
  - uid: string
- There is another storage designed for authentication only. Firebase creates a new user doc in there when the user is signing up.
## Application stack
- React, React Router
- Firebase
- TypeScript
- Redux (Thunk)
- Sass
## Folder structure
- Project boilerplate was generated via create-react-app --template typescript
- You can find HTML in public folder
- React router pages can be found in src/pages
- Regular components which are not pages themselves can be found in src/components
- Redux store can be found in src/store
- Utils using to handle the date are located in src/utils
- Custom hooks used across the app can be found in src/hooks
- Styles structure is created in src/styles folder + you can find module.scss file in the same folder with the component is related to