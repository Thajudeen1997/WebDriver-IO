const fs = require('fs')
// const loginCredentials = JSON.parse(fs.readFileSync("./test/specs/TestData/loginCredentials.json"))
var AccountDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/openAccountDatas.json"))
var staffLoginDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/loginCredentials.json"))
const HomePAge = require("../pageobjects/Home.Page")
const JavaUtility = require('../pageobjects/JavaUtility')
const OpenAccountPage = require("../pageobjects/OpenAccount.page")
const PageTitle = require("../pageobjects/pageTitle")
const StaffHomePAge = require("../pageobjects/StaffHome.Page")
const StaffLoginPage = require("../pageobjects/StaffLogin.page")
describe('test run',async()=>{
    it('opening application -reg', async () => {
        await browser.url("https://rmgtestingserver/domain/Online_Banking_System/")
        await browser.maximizeWindow()
        // await expect(browser).toHaveTitle('Online Banking System')
        await console.log("Success\*****************************/");
    })
    // it('launching open account page', async () => {

    //     await HomePAge.OpenAccountPageLink.click()
    //     await expect(browser).toHaveTitle('Registration Form')

    // })
    // AccountDatas.forEach (({ accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
    //     officeAdd, state, city, pincode, area, accountType }) => {
    //         it('Filling open Account details', async () => {
        
    //             await OpenAccountPage.OpenAccount(accountHoldername, gender, mobileNo, emailId, LandlineNo, dateOfBirth, panNo, citizenshipNo, homeAdd,
    //                 officeAdd, state, city, pincode, area, accountType)
    //                 console.log(accountHoldername);
    //                 console.log(pincode);  
    //     })
    //     })
    // it('check  mousehover',async()=>{
    //     const ele = await browser.$("//span[text()='Account & Lists']")
    //     await browser.elementHover(ele)
    //     await browser.$("//span[text()='Your Wish List']").click()
    //     await browser.pause(5000)
    // })
    staffLoginDatas.forEach(({ StaffId, password }) => {
        it('login to manager module', async () => {
            await HomePAge.StaffLoginPageLink.click()
            await expect(browser).toHaveTitle("Staff Page")
            await StaffLoginPage.StaffLoginAction(StaffId, password)
            await expect(browser).toHaveTitle("Staff Home")
        })
    })
it('check page title',async()=>{
    await StaffHomePAge.ActiveCustomerPageLink.click()
    var abc = await JavaUtility.validationInActiveCustomerPage()
    await console.log("check="+abc);
    
})

})