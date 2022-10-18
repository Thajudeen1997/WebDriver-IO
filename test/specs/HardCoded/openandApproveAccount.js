describe("Creating account and approving the account",async()=>{
    const OpenAccountPage = require("../../pageobjects/OpenAccount.page")
    var applicationNo=''
    var accountNo = ''
    it('opening application',async()=>{
        await browser.url("https://rmgtestingserver/domain/Online_Banking_System/")
        await browser.maximizeWindow()
        await expect(browser).toHaveTitle('Online Banking System')
    })
    it('launching open account page', async()=>{
        const openAccountLink=  browser.$('li=Open Account')
        await openAccountLink.click()
        await expect(browser).toHaveTitle('Registration Form')
       
    })
    it('Filling open Account details', async()=>{
        await OpenAccountPage.NameTextField.setValue("thaju")
        // const nameTextField = await browser.$('[name="name"]')
        // await nameTextField.setValue("thaju")
        
        // // var verify = nameTextField.getValue()
        // // console.log(verify);
        // const genderDropDown = await browser.$("[name='gender']")
        // await genderDropDown.selectByVisibleText("Male")
        // const mobileNo = await browser.$('[name="mobile"]')
        // await mobileNo.setValue(9003947855)
        // const emailId = await browser.$('[name="email"]')
        // await emailId.setValue("thaj@gmail.com")
        // const landlineNo = await browser.$('[name="landline"]')
        // await landlineNo.setValue(0444322345)
        // const dateOfBirth = await browser.$('[name="dob"]')
        // await dateOfBirth.setValue("07/10/1997")
        // const panNo = await browser.$('[name="pan_no"]')
        // await panNo.setValue("AWGPTCY23")
        // const citizenshipNo = await browser.$('[name="citizenship"]')
        // await citizenshipNo.setValue("CITINO9876")
        // const homeAddress  = await browser.$('[name="homeaddrs"]')
        // await homeAddress.setValue("kolathupalayam")
        // const officeAddress = await browser.$('[name="officeaddrs"]')
        // await officeAddress.setValue("Dharapuram")
        // const state = await browser.$('[name="state"]')
        // await state.selectByVisibleText("California")
        // const city  = await browser.$('[name="city"]')
        // await city.selectByVisibleText("San Diego")
        // const pin = await browser.$('[name="pin"]')
        // await pin.setValue(638661)
        // const areaOrLocality = await browser.$('[name="arealoc"]')
        // await areaOrLocality.setValue("nagawara")
        // const accountType = await browser.$('[name="acctype"]')
        // await accountType.selectByVisibleText('Current')
        // const submitButton = await browser.$('[name="submit"]')
        // await submitButton.click()
        // await expect(browser).toHaveTitle('Confirm')
        // const confirmSubmit = await browser.$('[name="cnfrm-submit"]')
        // await confirmSubmit.click()
        // var applicationAlert = await browser.getAlertText()
        // // await console.log(applicationAlert);
        // // await console.log(typeof(applicationAlert));
       
        
        // for (let index = 0; index < applicationAlert.length; index++) {
        //     if ((applicationAlert.charAt(index)>=0 && applicationAlert.charAt(index)<=9)&& applicationAlert.charAt(index)!=" ") {
        //          applicationNo = applicationNo + applicationAlert.charAt(index)
        //     } 
        //  }
        //  await console.log('appNo='+applicationNo.trim());
        // await browser.acceptAlert()
        // // await console.log(applicationNo);
        // await browser.pause(3000)
    })
    xit('login to manager module',async()=>{
        const staffLoginLink = await browser.$('=Staff Login')
        await staffLoginLink.click()
        await expect(browser).toHaveTitle("Staff Page")
        const staffTextField = await browser.$('[name="staff_id"]')
        await staffTextField.setValue(210001)
        const passwordTextFiled = await browser.$('[name="password"]')
        await passwordTextFiled.setValue("password")
        const staffSubmitButton = await browser.$('[name="staff_login-btn"]')
        await staffSubmitButton.click()
        await expect(browser).toHaveTitle("Staff Home")
    })
    xit('approve customer',async()=>{
        const approveCustomerLink = await browser.$('[name="apprvac"]')
        await approveCustomerLink.click()
        await expect(browser).toHaveTitle("Pending Customers")
        const appNoSearchBar = await browser.$('[name="application_no"]')
        await appNoSearchBar.setValue(applicationNo.trim())
        await browser.pause(3000)
        await console.log('appnoin='+applicationNo.trim());
        const searchAppNoButton = await browser.$('[name="search_application"]')
        await searchAppNoButton.click()
        const approveCustomerButton = await browser.$('[name="approve_cust"]')
        await approveCustomerButton.click()
        var accNoPopUp = await browser.getAlertText()
        
        for (var index = 0; index < accNoPopUp.length; index++) {
            if ((accNoPopUp.charAt(index)>=0 && accNoPopUp.charAt(index)<=9)&& accNoPopUp.charAt(index)!=" ") {
            accountNo = accountNo.concat(accNoPopUp.charAt(index))
           } 
            
        }
        await console.log(accNoPopUp);
        await console.log(accountNo.trim());
        await browser.acceptAlert()
        await browser.pause(3000)
    })
    xit('validation in active customer page',async()=>{
        await browser.pause(3000)
        const staffHomeLink = await browser.$("[name='home']")
        await staffHomeLink.click()
        const viewActiveCustomerLink = await browser.$("[name='viewdet']")
        await viewActiveCustomerLink.click()

        var validate = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//td[4]")
        await console.log("validate length="+validate.length);
        for (let index = 0; index < validate.length; index++) {
            var validateAccountNo = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//td[4]")[index].getText()
            if (validateAccountNo==(accountNo.trim())) {
                console.log("test case passed");
                break
            }
        }
    })
    xit('validation in view by accountNo page',async()=>{
        const staffHomeLink = await browser.$("[name='home']")
        await staffHomeLink.click()
        await expect(browser).toHaveTitle("Staff Home")
        const viewByAccountNoLink = await browser.$("[name='view_cust_by_ac']")
        await viewByAccountNoLink.click()
        await expect(browser).toHaveTitle("Customer Details")
        const accountNoTextFiled = await browser.$("[name='account_no']")
        await accountNoTextFiled.setValue(accountNo.trim())
        await browser.pause(3000)
        const submitButtonForviewCustomerByAccount = await browser.$("[name='submit_view']")
        await submitButtonForviewCustomerByAccount.click()
        const customerDetailselement = await browser.$("//span[text()='Customer Details']")
        await expect(customerDetailselement).toBeDisplayed()
        const StaffLogoutLink = await browser.$("[name='logout_btn']")
        await StaffLogoutLink.click()
        await expect(browser).toHaveTitle("Staff Page")
    })
})