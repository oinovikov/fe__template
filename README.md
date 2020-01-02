# Hello world!

It`s my own template for front-end development.

Workflow
---
I use **pug** for HTML build, **stylus** as CSS preprocessor and vanilla JS.

Install
---
After clone repo, run ```npm start``` for install node modules and prepare directories structure.

CLI Commands
---
- ```npm start``` is alias for ```npm run init```;
- ```npm run init``` for install node packages and create directories structure;
- ```npm run serve-php``` for start local php server;
- ```npm run serve``` is alias for ```gulp serve```;
- ```npm run dev``` is alias for ```gulp dev```;
- ```npm run build``` is alias for ```gulp --prod```;
- ```gulp html``` for build HTML;
- ```gulp css``` for compile CSS;
- ```gulp js``` for build JS;
- ```gulp``` for all of the above. With ```--prod``` argument is build production bundle;
- ```gulp serve``` for start local node server and watching changes for live-reload;
- ```gulp watch``` for watching changes and project auto build;
- ```gulp dev``` for start serve, live-reload and watching for changes/project auto build;
- ```npm run v-patch``` for increase app`s version (patch);
- ```npm run v-minor``` for increase app`s version (minor);
- ```npm run v-major``` for increase app`s version (major);

Directories/files structure
---
- The ```public``` directory contain build project files;
 - The ```js``` directory contain compiled JS file;
 - The ```css``` directory contain compiled CSS file;
 - The ```**``` directories is pages with ```index.html``` files;
 - The ```*.html``` files is HTML pages;
- The ```src``` directory contain source files;
 - The ```blocks``` directory contain common blocks;
 - The ```pages``` directory contain output pages;
 - The ```lib``` directory contain common library;
 - The ```main.styl``` [optional] stylus aggregation file;
 - The ```main.js``` [optional] javascript modules aggregation file;
- The ```.gitignore``` file;
- The ```dev.config.js``` [optional] file is user configuration file;
- The ```gulpfile.js``` file is build configuration file;
- The ```package.json``` file is npm configuration file;
- The ```README.md``` file is repository info;

Bundle configuration
---
User can redefine build options in ```./dev.config.js``` file. Create ```dev.config.js``` file for that in root with code:
```javascript
module.exports = {
    option1: value,
    option2: value,
    option3: {
        subOption1: value,
        subOption2: value,
        ...
    },
    ...
}
```
Configuration options can see in ```gulpfile.js``` (var ```defaultOptions```).

Tips
---
For default javascript and stylus build tasks looking for index files (```index.styl``` and ```index.js```). But if it finding main files (```main.styl``` and ```main.js```) in sources directory root then use their for build output files.

Global NPM init example code
---
This code is useful for getting started quickly with that template in the future. Create ```.npm-init.js``` in system home directory (on Windows, that’s usually c/Users/&lt;username&gt; , and on Mac, it’s /Users/&lt;username&gt;) with next script:
```javascript
const path = require('path');

module.exports = {
  name: prompt('package name', basename || package.name),
  version: prompt('version', '1.0.0'),
  description: prompt('description', ''),
  repository: prompt('git repository', 'git+'.concat(path.join(package.homepage, basename))),
  keywords: prompt(function (s) { return Array.from(new Set(package.keywords.concat(s.split(/\s+/)))) }, package.keywords),
}
```
For check default path to file with that script can run: ```npm config get init-module```.
For set path to file with that script can run: ```npm config set init-module ~\.npm-init.js```.

---
https://olegn.ru
