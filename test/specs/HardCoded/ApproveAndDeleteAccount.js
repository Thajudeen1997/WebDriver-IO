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
    staffLoginDatas.forEach(({StaffId,password})=>{
        it('login to manager module', async () => {
            await HomePAge.StaffLoginPageLink.click()
            await expect(browser).toHaveTitle("Staff Page")
            await StaffLoginPage.StaffLoginAction(StaffId,password)
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
    it('deleting customer account ',async()=>{
        await StaffHomePAge.StaffHomeLInk.click()
        await expect(browser).toHaveTitle("Staff Home")
        await StaffHomePAge.DeleteCutomerPageLink.click()
        await expect(browser).toHaveTitle("Delete Customer")
        var customerId =""
        var acc = accountNo.trim()
        var convertedString = String(acc)
        await console.log("accttrim="+convertedString);
        for (var index = 6; index < convertedString.length; index++) {
            customerId=customerId+convertedString.charAt(index)
            
        }
        await console.log("customer Id="+customerId);
        await deleteCustomerPage.deleteCustomerAction(accountNo.trim(),customerId,"fraud")
        var deletePopUp = await browser.getAlertText()
        console.log("deletePopUp="+deletePopUp);
        // await expect(deletePopUp).toHaveTextContaining("Customer Deleted Successfully")
        if (deletePopUp=="Customer Deleted Successfully") {
            console.log("Test Case Passed");
        } else{
            console.log("Test case failed");
        }
        await browser.acceptAlert()
        await expect(browser).toHaveTitle("Delete Customer")
        // await staffHomeLink.click()
        // await expect(browser).toHaveTitle("Staff Home")
    })
    it('validation in view by accountNo page',async()=>{
        const staffHomeLink = await browser.$("[name='home']")
        await staffHomeLink.click()
        await StaffHomePAge.StaffHomeLInk.click()
        await expect(browser).toHaveTitle("Staff Home")
        const viewByAccountNoLink = await browser.$("[name='view_cust_by_ac']")
        await viewByAccountNoLink.click()
        await expect(browser).toHaveTitle("Customer Details")
        const accountNoTextFiled = await browser.$("[name='account_no']")
        await accountNoTextFiled.setValue(accountNo.trim())
        await browser.pause(3000)
        const submitButtonForviewCustomerByAccount = await browser.$("[name='submit_view']")
        await submitButtonForviewCustomerByAccount.click()
        const deleteCheckPopup = await browser.getAlertText()
        // await expect(browser).toHaveText("Customer not found")
        if (deleteCheckPopup=="Customer not found") {
            console.log("Test Case Passed");
        } else{
            console.log("Test case failed");
        }
    })
    it('logging out manager module',async()=>{
        const staffHomeLink = await browser.$("[name='home']")
        await staffHomeLink.click()
        await expect(browser).toHaveTitle("Staff Home")
        const StaffLogoutLink = await browser.$("[name='logout_btn']")
        await StaffLogoutLink.click()
        await expect(browser).toHaveTitle("Staff Page")
    })
    
}  )