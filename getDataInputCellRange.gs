function letterToColumn(letter)
{
  var letterUpper = letter.toUpperCase();
  var column = 0, length = letterUpper.length;
  for (var i = 0; i < length; i++) {
    column += (letterUpper.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    // Logger.log("%s * %s", letterUpper.charCodeAt(i), Math.pow(26, length - i - 1));
  }
  var ssColumn = column;
  // Logger.log(ssColumn)
  return ssColumn;
}

function defineCellRange(sheetName,startRow,columnLetter,numberOfRows,numberOfColumns=1) {
  // var myProject = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/16mP3GLWkk7sfP-JLKI_DNbn_Vnko_WQ_enOAVXjDGYM/');
  var myProject = SpreadsheetApp.getActive();
  var mySheet = myProject.getSheetByName(sheetName);
  var columnNumber = letterToColumn(columnLetter);
  var inputCells = mySheet.getRange(startRow,columnNumber,numberOfRows,numberOfColumns);
  Logger.log(inputCells, columnNumber);
  
  var inputCellArray = new Array(numberOfRows);
  for (var i = 0; i < numberOfRows; i++) {
    // Logger.log(startRow + i);
    // Logger.log(mySheet.getRange(startRow + i,columnNumber).getValue());
    // Logger.log(inputCells.getCell((i+1),1).getValue());
    inputCellArray[i] = inputCells.getCell((i+1),1);
  }
  
  // RETURN RANGE OF SPREADSHEET CELLS TO INPUT DATA INTO 
  // Logger.log('%s (%s)',cellContents, cellColorArray1[1]);
  return inputCellArray;
}