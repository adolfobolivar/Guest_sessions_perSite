
//Print List_SSIDs information in a new sheet
function printSplashPages(data,keys){
 
 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Options");
   
 //Print Date and Time in B2 
  sh_ListOptions.getRange("D2").setValue(currentDate+" "+currentTime);
  
 //Print data in column B3 and below  
  for (i = 0; i < data["portals"].length; i++) {
            sh_ListOptions.getRange(i+3,4).setValue(data["portals"][i][keys[0]]);
            sh_ListOptions.getRange(i+3,5).setValue(data["portals"][i][keys[1]]);
   }
 
}
