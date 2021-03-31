const exportPdf = {
  create: function (data, filename) {
    var html_to_pdf = require('html-pdf-node');
    var name = filename.replace(/\//g,'-');
    let options = { format: 'A4', path: './documents/'+name+'.pdf' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    var column = 1;
    var content = '<h3>Resultados del conteo de palabras: "'+filename+'"</h3><p>'+new Date()+'</p>'
    content += '<h3><b>Palabras encontradas:</b> '+data.length
    content += '<h3><b>Palabra más usada :</b> "'+data[0][0]+'"<hr>'
    content += '<table><tr><th>Palabra</th><th>Conteo</th><th>Palabra</th><th>Conteo</th><th>Palabra</th><th>Conteo</th></tr>'
    for(var i=0;i<data.length;i++){
      if(column == 1){
        content += '<tr>'
      }
      content += '<td>'+data[i][0]+'</td><td>'+data[i][1]+'</td>'
      if(column == 3){
        content += '</tr>'
        column = 0
      }
      column += 1;
    }
    content += '</table>'
    let file = { content: content };

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
      console.log("Pdf Creado!!");
    });
  }
}

module.exports = exportPdf
