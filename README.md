# Analysis platform

This application has been created with [create-dm-app](https://github.com/equinor/create-dm-app)

## Getting started

By following these steps, you will have the application up and running locally on your machine.

Requirements:

- [Node 14.0.0](https://nodejs.org/en/) or later (We recommend using the latest LTS version).
- [Docker compose](https://docs.docker.com/compose/)
- [Python](https://www.python.org/) 3.8 or later
- [dm-cli](https://pypi.org/project/dm-cli/0.1.4/) python package


### 1) Start required services
To run the Analysis Platform application locally, you will need an instance of DMSS running locally.

Go to the `dm-app-analysis-platform` folder in a terminal and run the commands:

```bash
docker-compose pull
docker-compose up --build
```

This will start all required services.

To reset the database, open a new terminal window and navigate to the `dm-app-analysis-platform` folder and run the commands:

```bash
docker-compose run --rm dmss reset-app
```
### 2) Install dm-cli

_Note: it is recommended to use a python virtual environment before you install the dm-cli package_

```bash
pip install dm-cli
```

### 4) Upload documents/models to DMSS

Run the following command to upload the documents in the folder my-app/app to DMSS

```bash
dm reset app/
```

You must also upload documents from [dm-job](https://github.com/equinor/dm-job)
```bash
docker-compose run --rm job-api dm -u http://dmss:5000 reset ../app
```


### 5) Create a lookup table in DMSS

In your terminal window, go to the `dm-app-analysis-platform` folder in the terminal and run

```bash
dm create-lookup analysis-platform AnalysisPlatformDS/instances/recipe_links
```

### 6) Start the web application

When inside the `dm-app-analysis-platform` folder in the terminal, run

```bash
yarn install
yarn start
```

or alternatively

```bash
npm install
npm start
```

The web app can now be reached at [http://localhost:3000](http://localhost:3000) in the web browser.
(Remember, you must have the docker-compose services running to use the web application)

## Development tips

### Database setup
Oneliner to get database up and running:
```bash
docker-compose run --rm dmss reset-app && dm reset app && docker-compose run --rm job-api dm -u http://dmss:5000 reset ../app && dm create-lookup analysis-platform AnalysisPlatformDS/instances/recipe_links
```

### Pre commit

In this repo, [pre-commit](https://pre-commit.com/) has been used to ensure consistent code formatting. The pre-commit
hook
will run [prettier](https://prettier.io/) formatting and analyze the JavaScript code using [eslint](https://eslint.org/)
.

To run pre-commit, it needs to be installed on your local machine with

```bash
pip install pre-commit
```

Once installed, pre-commit can be run with:

```bash
pre-commit run --all-files
```
