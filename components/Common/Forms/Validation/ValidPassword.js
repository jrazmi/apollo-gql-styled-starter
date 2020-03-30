export const ValidPassword = (value, check) => {
    // kinda silly - but required should be set with normal react hook forms required option.
    if(!value) {
        return true
    }
    // just require at least 8 for now
    if(value.length < 8){
        return 'Must be at least 8 characters'
    }
    return true
}