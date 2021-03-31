const exportPdf = {
  create: function (data, filename) {
    var html_to_pdf = require('html-pdf-node');
    let options = { format: 'A4', path: filename };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    var column = 1;
    var content = '<h3>Resultados del conteo de palabras: "'+filename+'"</h3><p>'+new Date()+'</p>'
    content += '<h3><b>Palabras encontradas:</b> '+data.length
    content += '<h3><b>Palabra más usada :</b> "'+data[0][0]+'"<hr>'
    content += '<table style="width:100%"><tr><th style="border-bottom: solid 1px #a5a5a5;">Palabra</th><th style="border-bottom: solid 1px #a5a5a5;">Conteo</th><th style="border-bottom: solid 1px #a5a5a5;">Palabra</th><th style="border-bottom: solid 1px #a5a5a5;">Conteo</th><th style="border-bottom: solid 1px #a5a5a5;">Palabra</th><th style="border-bottom: solid 1px #a5a5a5;">Conteo</th></tr>'
    for(var i=0;i<data.length;i++){
      if(column == 1){
        content += '<tr>'
      }
      content += '<td style="text-align:center;border-bottom: solid 1px #a5a5a5;">'+data[i][0]+'</td><td style="border-bottom: solid 1px #a5a5a5;border-right: solid 1px #a5a5a5;text-align:center;">'+data[i][1]+'</td>'
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
