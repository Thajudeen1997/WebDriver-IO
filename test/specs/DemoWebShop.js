describe('launchinBrowser',async()=>{
    it('opening webpage-reg',async()=>{
        await browser.url("https://demowebshop.tricentis.com/")
        await browser.maximizeWindow()
        await console.log(browser.getTitle());
        await browser.$('=Log in').click()

        
        var userName = await browser.$("[id=Email]")
        await userName.setValue("thajudeen1997@gmail.com")
        await console.log(userName.getText())
        await browser.$("[id=Password]").setValue("9003947855")
        await browser.$('[class="button-1 login-button"]').click()
        await console.log(browser.getTitle);
    })
})

