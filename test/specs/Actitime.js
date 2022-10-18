describe.skip('launchinBrowser',async()=>{
    it('opening webpage',async()=>{
        await browser.url("https://demo.actitime.com/login.do")
        await browser.maximizeWindow()
        await console.log(browser.getTitle());
        await browser.$("[id='username']").click()
        var userName = await browser.$("[name='pwd']")
        await userName.keys("thajudeen1997@gmail.com")
        await console.log(userName.getText())
        await browser.$("[id=Password]").keys("9003947855")
        await browser.$('[class="button-1 login-button"]').click()
        await console.log(browser.getTitle);

    })
})
