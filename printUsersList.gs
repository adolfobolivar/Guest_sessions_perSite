//Print List_Users information in a new sheet
function printUsersList(data,keys){
 
 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Users");
 
 //List the AP serial numbers
 var sh_ListAdding = ss.getSheetByName("List Options");
 var AP_serial = sh_ListAdding.getRange("H2:H").getValues();
 
 //next empty row  
 var lastrow = last_row("B",sh_ListOptions)+2;
  
 //Print the date in next empty row
 sh_ListOptions.getRange(lastrow,1).setValue(currentDate+" "+currentTime);

  //Print data  
  for (i = 0; i < data["clients"].length; i++) { 
   for (j = 0; j < keys.length; j++) { 
       
     //add "AP Name" and "Site Label" information to report
     if (keys[j] == "associated_device"){ 
         sh_ListOptions.getRange(lastrow+1+i,j+2).setValue(data["clients"][i][keys[j]]);
  
         //Search by AP Serial number, match, add "AP Name" and "Site Label" information to report
           var k=0;
             for (var l in AP_serial) {  
                k++;                
                if (AP_serial[k] == sh_ListOptions.getRange(lastrow+1+i,j+2).getValue()){
                   break;
                  }
           }
          //AP Name
          sh_ListOptions.getRange(lastrow+1+i,j+2+2).setValue(sh_ListAdding.getRange(k+2,7).getValue());
          //Site Label
          sh_ListOptions.getRange(lastrow+1+i,j+2+3).setValue(sh_ListAdding.getRange(k+2,9).getValue());         
        } 
       else 
         sh_ListOptions.getRange(lastrow+1+i,j+2).setValue(data["clients"][i][keys[j]]);
    }
  }
 return lastrow;
}
