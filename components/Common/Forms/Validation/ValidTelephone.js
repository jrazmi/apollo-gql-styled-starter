export const ValidTelephone = (value, check) => {
    //if optional and left blank do not validate
    if(!value){
        return true
    }
    return value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) || "Invalid phone format"
}