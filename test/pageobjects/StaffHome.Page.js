class StaffHomePage{
    get StaffHomeLInk(){
        return $("[name='home']")
    }
    get StaffLogoutLink(){
        return $("[name='logout_btn']")
    }
    get ApproveCutomerPageLink(){
        return $('[name="apprvac"]')
    } 
    get ActiveCustomerPageLink(){
        return $("[name='viewdet']")
    }
    get DeleteCutomerPageLink(){
        return $("[name='del_cust']")
    }
    get ViewByAccountNoPageLink(){
        return $("[name='view_cust_by_ac']")
    }
    get CreditCustomerPageLink(){
        return $("[name='credit_cust_ac']")
    }
}
module.exports = new StaffHomePage()