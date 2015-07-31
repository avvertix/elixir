var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');


describe('Styles Task', function() {

    it('merges stylesheets together', function(done) {
        Elixir(mix => mix.styles(['one.css', 'two.css']));

        runGulp(() => {
            shouldExist('public/css/all.css');

            done();
        });
    });

    it('merges to any file the user wishes', function(done) {
        Elixir(mix => mix.styles(['one.css', 'two.css'], './public/css/merged.css'));

        runGulp(() => {
            shouldExist('public/css/merged.css');

            done();
        });
    });

});


var shouldExist = (file) => {
    return fs.existsSync(file).should.be.true;
};


var runGulp = assertions => {
    gulp.start('default', () => {
        assertions();

        remove.sync('./public/css');
    });
};