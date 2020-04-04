function defineCellRange(sheetName,weekNumber) {
  var myProject = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/16mP3GLWkk7sfP-JLKI_DNbn_Vnko_WQ_enOAVXjDGYM/');
  var mySheet = myProject.getSheetByName(sheetName);
  var inputColumn = mySheet.getRange(2,2,14,20);
  var columnNumber = weekNumber + 2;
  var simpleArray = new Array(12);
  for (var i = 0; i < 12; i++) {
    simpleArray[i] = i;
  }
  var cellColorArray1 = new Array(12);
  for (var i = 0; i < 12; i++) {
    cellColorArray1[i] = inputColumn.getCell((simpleArray[i]+1),columnNumber);
  }
  
  // RETURN RANGE OF SPREADSHEET CELLS TO INPUT DATA INTO 
  // Logger.log('%s (%s)',cellContents, cellColorArray1[1]);
  return cellColorArray1;
}