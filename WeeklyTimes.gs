function weeklyCalendarTracker(endOfWeek) {
  var ss = SpreadsheetApp.getActive();
  var weeklySheet = ss.getSheetByName('Calendar Data by Week');
  var totalsSheet = ss.getSheetByName('Calendar Data Totals');
  var dataImportSheet = ss.getSheetByName('Calendar Data Import');
  var weeklyDataRange = weeklySheet.getDataRange();
  var numRows = weeklyDataRange.getNumRows();
  var numColumns = weeklyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  
  weeklySheet.getRange(1, nextColumn).setValue(new Date(endOfWeek.getTime()-(24*3600*1000)));
  
  for (var i=2; i <= numRows; i++){
    var categoryTime = dataImportSheet.getRange(i, 4).getValue();
    weeklySheet.getRange(i, numColumns + 1).setValue(categoryTime);
  }
/*  
  for (var i=2; i <= 13; i++){
    var categoryTimes = dataImportSheet.getRange(i, 4).getValue();
    var currentTotals = totalsSheet.getRange(i,4).getValue();
    totalsSheet.getRange(i, 4).setValue(categoryTimes + currentTotals);
    Logger.log('%s + %s = %s', categoryTimes, currentTotals, (currentTotals + categoryTimes));
  }
*/  
}