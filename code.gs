function doGet(request){
  return HtmlService.createTemplateFromFile('html').evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getNotes(){
  let ss = SpreadsheetApp.getActive()
  let data = ss.getSheetByName('Data').getRange('A2:F').getValues()
  let notes = []
  data.forEach(function(a){
    if (a[0] != ''){
      notes.push({
        id: a[0],
        label: a[1],
        note: a[2],
        created: Date.parse(a[3]).toString(),
        type: a[4],
        show: a[5]
      })
    }
  })
  
  Logger.log(notes)
  return {notes: notes}
}