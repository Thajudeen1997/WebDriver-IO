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
    async getCustomerIdFromAccNo(accountNoInString){
        let customerId=''
        for (var index = 6; index < accountNoInString.length; index++) {
            customerId=customerId+accountNoInString.charAt(index)
        }
        return customerId.trim()
    }
    // async validationInActiveCustomerPage(){
    //     var columnElements = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//th")
    //     for (let index = 0; index < columnElements.length; index++) {
    //         var checkColumnElements = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//th")[index].getText()
    //         if (ReqColumnEle==checkColumnElements) {
    //             await browser.$$("//div[@class='active_customers_container']/descendant::tbody//tr//td")[index].getText()
    //         }
    //     }
        
    //     return columnElements
    // }
}
module.exports = new javaUtility()