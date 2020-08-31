function doGet(request){
  return HtmlService.createTemplateFromFile('html').evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

