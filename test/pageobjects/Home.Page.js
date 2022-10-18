class homePage{
    get HomePageLink(){
        return $("=Home")
    }
    get StaffLoginPageLink(){
        return $("=Staff Login")
    }
    get OpenAccountPageLink(){
        return $('li=Open Account')
    }
    get ApplyDebitCardPageLink(){
        return $("=Apply Debit Card")
    }
    get InternetBankingLink(){
        return $("a=Internet Banking")
    }
    get InternetBankingRegisterLink(){
        return $("//li[text()='Register']")
    }
    get InternetBankingLoginLink(){
        return $("li=Login ")
    }
    get FundTransferPageLink(){
        return $("li=Fund Transfer")
    }
}
module.exports = new homePage()