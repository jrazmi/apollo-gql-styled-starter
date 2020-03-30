export const MatchesInputValue = (value, check, getValues) => {
    if(!check.input){
        return true;
    }
    const currentValues = getValues();
    const checkValue = currentValues[check.input];
    return checkValue === value || `Must match ${check.input} field`;
}
