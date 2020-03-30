
export const ValidEmail = (value, check) => {
    //if optional and left blank do not validate
    if(!value){
        return true
    }
    return value.match("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$") || 'Invalid Email'
}