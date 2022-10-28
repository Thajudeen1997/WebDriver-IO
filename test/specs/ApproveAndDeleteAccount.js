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
const JavaUtility = require("../pageobjects/JavaUtility")
const PageTitle = require("../pageobjects/pageTitle")
const exp = require('constants')
describe("Delete account and validate in view By account No page", async () => {
    var applicationNo
    var accountNo
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
            await console.log('appNo=' + applicationNo);
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
    it('deleting customer account ',async()=>{
        await StaffHomePAge.StaffHomeLInk.click()
        await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
        await StaffHomePAge.DeleteCutomerPageLink.click()
        await expect(browser).toHaveTitle(PageTitle.DeleteCustomerPage())
        var convertedString = String(accountNo)
       let customerId = await JavaUtility.getCustomerIdFromAccNo(convertedString)
        await console.log("customer Id="+customerId);
        await deleteCustomerPage.deleteCustomerAction(accountNo,customerId,"fraud")
        var deletePopUp = await browser.getAlertText()
        console.log("deletePopUp="+deletePopUp);
        await expect(deletePopUp).toContain("Customer Deleted Successfully")
        await browser.acceptAlert()
        await expect(browser).toHaveTitle(PageTitle.DeleteCustomerPage())
    })
    it('validation in view by accountNo page',async()=>{
        await StaffHomePAge.StaffHomeLInk.click()
        await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
        await StaffHomePAge.ViewByAccountNoPageLink.click()
        await expect(browser).toHaveTitle(PageTitle.ViewCustomerByACCNoPage())
        await ViewCustomerByAccNo.VCBNaccountNoTextField.setValue(accountNo)
        await ViewCustomerByAccNo.VCBNsubmitbuttonViewCustByAccNo.click()
        const deleteCheckPopup = await browser.getAlertText()
        await expect(deleteCheckPopup).toContain("Customer not found")
        await browser.acceptAlert()
    })
    it('logging out manager module',async()=>{
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
        await HomePAge.HomePageLink.click()
        await expect(browser).toHaveTitle(PageTitle.OnlineBankingSystemPage())
    })   
})