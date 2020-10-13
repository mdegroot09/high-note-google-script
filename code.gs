function doGet(request){
  let html = HtmlService.createTemplateFromFile('html').evaluate();
  html.setTitle('Noted')
  html.setFaviconUrl('https://cdn2.iconfinder.com/data/icons/pretty-office-10/512/Pencil-512.png')
  return html
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

function addEntry(entry){
  let ss = SpreadsheetApp.getActive().getSheetByName('Data').insertRowBefore(2)
  let newId = (ss.getRange('A3').getValue() * 1) + 1
  ss.getRange('A2').setValue(newId)
  ss.getRange('B2').setValue(entry.label)
  ss.getRange('C2').setValue(entry.note)
  ss.getRange('D2').setValue(new Date(entry.created))
  ss.getRange('E2').setValue(entry.type)
  ss.getRange('F2').setValue(entry.show)
  
  return 'Success. New entry added.'
}

function editEntry(entry){
  let ss = SpreadsheetApp.getActive().getSheetByName('Data')
  let row = 2
  while (ss.getRange('A' + row).getValue() >= entry.id){
    if (entry.id == ss.getRange('A' + row).getValue()){
      ss.getRange('B' + row).setValue(entry.label)
      ss.getRange('C' + row).setValue(entry.note)
      ss.getRange('E' + row).setValue(entry.type)
      ss.getRange('F' + row).setValue(entry.show)
      
      return 'Success. Entry Updated.'
    }
    row += 1
  }
  
  return 'Error. Entry not found.'
}