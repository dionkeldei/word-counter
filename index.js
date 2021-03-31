const coincidences = require("./libraries/coincidences");
const docHelper = require("./libraries/docHelper");
const pdf = require("./libraries/pdf");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

results = [];

docHelper.search('./documents/testCarpeta', function(err, results) {
  if (err) throw err;
  console.log(results);
});

// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('Leyendo: ' + filename);
  data = docHelper.clean(data);
  results = coincidences.get(data, results);

  pdf.create(results, filename);
});
