const coincidences = {
  get: function (data, coincidences = []) {
    for(var i=0;i<data.length;i++){
      if(data[i] != '' && typeof data[i] == "string" && data[i].match("[a-zA-Z]+")){
        if(!(data[i] in coincidences)){
          coincidences[data[i]] = 1;
        }else{
          coincidences[data[i]] += 1;
        }
      }
    }
    return coincidences
  },
  sort: function (coincidences) {
    var sortable = [];
    for (var word in coincidences) {
        sortable.push([word, coincidences[word]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable;
  }
}

module.exports = coincidences
