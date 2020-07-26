// GLOBALS
//Array of file extension which you would like to extract to Drive
var fileTypesToExtract = ['csv', 'txt'];
//Name of the folder in google drive i which files will be put
var folderName = 'Sleep';
//Name of the label which will be applied after processing the mail message
var labelName = 'Sleep';



function sleepDataEmailExtract(){
  //build query to search emails
  var query = 'subject: sleep cycle';

  // filename:jpg OR filename:tif OR filename:gif OR fileName:png OR filename:bmp OR filename:svg'; //'after:'+formattedDate+
  for(var i in fileTypesToExtract){
	query += (query === '' ?('filename:'+fileTypesToExtract[i]) : (' OR filename:'+fileTypesToExtract[i]));
  }
  query = 'in:inbox ' + query;
  var threads = GmailApp.search(query);
  var label = getGmailLabel_(labelName);
  var parentFolder;
  if(threads.length > 0){
    parentFolder = getFolder_(folderName);
  }
  var root = DriveApp.getRootFolder();
  var recentMesg = threads[0].getMessages();
  // var j = 0 How do I only grab the attachment from the most recent message?
  
  //get attachments
  var attachments = recentMesg[0].getAttachments();
  for(var k in attachments){
    var attachment = attachments[k];
    var isDefinedType = checkIfDefinedType_(attachment);
    if(!isDefinedType) continue;
    	var attachmentBlob = attachment.copyBlob();
        var file = DriveApp.createFile(attachmentBlob);
        parentFolder.addFile(file);
        root.removeFile(file);
  }
  threads[i].addLabel(label);
}

//This function will get the parent folder in Google drive
function getFolder_(folderName){
  var folder;
  var fi = DriveApp.getFoldersByName(folderName);
  if(fi.hasNext()){
    folder = fi.next();
  }
  else{
    folder = DriveApp.createFolder(folderName);
  }
  return folder;
}


function getGmailLabel_(name){
  var label = GmailApp.getUserLabelByName(name);
  if(!label){
	label = GmailApp.createLabel(name);
  }
  return label;
}

//this function will check for filextension type and return boolean.
function checkIfDefinedType_(attachment){
  var fileName = attachment.getName();
  var temp = fileName.split('.');
  var fileExtension = temp[temp.length-1].toLowerCase();
  if(fileTypesToExtract.indexOf(fileExtension) !== -1) return true;
  else return false;
}

//getDate n days back
// n must be integer
function getDateNDaysBack_(n){
  n = parseInt(n);
  var date = new Date();
  date.setDate(date.getDate() - n);
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd');
}