class applyForDebitCardPage{
    get AFDCaccHolderNameTextFiled(){
        return $("[name='holder_name']")
    }
    get AFDCdateOFBirth(){
        return $("[name='dob']")
    }
    get AFDCpanNo(){
        return $("[name='pan']")
    }
    get AFDCmobileNo(){
        return $("[name='mob']")
    }
    get AFDCaccNoTextFiled(){
        return $("[name='acc_no']")
    }
    get AFDCsubmitButton(){
        return $("[name='dbt_crd_submit']")
    }
    async applyDebitCardAction(accHolderName,dob,panNo,mobileNo,accountNo){
        await this.AFDCaccHolderNameTextFiled.setValue(accHolderName)
        await this.AFDCdateOFBirth.setValue(dob)
        await this.AFDCpanNo.setValue(panNo)
        await this.AFDCmobileNo.setValue(mobileNo)
        await this.AFDCaccNoTextFiled.setValue(accountNo)
        await this.AFDCsubmitButton.click()
    }
}
module.exports = new applyForDebitCardPage()