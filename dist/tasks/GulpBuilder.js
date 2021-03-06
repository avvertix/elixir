'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var env = (0, _minimist2.default)(process.argv.slice(2));

var GulpBuilder = function () {

    /**
     * Create a new instance.
     *
     * @param {Task} task
     */
    function GulpBuilder(task) {
        _classCallCheck(this, GulpBuilder);

        this.task = task;
    }

    /**
     * Named constructor to prep a Elixir -> Gulp conversion.
     *
     * @param  {Task} task
     * @return {GulpTask}
     */


    _createClass(GulpBuilder, [{
        key: 'build',


        /**
         * Convert the Elixir task to a Gulp task.
         */
        value: function build() {
            var _this = this;

            var name = this.task.name;

            if ((0, _underscore.has)(gulp.tasks, name)) return;

            this.task.loadDependencies && this.task.loadDependencies();

            gulp.task(name, function () {
                if (_this.shouldRunAllTasksNamed(name)) {
                    return Elixir.tasks.byName(name).filter(function (task) {
                        return !Elixir.tasks.watching || Elixir.tasks.watching === task;
                    }).forEach(function (task) {
                        return task.run();
                    });
                }

                return Elixir.tasks.findIncompleteByName(name)[0].run();
            });
        }

        /**
         * See if we should run all mixins for the given task name.
         *
         * @param  {string} name
         * @return {Boolean}
         */

    }, {
        key: 'shouldRunAllTasksNamed',
        value: function shouldRunAllTasksNamed(name) {
            return (0, _underscore.intersection)(env._, [name, 'watch', 'tdd']).length;
        }
    }], [{
        key: 'fromElixirTask',
        value: function fromElixirTask(task) {
            return new GulpBuilder(task).build();
        }
    }]);

    return GulpBuilder;
}();

exports.default = GulpBuilder;