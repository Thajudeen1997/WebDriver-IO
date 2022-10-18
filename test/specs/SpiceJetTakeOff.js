describe ('book tickets',async()=>{
    it('opening web page',async()=>{
        await browser.url("https://www.spicejet.com/")
        await browser.maximizeWindow()
    })
    it('booking ticket',async()=>{
        await browser.$("//div[text()='round trip']").click()
        
        
        await browser.$("//div[text()='To']").click()
        var destination="Coimbatore"
        await browser.$("//div[text()='"+destination+"']").click()
        // await browser.pause(4000)
        // await browser.$("//div[text()='Select Date']").click()
        
        var month1="December"
        var year1=2022
        var day1=16
        var selectDate = await browser.$("//div[@data-testid='undefined-month-"+month1+"-"+year1+"']/descendant::div[@data-testid='undefined-calendar-day-"+day1+"']")
        await selectDate.click()
        // await browser.$("//div[text()='"+month+" ']/parent::div/following-sibling::div[@class='css-1dbjc4n r-18u37iz r-a2tzq0 r-19yat4t']/following-sibling::div//descendant::div[@data-testid='undefined-calendar-day-"+day+"']").click()
        // await browser.pause(4000)
        var month2="January"
        var year2=2023
        var day2=29
        var selectDate = await browser.$("//div[@data-testid='undefined-month-"+month2+"-"+year2+"']/descendant::div[@data-testid='undefined-calendar-day-"+day2+"']")
        await selectDate.click()
        await browser.$("//div[text()='Armed Forces']").click()
        // await browser.pause(4000) 
        await browser.$("//div[text()='Search Flight']/parent::div").click()
        await browser.pause(4000) 
              
    })
})