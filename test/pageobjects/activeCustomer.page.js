class activeCustomerPage{
    get viewActiveCustomerLink(){
        return $("[name='viewdet']")
    }
}
module.exports = new activeCustomerPage()