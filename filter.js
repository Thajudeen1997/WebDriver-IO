// var NoOfTrasnsactions = [3,6,2,5,7]
// console.log(NoOfTrasnsactions.filter((element)=>{
//     if(element>3)
//     return element
// }));
var customerId =''
        var acc = 1011271011665
         console.log("accttrim="+acc);
         
         var accStr = String(acc)
         console.log(typeof(acc));
        for (var index = 6; index < accStr.length; index++) {
            customerId=customerId+accStr.charAt(index)
            
        }
        console.log("customer Id="+customerId);