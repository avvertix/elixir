'use strict';

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = (0, _minimist2.default)(process.argv.slice(2));

/**
 * This object stores all of the various Elixir tasks.
 *
 * @type {Object}
 */
Elixir.mixins = {};

/**
 * Determine if Elixir is in "production" mode.
 */
if (Elixir.inProduction = env.production) {
  process.env.NODE_ENV = 'production';
}

/**
 * Determine if 'gulp watch' is being run.
 */
Elixir.isWatching = function () {
  return env._.indexOf('watch') > -1;
};

/**
 * A logger singleton for use in various tasks.
 *
 * @type {Logger}
 */
Elixir.log = new (require('../Log').default)();

/**
 * Exit Elixir with the given error message.
 *
 * @param  {string} message
 */
Elixir.fail = function (message) {
  return Elixir.log.error(message) && process.exit(1);
};

/**
 * This class determines the proper src and
 * output paths for any given task.
 *
 * @type {GulpPaths}
 */
Elixir.GulpPaths = require('../tasks/GulpPaths').default;

/**
 * The main Elixir configuration object.
 *
 * @type {object}
 */
Elixir.config = require('../Config').default;

/**
 * Easily access all Gulp-specific plugins.
 *
 * @type {object}
 */
Elixir.Plugins = require('gulp-load-plugins')();

/**
 * Each Gulp task is stored as a Task instance.
 *
 * @type {Task}
 */
Elixir.Task = require('../tasks/Task').default;

/**
 * The main collection of Elixir tasks.
 *
 * @type {TaskCollection}
 */
Elixir.tasks = new (require('../tasks/TaskCollection').default)();