require('fs').readdirSync(__dirname + '/').forEach(function (file) {
  if (file.match(/\.json$/) !== null) {
    exports[file.replace('.json', '')] = require('./' + file);
  }
});