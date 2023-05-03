This project is generate when using Nodejs version **16.14.2** and NPM version **7.17.0**

## To start the source please follow

1. Run `pnpm install` for install nodejs libraries and dependencies (# If you don't have pnpm installed, run: npm install -g pnpm)
2. Run `pnpm lint` to fix all eslint error
3. Run `pnpm dev` to start the local server
4. Run `pnpm build` to build the app

**Note**: please check for env file before run

## Source structure

**Common folder** (path: `src\common`): Use for storing layouts, reused components

**Group (Module) folder** (path: example as `src\tracks`): For not businesses not relevevant to each other please seperate it into a group

**Layout folder** (path: example as `src\common\layouts`): Place all the layouts files.

**Style folder** (path: example as `src\common\styles`): Place all the custom css files.

**Module folder** (path: example as `src\common\modules`): Place all the registered plugin

**Util folder** (path: example as `src\common\utils`): Place all the utility function or helper classes that can be used throughout the application.

**Components folder** (path: example as `src\tracks\components`): Contains reusable components that can be used across different parts of an application.

**DTO folder** (path: example as `src\app\users\dtos`): For storing all of the DTO that used to transfer data between components, between the client and server, or between different layers of the application.

**Service folder** (path: example as `src\tracks\services`): For storing all the file that used to communicate with APIs, retrieve data from databases, and handle other data-related tasks.

**Store folder** (path: example as `src\tracks\stores`): Contains all the file that define the application's global state management system.

**Page folder** (path: example as `src\tracks\pages`): Helps to organize the different pages or views of the application into a modular and maintainable structure. Each file in the pages folder corresponds to a unique page or route within the application.
