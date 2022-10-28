class javaUtility{
    async getNumberFromPopUp(alertText){
        var numberFromText=''
        for (let index = 0; index < alertText.length; index++) {
            if ((alertText.charAt(index) >= 0 && alertText.charAt(index) <= 9) && alertText.charAt(index) != " ") {
                numberFromText = numberFromText + alertText.charAt(index)
            }
        }
        return numberFromText.trim()
    }
    async getDebitCardNoFromPopUp(splittedNo){
        var debitCardNo='' 
        for (var index = 0; index < 12; index++) {
            debitCardNo = debitCardNo + splittedNo.charAt(index)
        }
        return debitCardNo.trim()
    }
    async getDebitCardPinNoFromPopUp(splittedNo){
        var debitCardPinNo='' 
        for (var index = 12; index < 16; index++) {
            debitCardPinNo = debitCardPinNo + splittedNo.charAt(index)
        }
        return debitCardPinNo.trim()
    }
    async getCustomerIdFromAccNo(accountNoInString){
        let customerId=''
        for (var index = 6; index < accountNoInString.length; index++) {
            customerId=customerId+accountNoInString.charAt(index)
        }
        return customerId.trim()
    }
    async validationInActiveCustomerPage(ReqColumnEle,checkData){
        let count=0
        var columnElements = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//th")
        for (var index = 0; index < columnElements.length; index++) {
            var checkColumnElements = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//th")[index].getText()
            if (ReqColumnEle==checkColumnElements) {
                var datas = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//td["+(index+1)+"]")
                for (var i = 0; i < datas.length; i++) {
                    var iterate = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//td["+(index+1)+"]")[i].getText()
                    if (checkData==iterate) {
                        count=1
                        break
                    }
                }
            }
            if (count==1) {
                break
            }
        }
        if (count==1) {
            return "Test Case Passed"
        } else {
            return "Test Case Failed"
        }
    }
   
}
module.exports = new javaUtility()