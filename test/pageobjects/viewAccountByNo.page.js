class viewCustomerByAccNo{
    get VCBNaccountNoTextField(){
        return $("[name='account_no']")
    }
    get VCBNsubmitbuttonViewCustByAccNo(){
        return $("[name='submit_view']")
    }
}
module.exports = new viewCustomerByAccNo()
