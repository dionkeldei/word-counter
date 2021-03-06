const docHelper = require("./libraries/docHelper");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

var files = []
var filename = process.argv[2];
var isFolder = true
if(filename.includes('.txt')){
  isFolder = false
  files.push(filename)
}

if(isFolder){
  docHelper.search(filename, function(err, files) {
    if (err) throw err
    var words = filename.split('/')
    var lastWord = words[words.length - 1]
    filename += '/'+lastWord+'.pdf'
    for(var i=0;i<files.length;i++){
      if(!files[i].includes('.txt')){
        delete files.splice(i, 1);
      }
    }
    docHelper.countWords(files, filename)
  })
}else{
  filename = filename.replace('.txt','.pdf')
  docHelper.countWords(files, filename)
}
