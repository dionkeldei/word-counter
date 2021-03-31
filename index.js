// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('Leyendo: ' + filename);
  var originalText = data;
  data = data.toLowerCase();
  data = data.replace(/\n/g, " ");
  data = data.replace(/\r/g, " ");
  data = data.replace(/\t/g, " ");
  data = data.replace(/\(|\)|\?|\¿/gi, " ");
  array = data.split(' ');
  var data = array.filter(function (el) {
      return el != null;
  });
  var coincidences = [];
  for(var i=0;i<data.length;i++){
    if(data[i] != '' && typeof data[i] == "string" && data[i].match("[a-zA-Z]+")){
      if(!(data[i] in coincidences)){
        coincidences[data[i]] = 1;
      }else{
        coincidences[data[i]] += 1;
      }
    }
  }
  var sortable = [];
  for (var word in coincidences) {
      sortable.push([word, coincidences[word]]);
  }
  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });
  console.log(sortable);
  console.log('Palabras usadas: '+sortable.length);
});
