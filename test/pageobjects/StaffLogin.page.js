class staffLoginPage{
    get StaffIdTextField(){
        return $('[name="staff_id"]')
    }
    get StaffPasswordTextField(){
        return $('[name="password"]')
    }
    get StaffSubmitButton(){
        return $('[name="staff_login-btn"]')
    }
    async StaffLoginAction(StaffId,password){
        await this.StaffIdTextField.setValue(StaffId)
        await this.StaffPasswordTextField.setValue(password)
        await this.StaffSubmitButton.click()
    }
}
module.exports = new staffLoginPage()