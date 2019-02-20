const shell = require("shelljs");
const path = require("path");
module.exports = data => {
  shell.exec(
    `yarn run eslint --fix ${path.join(
      __dirname,
      `../../src/views/pages/${data.name}.vue`
    )}`
  );
};
