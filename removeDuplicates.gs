// code from https://developers.google.com/apps-script/articles/removing_duplicates
function removeDuplicates() {
 
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Guest Sessions");
 var yourNewSheet = ss.getSheetByName("Day Report");
  
 //Guest sessions
 var data = sh_ListOptions.getDataRange().getValues();

 //Remove duplicate Guest sessions 
  var newData = new Array();
  for(i in data){
    var row = data[i];
    var duplicate = false;
    for(j in newData){
      // If email and login time and time session (major value) match then it is a duplicate entry
      if(row[0] == newData[j][0] && row[1] == newData[j][1] && row[3] == newData[j][3] && row[11] > newData[j][11]){
        duplicate = true;
        //update the session time
        newData[j][11] = row[11];
      }
    }
    if(!duplicate){
      newData.push(row);
    }
  }
  
  //Generate the report
  yourNewSheet.clearContents();
  yourNewSheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);    
}
