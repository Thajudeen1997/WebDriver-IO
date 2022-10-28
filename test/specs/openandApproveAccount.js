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
const JavaUtility = require("../pageobjects/JavaUtility")
const PageTitle = require("../pageobjects/pageTitle") 
const exp = require('constants')
const expectchai = require("chai")
describe("Creating account and approving the account and validating in active customer page", async () => {

    let applicationNo 
    let accountNo
    it('opening application', async () => {
        await browser.url("https://rmgtestingserver/domain/Online_Banking_System/")
        await browser.maximizeWindow()
        await expect(browser).toHaveTitle(PageTitle.OnlineBankingSystemPage())
    })
    it('launching open account page', async () => {

        await HomePAge.OpenAccountPageLink.click()
        await expect(browser).toHaveTitle(PageTitle.RegistrationFormPage())

    })
    AccountDatas.forEach(({ accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
        officeAdd, state, city, pincode, area, accountType }) => {
        it('Filling open Account details', async () => {

            await OpenAccountPage.OpenAccount(accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
                officeAdd, state, city, pincode, area, accountType)
            var applicationAlert = await browser.getAlertText()
            applicationNo = await JavaUtility.getNumberFromPopUp(applicationAlert)
            await expectchai.assert.include(applicationAlert,"Submitted successfully", "Not equal")
            await console.log('appNo='+applicationNo);
            await browser.acceptAlert()
        })
    })
    staffLoginDatas.forEach(({StaffId,password})=>{
        it('login to manager module', async () => {
            await HomePAge.StaffLoginPageLink.click()
            await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
            await StaffLoginPage.StaffLoginAction(StaffId,password)
            await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
        })
    })
    it('approve customer', async () => {
        await StaffHomePAge.ApproveCutomerPageLink.click()
        await expect(browser).toHaveTitle(PageTitle.ApproveCustomerPage())
        await ApproveCustomerPage.appNoSearchBar.setValue(applicationNo)
        await ApproveCustomerPage.searchAppNoButton.click()
        await ApproveCustomerPage.approveButton.click()
        var accNoPopUp = await browser.getAlertText()
        accountNo = await JavaUtility.getNumberFromPopUp(accNoPopUp)
        await console.log(accountNo);
        await browser.acceptAlert()
    })
    it('validation in active customer page', async () => {
        await StaffHomePAge.StaffHomeLInk.click()
        await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
        await activeCustomerPage.viewActiveCustomerLink.click()
        await expect(browser).toHaveTitle(PageTitle.AciveCustomerPage())
        let RequiredCoulumn = "Account No."
        const result = await JavaUtility.validationInActiveCustomerPage(RequiredCoulumn,accountNo)
        await console.log("\********************"+result+"****************/");
    })
    xit('validation in view by accountNo page', async () => {
        await StaffHomePAge.StaffHomeLInk.click()
        await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
        await StaffHomePAge.ViewByAccountNoPageLink.click()
        await expect(browser).toHaveTitle(PageTitle.ViewCustomerByACCNoPage())
        await ViewCustomerByAccNo.VCBNaccountNoTextField.setValue(accountNo)
        await browser.pause(3000)
        await ViewCustomerByAccNo.VCBNsubmitbuttonViewCustByAccNo.click()
        const customerDetailselement = await browser.$("//span[text()='Customer Details']")
        await expect(customerDetailselement).toBeDisplayed()
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
    })
})