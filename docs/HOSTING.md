# Self Hosting

### Prerequisites

- [Node](https://nodejs.org/en/)(>=16.13.0)
- [Yarn](https://classic.yarnpkg.com/lang/en/)(>=1.22.17)

You can fork this repository and host your own instance of temp-drive by performing the following steps:

1. Create a new firebase project
2. Update the client configuration with your firebase project details
3. Setup anonymous authentication within the project
4. Login or create a continuous integration token for the firebase cli
5. Build and Deploy

### 1. Create a new firebase project

temp-drive uses firebase for authentication, analytics, hosting, and data storage. In order to host your own instance of the application you will need to create a project within your account to handle all of these items. Head over to the [Firebase console](https://console.firebase.google.com/) and click "Add Project". Then pick a name and select the default prompts to setup the project.

### 2. Update the client configuration with your firebase project details

Once you have created a new firebase project, you will need to modify the environment files within this repository. Open the firebase configuration file ([src/clients/firebase.ts](src/clients/firebase.ts) and replace the values with the corresponding values from your project settings.
NOTE: You will need to create a new "App" to view the appId and measurementId values.

### 3. Setup anonymous authentication within the project

This project uses [Firebase Authentication](https://firebase.google.com/docs/auth) to authenticate users within the app. Within the Firebase console navigate to **Authentication > Sign-in method** and enable the _anonymous_ login method.

### 4. Login or create a continuous integration token for the firebase cli

The [Firebase CLI](https://firebase.google.com/docs/cli) provides a variety of tools for managing, viewing, and deploying to Firebase projects. You can setup continuous integration (and avoid logging into the cli) by using a CI token with all your commands. To generate the token use the following command and follow the corresponding prompts:

```bash
yarn firebase login:ci
```

There are currently two ways to use this token when running Firebase commands:

1. Store the token as the environment variable FIREBASE_TOKEN and it will automatically be utilized.
2. Run all commands with the --token <token> flag in your CI system.

To revoke access for a specific token use the following command:

```bash
yarn firebase logout --token <token>
```

For the latest documentation, checkout the [Using with CI Systems](https://github.com/firebase/firebase-tools#using-with-ci-systems) section of the official Github page.

### Deploy

```bash
yarn firebase deploy --token $FIREBASE_TOKEN --project $FIREBASE_PROJECT_ID
# FIREBASE_TOKEN=**** yarn firebase deploy
```

**Note**: You will need to manually configure the anonymous Authentication sign-in method for the corresponding project before deploying the first time.
