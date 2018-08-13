//Print List_SSIDs information in a new sheet
function printSSIDsList(data,keys){
 
 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Options");
   
 //Print Date and Time in B2 
  sh_ListOptions.getRange("C2").setValue(currentDate+" "+currentTime);
  
 //Print data in column B3 and below  
  j=0;
  for (i = 0; i < data["networks"].length; i++) {
    //Print only Guest SSIDs  
        if (data["networks"][i][keys[1]] === "Guest"){
            sh_ListOptions.getRange(j+3,3).setValue(data["networks"][i][keys[0]]);
            j++;
        }
   }
 
}
