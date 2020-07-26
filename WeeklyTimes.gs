function weeklyCalendarTracker(endOfWeek,n=1) {
  var ss = SpreadsheetApp.getActive();
  var weeklySheet = ss.getSheetByName('Calendar Data by Week');
  var totalsSheet = ss.getSheetByName('Calendar Data Totals');
  var dataImportSheet = ss.getSheetByName('Calendar Data Import');
  var weeklyDataRange = weeklySheet.getDataRange();
  var numRows = weeklyDataRange.getNumRows();
  var numColumns = weeklyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  
  //If date in cell in row 1 == endOfWeek (sunday at end of week), then replace column with new data array.
  var sunday = new Date(new Date(endOfWeek).getTime() - (1000 * 60 * 60 * 24));
  var sunday_noTime = new Date(sunday.toDateString());
  
  var inputCellsRange = dataImportSheet.getRange(2,4,24,1);
  var dataInputArray = [];
  for (var i=0; i < 24; i++){
    dataInputArray.push(inputCellsRange.getCell((i+1),1).getValue());
  }
  
  Logger.log(dataInputArray);
  
  const fn = function(v) {
    return [ v ];
  };
  
  // if n == 1: it is a new date, input data at nextColumn
  if (n == 1){
    weeklySheet.getRange(1, nextColumn).setValue(sunday);
    weeklySheet.getRange(2,nextColumn,dataInputArray.length).setValues(dataInputArray.map(fn));
  }
  
  // else if n == 0: it is the first week in the list, so check if it matches an existing week. Input data.
    // ????????????Create an array of dates, check if endofweek date is in array, get index and column number of that date, 
    // return column number
  else if (n == 0){
    for (var i=4; i <= numColumns; i++){
      var date = new Date(weeklySheet.getRange(1,i).getValue()); 
      // Convert date format to show only day date and not time.
      var date_noTime = new Date(date.toDateString());
      // Logger.log(date,sunday);
      Logger.log(date_noTime, sunday_noTime);
      // Logger.log(date_noTime.getTime(), sunday_noTime.getTime());
    
      if (date_noTime.getTime() == sunday_noTime.getTime()){
        weeklySheet.getRange(2,i,dataInputArray.length).setValues(dataInputArray.map(fn));
        // input subcategory array
        Logger.log("Dates match");
        followingColumn = i+1;
        return followingColumn;
      }
      else if (i == numColumns){
      weeklySheet.getRange(1, nextColumn).setValue(sunday);
      weeklySheet.getRange(2,nextColumn,dataInputArray.length).setValues(dataInputArray.map(fn));
      Logger.log("Dates don't match")
      break;
      }
      else{
        continue;
      }
    }
  }
    
  // else: it is a date in the list, input data at column n.
  else {
    weeklySheet.getRange(2,n,dataInputArray.length).setValues(dataInputArray.map(fn));
  }
    

  
  /*
  weeklySheet.getRange(1, nextColumn).setValue(new Date(endOfWeek.getTime()-(24*3600*1000)));
  
  for (var i=2; i <= numRows; i++){
    var categoryTime = dataImportSheet.getRange(i, 4).getValue();
    weeklySheet.getRange(i, numColumns + 1).setValue(categoryTime);
  }
  */
  
/*  
  for (var i=2; i <= 13; i++){
    var categoryTimes = dataImportSheet.getRange(i, 4).getValue();
    var currentTotals = totalsSheet.getRange(i,4).getValue();
    totalsSheet.getRange(i, 4).setValue(categoryTimes + currentTotals);
    Logger.log('%s + %s = %s', categoryTimes, currentTotals, (currentTotals + categoryTimes));
  }
*/  
}