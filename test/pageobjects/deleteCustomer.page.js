class deleteCustomerPage{
    get DCaccountNoTextField(){
        return $("[name='Cust_ac_no']")
    }
    get DCcustomerIdTextField(){
        return $("[name='Cust_ac_Id']")
    }
    get reasonTextFiled(){
        return $("[name='reason']")
    }
    get DCdeleteButton(){
        return $("[name='delete']")
    }
    async deleteCustomerAction(accNo,customerId,reason){
        await this.DCaccountNoTextField.setValue(accNo)
        await this.DCcustomerIdTextField.setValue(customerId)
        await this.reasonTextFiled.setValue(reason)
        await this.DCdeleteButton.click()
    }
}
module.exports = new deleteCustomerPage()