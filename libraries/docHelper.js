const fs = require('fs');
const path = require('path');
const pdf = require("./pdf");
const coincidences = require("./coincidences");

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
  },
  countWords: function (files, filename) {
    var results = [];
    var i = 0
    function readFile(){
      fs.readFile(files[i], 'utf8', function(err, data) {
        if (err) throw err;
        console.log('\x1b[33m%s\x1b[0m',' Leyendo: ' + files[i].split('/')[files[i].split('/').length -1]);
        data = docHelper.clean(data);
        results = coincidences.get(data, results);
        i += 1
        if(i<files.length){
          readFile()
        }else{
          results = coincidences.sort(results)
          pdf.create(results, filename);
        }
      });
    }
    readFile()
  }
}

module.exports = docHelper
