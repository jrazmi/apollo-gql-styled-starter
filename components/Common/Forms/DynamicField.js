import { FormGroup, FormControl, FormLabel, FormText } from './Styles'
import { PrepareValidation } from './Validation';

export const DynamicField = ({field, register, errors, formState, getValues}) => {
    switch(field.type){
        case "text":
        case "email":
        case "password":
        case "tel":
            return(
                <FormGroup>
                    {field.label && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}
                    <FormControl error={errors && errors[field.name] ? 1 : 0} type={field.type} id={field.id ? field.id : field.name} name={field.name}  ref={register(PrepareValidation(field.validation, getValues))} placeholder={field.placeholder ? field.placeholder : ""} readOnly={field.readonly} disabled={field.disabled}/>
                    {errors && errors[field.name] && <FormText> {errors[field.name] && errors[field.name].message ? errors[field.name].message : 'Required'} </FormText>}
                </FormGroup>
            );
        default:
            return null
    }
    
}