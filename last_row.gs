//Go to the last row
function last_row(column,sh_ListOptions){
 
 //read the column and get the lastrow position number
 var rows = sh_ListOptions.getRange(column+":"+column).getValues();
  iLastRow = rows.length;
  var row = "";  
  while(row == ""){
    row = rows[iLastRow-1];
    iLastRow--;
  }
 return iLastRow;                                        
}
