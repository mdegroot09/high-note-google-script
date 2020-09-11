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

function addEditEntry(entry){
  if (entry.isNewEntry){
    addEntry(entry)
  }
  else {
    editEntry(entry)
  }
}

function addEntry(entry){
  let ss = SpreadsheetApp.getActive().getSheetByName('Data').insertRowBefore(2)
  let newId = (ss.getRange('A3').getValue() * 1) + 1
  ss.getRange('A2').setValue(newId)
  ss.getRange('B2').setValue(entry.label)
  ss.getRange('C2').setValue(entry.note)
  ss.getRange('D2').setValue(entry.created)
  ss.getRange('E2').setValue(entry.type)
  ss.getRange('F2').setValue(entry.show)
}

function editEntry(entry){
  
}