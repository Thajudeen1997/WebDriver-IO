const fs = require('fs')
var AccountDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/openAccountDatas.json"))
var staffLoginDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/loginCredentials.json"))
const OpenAccountPage = require("../pageobjects/OpenAccount.page")
const HomePAge = require("../pageobjects/Home.Page")
const StaffHomePAge = require("../pageobjects/StaffHome.Page")
const StaffLoginPage = require("../pageobjects/StaffLogin.page")
const ApproveCustomerPage = require("../pageobjects/ApproveAccount.page")
describe("Creating account and approving the account", async () => {

    var applicationNo = ''
    var accountNo = ''
    it('opening application', async () => {
        await browser.url("https://rmgtestingserver/domain/Online_Banking_System/")
        await browser.maximizeWindow()
        await expect(browser).toHaveTitle('Online Banking System')
    })
   xit('launching open account page', async () => {

        await HomePAge.OpenAccountPageLink.click()
        await expect(browser).toHaveTitle('Registration Form')

    })
    AccountDatas.forEach(({ accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
        officeAdd, state, city, pincode, area, accountType }) => {
        xit('Filling open Account details', async () => {

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
        xit('login to manager module', async () => {
            await HomePAge.StaffLoginPageLink.click()
            await expect(browser).toHaveTitle("Staff Page")
            await StaffLoginPage.StaffLoginAction(StaffId,password)
            await expect(browser).toHaveTitle("Staff Home")
        })
    })
   
    xit('approve customer', async () => {

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
    xit('Manager Logging out',async()=>{
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle("Staff Page")
        await HomePAge.HomePageLink.click()
        await expect(browser).toHaveTitle("Online Banking System")
   
    })
    it('registering for intenet banking', async()=>{
        const internetBgLink = await browser.$("//div[@class='ebanking']")
        // console.log("msg"+internetBgLink);
        // await browser.elementHover(browser.$("a=Internet Banking"))
        
        // browser.pause(5000)
        // await internetBgLink.click()
        // browser.pause(5000)
        await internetBgLink.moveTo({10:20})
        await browser.pause(3000)
        console.log("*********");
        // const registerIBLink = await browser.$("//li[text()='Register']")
        // await registerIBLink.click()
        // await browser.pause(2000)
    })
})