import _ from 'lodash';
import { ValidEmail } from './ValidEmail';
import { ValidTelephone } from './ValidTelephone';
import { MatchesInputValue } from './MatchesInputValue';
import { ValidPassword } from './ValidPassword';

export const PrepareValidation = (validation, getValues) => {
    //field doesn't require validation
    if(!validation){
        return;
    }
    //field doesn't require custom validation
    if(!validation.custom || validation.custom.length <= 0){
        return validation;
    }

    let preparedValidation = _.omit(validation, 'custom');
    preparedValidation['validate'] = {};
    
    validation.custom.map((check, idx) => {
        switch(check.name){
            case "ValidEmail":
                preparedValidation['validate'][`valid_email_${idx}`] = value => ValidEmail(value, check);
                break;
            case "ValidTelephone":
                preparedValidation['validate'][`valid_telephone_${idx}`] = value => ValidTelephone(value, check);
                break;
            case "MatchesInputValue":
                preparedValidation['validate'][`matches_${idx}`] = value => MatchesInputValue(value, check, getValues);
                break;
            case "ValidPassword":
                preparedValidation['validate'][`valid_password_${idx}`] = value => ValidPassword(value, check);

            default:
                break;
        }
            
    });
    return preparedValidation;
}