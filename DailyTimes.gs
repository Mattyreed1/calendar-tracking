function dailyCalendarTracker(startOfDay) {
  var ss = SpreadsheetApp.getActive();
  var dailySheet = ss.getSheetByName('Calendar Data by Day');
  var dataImportSheet = ss.getSheetByName('Calendar Data Import');
  var dailyDataRange = dailySheet.getDataRange();
  var numRows = dailyDataRange.getNumRows();
  var numColumns = dailyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  
  dailySheet.getRange(1, nextColumn).setValue(startOfDay);
  
  for (var i=2; i <= numRows; i++){
    var categoryTime = dataImportSheet.getRange(i, 4).getValue();
    dailySheet.getRange(i, numColumns + 1).setValue(categoryTime);
  }  
}