class creditCustomerPage{
    get CCaccountNoTextFiled(){
        return $("[name='customer_account_no']")
    }
    get CCamountTextFiled(){
        return $("[name='credit_amount']")
    }
    get CCcreditButton(){
        return $("[name='credit_btn']")
    }
}
module.exports = new creditCustomerPage()