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

...

### How to use

Run `node ./intercom-cli.js CMD --env ENVIRONMENT`

Where `CMD` is the command you're trying to execute and `ENVIRONMENT` corresponds to the yml file in the config folder.

### Commands

#### users

To download all users to `<file>` in `out` directory, run:

    $ node ./intercom-cli.js users fetch <file> [dir] --env ENVIRONMENT

Where `<file>` is relative file path in `dir` directory, where `dir` defaults to the `out` directory.

## Running the tests

    $ npm test -- --debug

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
