var fs = require('fs');
var path = require('path');

const docHelper = {
  clean: function (data) {
    data = data.toLowerCase();
    data = data.replace(/\n/g, " ");
    data = data.replace(/\r/g, " ");
    data = data.replace(/\t/g, " ");
    data = data.replace(/\(|\)|\?|\¿/gi, " ");
    data = data.replace(/,/g, ' ');
    data = data.replace(/"/g, ' ');
    data = data.replace(/'/g, ' ');
    array = data.split(' ');
    var data = array.filter(function (el) {
        return el != null;
    });
    return data
  },
  search: function(dir, done) {
    var results = []
    fs.readdir(dir, function(err, list) {
      if (err) return done(err)
      var i = 0;
      (function next() {
        var file = list[i++]
        if (!file) return done(null, results)
        file = path.resolve(dir, file)
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            module.exports.search(file, function(err, res) {
              results = results.concat(res)
              next()
            });
          } else {
            results.push(file)
            next()
          }
        })
      })()
    })
  }
}

module.exports = docHelper
