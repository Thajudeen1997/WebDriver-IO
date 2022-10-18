class approveCustomerAccountPage{
    get appNoSearchBar(){
        return $('[name="application_no"]')
    }
    get searchAppNoButton(){
        return $('[name="search_application"]')
    }
    get approveButton(){
        return $('[name="approve_cust"]')
    }

    // async approveApplicationAction(){
    //     await this.appNoSearchBar.setvalue(applicationNo)
        
    // }
}
module.exports = new approveCustomerAccountPage()