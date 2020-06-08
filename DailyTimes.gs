function dailyCalendarTracker(startOfDay) {
  var ss = SpreadsheetApp.getActive();
  var dailySheet = ss.getSheetByName('Calendar Data by Day');
  var dataImportSheet = ss.getSheetByName('Calendar Data Import');
  var dailyDataRange = dailySheet.getDataRange();
  var numRows = dailyDataRange.getNumRows();
  var numColumns = dailyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  
  /*
  dailySheet.getRange(1, nextColumn).setValue(startOfDay);
  
  for (var i=2; i <= numRows; i++){
    var categoryTime = dataImportSheet.getRange(i, 4).getValue();
    dailySheet.getRange(i, numColumns + 1).setValue(categoryTime);
  }
  */

  //If date in cell in row 1 == startOfDay, then replace column with new data array.
  var singleDay = new Date(startOfDay); 
  var singleDay_noTime = new Date(singleDay.toDateString());
  var dataInputArray = [];
  var numInputRows = 13;
  for (var i=2; i <= numInputRows; i++){
    dataInputArray.push(dataImportSheet.getRange(i, 4).getValue());
  }
  
  Logger.log(dataInputArray);
  
  const fn = function(v) {
    return [ v ];
  };
  
  
  for (var i=4; i <= numColumns; i++){
    var date = new Date(dailySheet.getRange(1,i).getValue());
    // Convert date format to show only day date and not time.
    var date_noTime = new Date(date.toDateString());
    // Logger.log(date_noTime, singleDay_noTime);
    
    
    if (date_noTime.getTime() == singleDay_noTime.getTime()){
      dailySheet.getRange(2,i,dataInputArray.length).setValues(dataInputArray.map(fn));
      Logger.log("Dates match, replacing data from %s",date_noTime);
      break;
    }
    else if (i == numColumns){
      dailySheet.getRange(1, nextColumn).setValue(sunday);
      dailySheet.getRange(2,nextColumn,dataInputArray.length).setValues(dataInputArray.map(fn));
      Logger.log("Dates don't match. Adding new day %s",singleDay_noTime);
      break;
    }
    else{
      continue;
    }
  }

  
}