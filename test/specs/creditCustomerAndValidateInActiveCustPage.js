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
const deleteCustomerPage = require("../pageobjects/deleteCustomer.page")
const creditCustomerPage = require("../pageobjects/creditCustomer.page")
const PageTitle = require("../pageobjects/pageTitle")
const JavaUtility = require("../pageobjects/JavaUtility")
const exp = require('constants')
describe("credit customer and validate in view by customer account number page", async () => {
    let applicationNo
    let accountNo
    var amount="1234"
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
            await console.log('appNo=' +applicationNo);
            await browser.acceptAlert()
            await browser.pause(3000)
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
   it('crediting the customer', async()=>{
    await StaffHomePAge.StaffHomeLInk.click()
    await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
    await StaffHomePAge.CreditCustomerPageLink.click()
    await expect(browser).toHaveTitle(PageTitle.CreditCustomerPage())
    await creditCustomerPage.CCaccountNoTextFiled.setValue(accountNo)
    await creditCustomerPage.CCamountTextFiled.setValue(amount)
    await creditCustomerPage.CCcreditButton.click()
    var creditAlertText = await browser.getAlertText()
    await expect(creditAlertText).toContain("Amount credited Successfully to customer account")
   })
   it('validation in view by customer account number page', async () => {
    await StaffHomePAge.StaffHomeLInk.click()
    await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
    await StaffHomePAge.ViewByAccountNoPageLink.click()
    await expect(browser).toHaveTitle(PageTitle.ViewCustomerByACCNoPage())
    await ViewCustomerByAccNo.VCBNaccountNoTextField.setValue(accountNo)
    await ViewCustomerByAccNo.VCBNsubmitbuttonViewCustByAccNo.click()
    var creditCheck = await browser.$("//label[contains(text(),'Available Balance')]").getText()
    await console.log("creditCheck="+creditCheck);
    await expect(creditCheck).toContain(amount)
})
    it('logging out manager module',async()=>{
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
        await HomePAge.HomePageLink.click()
        await expect(browser).toHaveTitle(PageTitle.OnlineBankingSystemPage())
    })   
})