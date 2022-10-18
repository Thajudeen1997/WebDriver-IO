const fs = require('fs')
var AccountDatas = JSON.parse(fs.readFileSync("./test/specs/TestData/openAccountDatas.json"))
class openAccountpage{
    get NameTextField(){
        return $('[name="name"]')
    }
    get GenderDropDown(){
        return $("[name='gender']")
    }
    get MobileNo(){
        return $('[name="mobile"]')
    }
    get EmailId(){
        return  $('[name="email"]')
    }
    get LandLineNo(){
        return $('[name="landline"]')
    }
    get DateOfBirth(){
        return $('[name="dob"]')
    }
    get PanNo(){
        return $('[name="pan_no"]')
    }
    get CitizenShipNo(){
        return $('[name="citizenship"]')
    }
    get HomeAddress(){
        return $('[name="homeaddrs"]')
    }
    get OfficeAddress(){
        return $('[name="officeaddrs"]')
    }
    get State(){
        return $('[name="state"]')
    }
    get City(){
        return $('[name="city"]')
    }
    get PinCode(){
        return $('[name="pin"]')
    }
    get AreaOrLocality(){
        return $('[name="arealoc"]')
    }
    get AccountType(){
        return $('[name="acctype"]')
    }
    get SubmitButton(){
        return $('[name="submit"]')
    }
    get ConfirmSubmit(){
        return $('[name="cnfrm-submit"]')
    }
    async OpenAccount(accountHoldername,gender,mobileNo,emailId,LandLineNo,dateOfBirth,panNo,citizenshipNo,homeAdd,
        officeAdd,state,city,pincode,area,accountType){
        await this.NameTextField.setValue(accountHoldername)
        await this.GenderDropDown.selectByVisibleText(gender)
        await this.MobileNo.setValue(mobileNo)
        await this.EmailId.setValue(emailId)
        await this.LandLineNo.setValue(LandLineNo)
        await this.DateOfBirth.setValue(dateOfBirth)
        await this.PanNo.setValue(panNo)
        await this.CitizenShipNo.setValue(citizenshipNo)
        await this.HomeAddress.setValue(homeAdd)
        await this.OfficeAddress.setValue(officeAdd)
        await this.State.selectByVisibleText(state)
        await this.City.selectByVisibleText(city)
        await this.PinCode.setValue(pincode)
        await this.AreaOrLocality.setValue(area)
        await this.AccountType.selectByVisibleText(accountType)
        await this.SubmitButton.click()
        await expect(browser).toHaveTitle('Confirm')
        await this.ConfirmSubmit.click()
    }
}
module.exports = new openAccountpage()