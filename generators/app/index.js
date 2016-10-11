'use strict';
var path = require('path');

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _  = require('lodash');

function makeGeneratorName(name) {
  return _.kebabCase(name);
}

module.exports = yeoman.Base.extend({

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Bonjour! Let\'s create an ' + chalk.red('event function') + ' shall we...'
    ));

    var prompts = [{
      type: 'input',
      name: 'functionName',
      message: 'What would you like to call your function?',
      default: makeGeneratorName(path.basename(process.cwd()))
    },{
      type: 'list',
      name: 'privicy',
      message: 'Should the repositories be public or private (preferably they should be public)?',
      choices: ['public', 'private']
    },{
      type: 'input',
      name: 'pubsubTopic',
      message: 'Which Pub/Sub topic would you like to subscribe to?'
    },{
      type: 'input',
      name: 'numInstances',
      message: 'How many instances of this function would you like to run at once?',
      default: 1
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  default: function() {
    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        cli: false,
        name: this.props.functionName,
        gulp: false,
        license: false,
        travis: false,
        coveralls: false,
        githubAccount: 'ortoo'
      }
    }, {
      local: require('generator-node').app
    });
  },

  writing: function () {
    ['.dockerignore', '.eslintrc', 'lib/index.js'].forEach((fname) => {
      this.fs.copy(
        this.templatePath(fname),
        this.destinationPath(fname)
      );
    });

    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      {
        private: this.props.privicy === 'private'
      }
    );
  },

  install: function () {
    this.installDependencies({bower: false});
  },

  end: function() {
    this.log('Done. To link everything up please go and type ' +
      chalk.green(`ortoo create ${this.props.privicy} event-function ${this.props.functionName} on ${this.props.pubsubTopic} with ${this.props.numInstances} instances`) +
      ' in the #builds-and-deploys channel in slack.'
    );
  }
});
