function print_MAC(mac) {
  
  //Split the string
  var mac_split = mac.split('');
  
  //Replace "-" dash with ":" colon and lowercase letters
  for (var i in mac_split) {
    if (mac_split[i] == "-") {
      mac_split[i] = ":"; 
    }
    else
     mac_split[i] = mac_split[i].toLowerCase(); 
  }
      
 return mac =  mac_split.toString().replace(/,/g,'');
}
