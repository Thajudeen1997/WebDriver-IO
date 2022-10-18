const fs = require('fs')
var AccountDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/openAccountDatas.json"))
var staffLoginDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/loginCredentials.json"))
const OpenAccountPage = require("../pageobjects/OpenAccount.page")
const HomePAge = require("../pageobjects/Home.Page")
const StaffHomePAge = require("../pageobjects/StaffHome.Page")
const StaffLoginPage = require("../pageobjects/StaffLogin.page")
const ApproveCustomerPage = require("../pageobjects/ApproveAccount.page")
const activeCustomerPage = require("../pageobjects/activeCustomer.page")
const ViewCustomerByAccNo = require("../pageobjects/viewAccountByNo.page")
const applyDebitCardPage = require("../pageobjects/applyForDebitCard.page")
const exp = require('constants')
describe("Creating account and approving the account", async () => {

    var applicationNo = ''
    var accountNo = ''
    it('opening application', async () => {
        await browser.url("https://rmgtestingserver/domain/Online_Banking_System/")
        await browser.maximizeWindow()
        await expect(browser).toHaveTitle('Online Banking System')
    })
    it('launching open account page', async () => {

        await HomePAge.OpenAccountPageLink.click()
        await expect(browser).toHaveTitle('Registration Form')

    })
    AccountDatas.forEach(({ accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
        officeAdd, state, city, pincode, area, accountType }) => {
        it('Filling open Account details', async () => {

            await OpenAccountPage.OpenAccount(accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
                officeAdd, state, city, pincode, area, accountType)
            var applicationAlert = await browser.getAlertText()
            for (let index = 0; index < applicationAlert.length; index++) {
                if ((applicationAlert.charAt(index) >= 0 && applicationAlert.charAt(index) <= 9) && applicationAlert.charAt(index) != " ") {
                    applicationNo = applicationNo + applicationAlert.charAt(index)
                }
            }
            await console.log('appNo=' + applicationNo.trim());
            await browser.acceptAlert()
            // await console.log(applicationNo);
            await browser.pause(3000)

        })
    })
    staffLoginDatas.forEach(({ StaffId, password }) => {
        it('login to manager module', async () => {
            await HomePAge.StaffLoginPageLink.click()
            await expect(browser).toHaveTitle("Staff Page")
            await StaffLoginPage.StaffLoginAction(StaffId, password)
            await expect(browser).toHaveTitle("Staff Home")
        })
    })

    it('approve customer', async () => {

        await StaffHomePAge.ApproveCutomerPageLink.click()
        await expect(browser).toHaveTitle("Pending Customers")
        await ApproveCustomerPage.appNoSearchBar.setValue(applicationNo.trim())
        await ApproveCustomerPage.searchAppNoButton.click()
        await ApproveCustomerPage.approveButton.click()
        var accNoPopUp = await browser.getAlertText()
        for (var index = 0; index < accNoPopUp.length; index++) {
            if ((accNoPopUp.charAt(index) >= 0 && accNoPopUp.charAt(index) <= 9) && accNoPopUp.charAt(index) != " ") {
                accountNo = accountNo.concat(accNoPopUp.charAt(index))
            }

        }
        await console.log(accNoPopUp);
        await console.log(accountNo.trim());
        await browser.acceptAlert()
        await browser.pause(3000)
    })
    it('Manager Logging out', async () => {
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle("Staff Page")
        await HomePAge.HomePageLink.click()
        await expect(browser).toHaveTitle("Online Banking System")

    })
    it('applying for debit card', async () => {
        const applyDebitCardLink = await browser.$("=Apply Debit Card")
        await applyDebitCardLink.click()
        await HomePAge.ApplyDebitCardPageLink.click()
        await expect(browser).toHaveTitle("Apply Debit Card")
        const ADCTextField = await browser.$("[name='holder_name']")
        await ADCTextField.setValue("thaju")
        const ADCdateOfBirth = await browser.$("[name='dob']")
        await ADCdateOfBirth.setValue("07/10/1997")
        const ADCpanNO = await browser.$("[name='pan']")
        await ADCpanNO.setValue("AWGPTCY23")
        const ADCmobileNo = await browser.$("[name='mob']")
        await ADCmobileNo.setValue(9003947855)
        const ADCaccountNoTextField = await browser.$("[name='acc_no']")
        await ADCaccountNoTextField.setValue(accountNo.trim())
        const ADCsubmitButton = await browser.$("[name='dbt_crd_submit']")
        await ADCsubmitButton.click()

        var debitCardPopUpText = await browser.getAlertText()
        var debitCardTextNo = ''
        for (var index = 0; index < debitCardPopUpText.length; index++) {
            if ((debitCardPopUpText.charAt(index) >= 0 && debitCardPopUpText.charAt(index) <= 9) && debitCardPopUpText.charAt(index) != " ") {
                debitCardTextNo = debitCardTextNo.concat(debitCardPopUpText.charAt(index))
            }
        }
        var debitCarddetails = debitCardTextNo.trim()
        for (var index = 0; index <= 12; index++) {
            debitCardNo = debitCardNo + debitCarddetails.charAt(index)
        }
        console.log("debitcardNo=" + debitCardNo);
        await browser.acceptAlert()
        await expect(browser).toHaveTitle("Apply Debit Card")
        const HomePageLink = await browser.$("=Home")
        await HomePageLink.click()
        await expect(browser).toHaveTitle("Online Banking System")
    })
    it('login to manager module', async () => {
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


    it('validation in active customer page', async () => {
        // await browser.pause(3000)
        // const staffHomeLink = await browser.$("[name='home']")
        // await staffHomeLink.click()
        const viewActiveCustomerLink = await browser.$("[name='viewdet']")
        await viewActiveCustomerLink.click()

        var validate = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//td[11]")
        await console.log("validate length=" + validate.length);
        for (let index = 0; index < validate.length; index++) {
            var validateDebitCardtNo = await browser.$$("//div[@class='active_customers_container']/descendant::tbody//td[11]")[index].getText()
            if (validateDebitCardtNo == (debitCardNo)) {
                console.log("test case passed");
                break
            }
        }
    })
    it('logging out manager module', async () => {
        const staffHomeLink = await browser.$("[name='home']")
        await staffHomeLink.click()
        await expect(browser).toHaveTitle("Staff Home")
        const StaffLogoutLink = await browser.$("[name='logout_btn']")
        await StaffLogoutLink.click()
        await expect(browser).toHaveTitle("Staff Page")
    })
    xit('validation in view by accountNo page', async () => {
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
    })
})