const coincidences = require("./library/coincidences");
const docHelper = require("./library/docHelper");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

results = [];

// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('Leyendo: ' + filename);
  data = docHelper.clean(data);
  results = coincidences.get(data, results);
  console.log(results);
  console.log('Palabras usadas: '+results.length);
});
