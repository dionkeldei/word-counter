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
  }
}

module.exports = docHelper
