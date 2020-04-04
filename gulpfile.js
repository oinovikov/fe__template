const fs = require('fs');
const path = require('path');

const deepmerge = require('deepmerge');
const gulp = require('gulp');
const rollup = require('rollup');
const browserSync = require('browser-sync').create();

const rollupMultiEntry = require('@rollup/plugin-multi-entry');
const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const { eslint: rollupEslint } = require('rollup-plugin-eslint');
const { terser: rollupTerser } = require('rollup-plugin-terser');

const gulpStylus = require('gulp-stylus');
const gulpPug = require('gulp-pug');
const gulpConcat = require('gulp-concat');

const configFilePath = './dev.config.js';

const defaultOptions = {
    server: { // https://browsersync.io/docs/options
        host: '0.0.0.0',
        port: 8000,
        browser: [ 'google chrome' ],
        open: true,
        startPath: null,
    },
    gulp: {
        src: './src',
        dest: './public',
    },
    pug: {
        src: '/pages',
        minify: false,
    },
    stylus: {
        dest: '/css/common.css',
        minify: true,
    },
    js: {
        dest: '/js/common.js',
        minify: true,
        format: 'iife',
        sourcemap: false,
        lint: {
            use: true,
            config: {
                'env': {
                    'browser': true,
                    'es6': true,
                },
                'parserOptions': {
                    'sourceType': 'module',
                    'ecmaVersion': 2015,
                    'ecmaFeatures': {
                        'jsx': true,
                        'modules': true,
                    },
                    'allowImportExportEverywhere': false,
                },
                'rules': {
                    'no-debugger': isProdEnv() ? 'error' : 'warn',
                    'new-cap': 'warn',
                    'quote-props': [ 'warn', 'as-needed' ],
                    'prefer-rest-params': 'off',
                    // Unused variables smell like an error.
                    'no-unused-vars': 'warn',
                    // Do not allow `alert` calls.
                    'no-alert': 'warn',
                    // Disable `no-shadow` warning to avoid useless renaming. Be careful.
                    'no-shadow': 'off',
                    // Disable `no-param-reassign` warning to avoid useless renaming. Be careful.
                    'no-param-reassign': 'off',
                    // Console statements in production code are dangerous. Use the `eslint-disable-line no-console` comment for intentional console statements, and be careful to guard them.
                    'no-console': 'warn',
                    // Using variables outside of the scope they are defined is dangerous, they can have a value that the code does not expect.
                    'block-scoped-var': 'warn',
                    // Do not use the variables before they are defined. Disable `no-use-before-define` for functions because we use ES5 function name hoisting in our class definitions.
                    'no-use-before-define': [ 'warn', { 'functions': false } ],
                    // Do not enumerate objects with `for..in` because `Object.prototype` can be extended with a polyfill.
                    'guard-for-in': 'warn',
                    'no-var': 'off',
                    'vars-on-top': 'warn',
                    'consistent-return': 'warn',
                    'no-new': 'warn',
                    'no-script-url': 'error',

                    /**
                     * Coding style
                     */
                    'indent': [ 'error', 4, { 'SwitchCase': 1 } ],
                    'array-bracket-spacing': [ 'warn', 'always' ],
                    'object-curly-spacing': [ 'warn', 'always' ],
                    'computed-property-spacing': [ 'warn', 'never' ],
                    'no-trailing-spaces': [ 'error', {
                        'skipBlankLines': false,
                        'ignoreComments': false
                    } ],
                    'keyword-spacing': 'warn',
                    'space-before-blocks': 'warn',
                    'arrow-spacing': 'warn',
                    'func-call-spacing': 'warn',
                    'space-before-function-paren': [ 'warn', {
                        'anonymous': 'always',
                        'named': 'never',
                        'asyncArrow': 'always'
                    } ],
                    'space-infix-ops': 'warn',
                    'space-unary-ops': 'warn',
                    'comma-spacing': 'warn',
                    'key-spacing': 'warn',
                    'brace-style': [ 'warn', '1tbs', { 'allowSingleLine': false } ],
                    'eol-last': [ 'error', 'always' ],
                    'linebreak-style': [ 'warn', 'unix' ],
                    'no-multiple-empty-lines': [ 'warn', {
                        'max': 2,
                        'maxEOF': 1,
                        'maxBOF': 0
                    } ],
                    'no-underscore-dangle': 'off',
                    'no-restricted-syntax': 'off',
                    'no-prototype-builtins': 'warn',
                    'no-lonely-if': 'warn',
                    'no-continue': 'off',
                    'newline-per-chained-call': [ 'warn', { 'ignoreChainWithDepth': 2 } ],
                    'no-useless-concat': 'warn',
                    'operator-assignment': [ 'warn', 'always' ],
                    'camelcase': [ 'warn', { 'properties': 'always' } ],
                    'func-names': 'off',
                    'comma-dangle': [ 'warn', 'always-multiline' ],
                    'padded-blocks': 'off',
                    'lines-between-class-members': 'warn',
                    'quotes': [ 'warn', 'single', { 'avoidEscape': true } ],
                    'no-multi-spaces': [ 'warn', { exceptions: {
                        'VariableDeclarator': true,
                        'ImportDeclaration': true
                    } } ],
                    'max-len': 'warn',
                    'dot-notation': 'off',
                    'spaced-comment': [ 'warn', 'always' ],
                    'prefer-template': 'off',
                    'prefer-arrow-callback': 'off',
                    'prefer-const': [ 'warn', { 'ignoreReadBeforeAssign': true } ],
                    'object-shorthand': 'off',
                    'space-in-parens': 'off',
                    'no-nested-ternary': 'warn',
                    'arrow-body-style': [ 'warn',
                        'as-needed',
                        { 'requireReturnForObjectLiteral': true }
                    ],
                    'arrow-parens': [ 'warn', 'always' ],
                    'yoda': [ 'warn', 'never' ],
                    'strict': 'warn',
                    'no-mixed-operators': [ 'warn', {
                        'groups': [
                            [ '&', '|', '^', '~', '<<', '>>', '>>>' ],
                            [ '==', '!=', '===', '!==', '>', '>=', '<', '<=' ],
                            [ 'in', 'instanceof' ]
                        ],
                        'allowSamePrecedence': true,
                    } ],
                    'global-require': 'warn',
                    'no-else-return': 'warn',
                    'no-extra-semi': 'warn',
                    'semi': 'error',
                    'semi-spacing': 'warn',

                    /**
                     * ES6
                     */
                    'no-duplicate-imports': 'warn',
                    'sort-imports': 'warn',
                    'import/default': 'off',
                    'import/no-duplicates': 'warn',
                    'import/named': 'warn',
                    'import/namespace': 'warn',
                    'import/no-unresolved': 'warn',
                    'import/no-named-as-default': 'warn',
                    'import/prefer-default-export': 'off',
                    'import/extensions': [ 'off', 'never' ],
                    'import/newline-after-import': 'warn',
                    'import/first': 'warn',
                    'import/order': 'warn',

                    /**
                     * JSDoc
                     */
                    'jsdoc/newline-after-description': 'warn',
                },
                'plugins': [
                    'import',
                    'jsdoc',
                ]
            },
        },
    },
};

let userOptions = { };

if (fs.existsSync(configFilePath)) {
    userOptions = require(configFilePath);
}

const options = deepmerge(defaultOptions, userOptions);


function compileHTML() {
    const pagesDirPath = path.join(options.gulp.src, options.pug.src);

    unlinkFilesByExt(options.gulp.dest, 'html');

    return (async function () {
        return fs.readdir(pagesDirPath, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                const filePath = path.join(pagesDirPath, file);

                fs.stat(filePath, (err, stats) => {
                    if (err) throw err;

                    const indexFilePath = path.join(filePath, 'pug', 'index.pug');

                    if (stats.isDirectory() && fs.existsSync(indexFilePath)) {
                        compile(indexFilePath, path.join(options.gulp.dest, file));
                    } else if (stats.isFile()) {
                        compile(filePath, options.gulp.dest);
                    }
                });
            });
        });
    })();

    function compile(src, dest) {
        gulp
            .src(path.normalize(src))
            .pipe(gulpPug({
                basedir: path.normalize(options.gulp.src),
                pretty: !(isProdEnv() & options.pug.minify),
            }))
            .pipe(gulp.dest(path.normalize(dest)));
    };
};


/**
 * Build styles.
 */
function compileCSS() {
    const mainFilePath = path.join(options.gulp.src, 'main.styl');
    const dest = path.parse(options.stylus.dest);
    const destDirPath = path.join(options.gulp.dest, dest.dir);

    clearDir(destDirPath);

    if (fs.existsSync(mainFilePath)) {
        return compile(mainFilePath);
    } else {
        return compile(path.join(options.gulp.src, '**', 'index.styl'));
    }

    function compile(src) {
        return gulp
            .src(src)
            .pipe(gulpStylus({
                compress: isProdEnv() & options.stylus.minify,
            }))
            .pipe(gulpConcat(dest.base, { newLine: '' }))
            .pipe(gulp.dest(destDirPath));
    }
};


/**
 * Build javascript.
 */
function compileJS() {
    const mainFilePath = path.join(options.gulp.src, 'main.js');
    const dest = path.parse(options.js.dest);
    const destDirPath = path.join(options.gulp.dest, dest.dir);

    clearDir(destDirPath);

    if (fs.existsSync(mainFilePath)) {
        return compile(mainFilePath);
    } else {
        return compile(path.join(options.gulp.src, '**', 'index.js'));
    }

    function compile(src) {
        return rollup.rollup({
            input: src,
            plugins: [
                rollupMultiEntry(),
                rollupResolve(),
                rollupEslint(options.js.lint.config),
                rollupBabel({
                    exclude: 'node_modules/**',
                    'presets': [
                        [ '@babel/env', { 'modules': false } ]
                    ],
                    babelrc: false
                }),
                (isProdEnv() & options.js.minify) ? rollupTerser() : null,
            ],
        }).then(bundle => {
            return bundle.write({
                file: path.join(destDirPath, dest.base),
                format: options.js.format,
                sourcemap: options.js.sourcemap,
            });
        });
    }
};


/**
 * Start node server for local debug
 * and open destination source in browser.
 */
function serve() {
    browserSync.init(null, {
        server: {
            baseDir: options.gulp.dest,
        },
        host: options.server.host,
        port: options.server.port,
        files: path.join(options.gulp.dest, '**', '*'),
        watchEvents: [ 'add', 'change', 'unilnk', 'addDir', 'unlinkDir' ],
        logLevel: 'info',
        browser: options.server.browser,
        reloadOnRestart: true,
        injectChanges: false,
        open: options.server.open,
        startPath: options.server.startPath,
    });
};


/**
 * Start watch for source files.
 */
function watch() {
    gulp.watch(path.join(options.gulp.src, '**', '*.(pug|html)'), compileHTML);
    gulp.watch(path.join(options.gulp.src, '**', '*.styl'), compileCSS);
    gulp.watch(path.join(options.gulp.src, '**', '*.js'), compileJS);
};


/**
 * Clear default destination directory.
 *
 * @returns {Function}
 */
function clear() {
    return (async function () {
        clearDir(options.gulp.dest, true);
    })();
};


/**
 * Clean passed directory.
 *
 * @param {(string|Buffer|URL)} dirPath
 *   Path to dir that must be cleaned.
 *
 * @param {boolean} [selfUnlink=false]
 *   Passed dir must be deleted.
 */
function clearDir(dirPath, selfUnlink = false) {
    if (!fs.existsSync(dirPath)) {
        return;
    }

    const files = fs.readdirSync(dirPath);

    files.forEach((file, i) => {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
            clearDir(filePath, true);
        } else if (fileStats.isFile()) {
            fs.unlinkSync(filePath);

            if (i === files.length - 1 && selfUnlink) {
                fs.rmdirSync(dirPath);
            }
        }
    });
};


/**
 * Remove files with defined extension name.
 *
 * @param {(string|Buffer|URL)} dirPath
 *   Path to directory with necessary files.
 *
 * @param {(string|Array)} filesExt
 *   Files extension name or array of extensions.
 */
function unlinkFilesByExt(dirPath, filesExt) {
    if (!fs.existsSync(dirPath)) {
        return;
    }

    const filesExtNames = [ ];

    if (typeof filesExt === 'string') {
        filesExtNames.push(filesExt);
    } else if (filesExt instanceof Array) {
        Array.prototype.push.apply(filesExtNames, filesExt);
    } else {
        throw TypeError('Second argument must be a string or array of strings.');
    }

    Array.prototype.map.apply(filesExtNames, [ normalizeExtName ]);

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.stat(filePath);

        if (fileStats.isDirectory()) {
            unlinkFilesByExt(filePath, filesExtNames);
        } else if (fileStats.isFile() && filesExtNames.indexOf(normalizeExtName(path.extname(filePath))) !== -1) {
            fs.unlinkSync(filePath);
        }
    });

    function normalizeExtName(extName) {
        return `.${extName.toLowerCase().trim().replace(/^\.+/g, '')}`;
    }
}


/**
 * Get state production environment.
 * Use for building options.
 *
 * @returns {boolean}
 *   Prod argument availability.
 */
function isProdEnv() {
    return process.argv.indexOf('--prod') !== -1;
}

// Gulp commands
gulp.task('html', compileHTML);
gulp.task('css', compileCSS);
gulp.task('js', compileJS);
gulp.task('serve', serve);
gulp.task('watch', watch);
gulp.task('clear', clear);
gulp.task('dev', gulp.parallel([ 'serve', 'watch' ]));
gulp.task('default', gulp.series('clear', gulp.parallel([ 'html', 'css', 'js' ])));
