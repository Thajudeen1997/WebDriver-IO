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
const JavaUtility = require("../pageobjects/JavaUtility")
const PageTitle = require("../pageobjects/pageTitle")
const exp = require('constants')
describe("apply for debit card and validate in active customer page", async () => {
    let applicationNo
    let accountNo
    let debitCardNo
    let debitCardPinNo
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
    staffLoginDatas.forEach(({ StaffId, password }) => {
        it('login to manager module', async () => {
            await HomePAge.StaffLoginPageLink.click()
            await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
            await StaffLoginPage.StaffLoginAction(StaffId, password)
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
    it('Manager Logging out', async () => {
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
        await HomePAge.HomePageLink.click()
        await expect(browser).toHaveTitle(PageTitle.OnlineBankingSystemPage())
    })
    AccountDatas.forEach(({ accountHoldername, mobileNo, dateOfBirth, panNo }) => {
            it('applying for debit card', async () => {
                await HomePAge.ApplyDebitCardPageLink.click()
                await expect(browser).toHaveTitle(PageTitle.ApplyDebitCardPage())
                await applyDebitCardPage.applyDebitCardAction(accountHoldername,dateOfBirth,panNo,mobileNo,accountNo)
                var debitCardPopUpText = await browser.getAlertText()
                var debitCardTextNo = await JavaUtility.getNumberFromPopUp(debitCardPopUpText)
                debitCardNo = await JavaUtility.getDebitCardNoFromPopUp(debitCardTextNo)
                debitCardPinNo = await JavaUtility.getDebitCardPinNoFromPopUp(debitCardTextNo)
                console.log("debitcardNo=" + debitCardNo);
                await browser.acceptAlert()
                await expect(browser).toHaveTitle(PageTitle.ApplyDebitCardPage())
                await HomePAge.HomePageLink.click()
                await expect(browser).toHaveTitle(PageTitle.OnlineBankingSystemPage())
            })
        })
    staffLoginDatas.forEach(({ StaffId, password }) => {
            it('login to manager module', async () => {
                await HomePAge.StaffLoginPageLink.click()
                await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
                await StaffLoginPage.StaffLoginAction(StaffId, password)
                await expect(browser).toHaveTitle(PageTitle.StaffHomePage())
            })
        })
    
    it('validation in active customer page', async () => {
        await StaffHomePAge.ActiveCustomerPageLink.click()
        await expect(browser).toHaveTitle(PageTitle.AciveCustomerPage())
        let RequiredCoulumn = "Debit Card No."
        const result = await JavaUtility.validationInActiveCustomerPage(RequiredCoulumn,debitCardNo)
        await console.log("accNo="+accountNo);
        await console.log("debitcrdNo="+debitCardNo);
        await console.log("debitCardPin="+debitCardPinNo);
        await console.log("\********************"+result+"****************/");
    })
    it('logging out manager module', async () => {
        await StaffHomePAge.StaffLogoutLink.click()
        await expect(browser).toHaveTitle(PageTitle.StaffLoginPage())
        await HomePAge.HomePageLink.click()
        await expect(browser).toHaveTitle(PageTitle.OnlineBankingSystemPage())
    })
})