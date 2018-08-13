function printAPList(data,keys){
 
 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Options");
   
 //Print Date and Time in B2 
  sh_ListOptions.getRange("G2").setValue(currentDate+" "+currentTime);
  
 //Print data in row B3 and below  
  for (i = 0; i < data["aps"].length; i++) {
       sh_ListOptions.getRange(i+3,7).setValue(data["aps"][i][keys[0]]);
       sh_ListOptions.getRange(i+3,8).setValue(data["aps"][i][keys[1]]);
       sh_ListOptions.getRange(i+3,9).setValue(data["aps"][i][keys[2]]);
       sh_ListOptions.getRange(i+3,10).setValue(data["aps"][i][keys[3]]);
   }
}
