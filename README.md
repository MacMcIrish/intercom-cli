[![Build Status](https://img.shields.io/travis/MacMcIrish/intercom-cli/master.svg)](https://travis-ci.org/MacMcIrish/intercom-cli)
[![Test Coverage](https://img.shields.io/coveralls/MacMcIrish/intercom-cli/master.svg)](https://coveralls.io/github/MacMcIrish/intercom-cli?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/MacMcIrish/intercom-cli.svg)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/MacMcIrish/intercom-cli/status.svg)](https://david-dm.org/MacMcIrish/intercom-cli)
[![NPM](https://img.shields.io/npm/v/intercom-cli.svg)](https://www.npmjs.com/package/intercom-cli)
[![Downloads](https://img.shields.io/npm/dt/intercom-cli.svg)](https://www.npmjs.com/package/intercom-cli)
[![Semantic-Release](https://github.com/simlu/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/simlu/js-gardener/blob/master/assets/badge.svg)](https://github.com/simlu/js-gardener)
[![Gitter](https://github.com/simlu/js-gardener/blob/master/assets/icons/gitter.svg)](https://gitter.im/MacMcIrish/intercom-cli)
# Intercom CLI

Command Line Interface for managing intercom data

## Getting Started


### Prerequisites
Node, NPM, grunt, grunt-cli


### Configuration

Copy `template.yml` to desired environment names eg: `prod.yml` and fill in tokens.

### Installing

Run `$ npm install`

### How to use

Run `node ./intercom-cli.js CMD --env ENVIRONMENT`

Where `CMD` is the command you're trying to execute and `ENVIRONMENT` corresponds to the yml file in the config folder.

### Commands

#### csv

To filter a csv using a different csv run

    $ node ./intercom-cli.js csv filter <fileIn> <fileFilter> <fileOut> <key> [dir]
  
where `fileIn` is the file we want to filter, `fileFilter` is the file we use for filter and `key` is the the column
we want to use for filtering. The result is written to `fileOut`.

#### user

To download all users to `<file>` in `out` directory, run:

    $ node ./intercom-cli.js user fetch <file> [dir] --env ENVIRONMENT

Where `<file>` is relative file path in `dir` directory, where `dir` defaults to the `out` directory.

#### Sync Interest Tags to users
Need input csv `out/users.csv` with columns `user_id`, `interests` where `user_id` contains the user ids and `interests` contains
the relevant, comma separated (no spaces) interests for that user.

Then call

  $ node ./intercom-cli.js user sync-interests users.csv --env ENVIRONMENT
  
This will remove old interests from user, prefixed with `Interest: `, and add the interests provided, again prefixed with `Interest: `.

#### De-Duplicate Users

An issue with intercom is that by using third party software, it's possible to get into a state where users can have the same Intercom ID, with one instance without a User Id and the other with.
Remove these duplicate users by extracting duplicates with `user_id`, deleting extracted users, and updating remaining users with deleted data. 
Then update the remaining user with the deleted users information.

To remove duplicate users, first download all users by exporting straight from intercom into `out/users.csv`. Unfortunately `user fetch` will not fetch duplicate users.

**IMPORTANT**: Change the csv header "User ID" to "user_id".

To extract the duplicate users to `out/duplicates.csv`, run:

    $ node ./intercom-cli.js user extract-duplicates users.csv duplicates.csv

Then to remove duplicate users that have a `user_id` from Intercom run:

    $ node ./intercom-cli.js user delete duplicates.csv user_id --env ENVIRONMENT

Once the users are deleted, update the remaining users to ensure the data is persisted.

    $ node ./intercom-cli.js user update duplicates.csv --env ENVIRONMENT

## Running the tests

To run the tests, run:

    $ npm test

Or to run the tests in debug mode:

    $ npm test -- --debug

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
