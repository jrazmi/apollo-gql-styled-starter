import { useForm } from 'react-hook-form';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { H2, Button } from '../Common/Typography';
import { GenerateFormFields } from '../Common/Forms/GenerateFormFields';
import { SubmitMutation, MarshallMutationResponse} from '../../lib/helpers';
import { StatusMessage } from '../Common/Forms/Messages';
import { SetInitialValues } from '../Common/Forms/SetInitialValues';
import { parseCookies, setCookie, destroyCookie } from 'nookies'



export const LoginForm = ({definition, mutation, requestContext, initialItem}) => {
    const router = useRouter()
    const client = useApolloClient()

    const { register, handleSubmit, formState, errors, setError, getValues } = useForm({
        mode: 'onBlur',
        defaultValues: SetInitialValues(definition, initialItem, router)
    });
    
    const [mutate, { data, error, loading }] = useMutation(mutation);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    // onSubmit should be allow for submissions independent of gql
    let onSubmit = async data => {
        let payload = data;
        const input = {
            input: payload
        }
        

        const response = await SubmitMutation(mutate, input);
        const result = await MarshallMutationResponse(response, requestContext.returnName ? requestContext.returnName : 'data');
        if(result && !result.error) {
            
            if(result.authenticationToken){
                try {
                    setCookie(null, 'token', result.authenticationToken, {
                        maxAge: 30 * 24 * 60 * 60, // 30 days
                        path: "/"
                    });
                    //set a hidden status message for testing
                    setSubmissionStatus({
                        "title": "Success",
                        "error": false,
                        "message": result && result.message ? result.message : "Logged In",
                        "hide": true
                    });
                    client.resetStore().then(() => {
                        // use window here to force full reload
                        window.location.href= definition.redirect;

                    })

                } catch(e){
                    console.log(e)
                    setSubmissionStatus({
                        "title": "Oh No",
                        "error": true,
                        "message": result && result.message ? result.message : "Error setting cookie."
                    });
                }
            } else {
                setSubmissionStatus({
                    "title": result && result.title ? result.title : 'Oh No',
                    "error": result && result.error ? result.error : false,
                    "message": result && result.message ? result.message : "An unexpected error occured."
                });
            }
        } else {
             setSubmissionStatus({
                    "title": result && result.title ? result.title : 'Oh No',
                    "error": result && result.error ? result.error : false,
                    "message": result && result.message ? result.message : "An unexpected error occured."
                });
        }
    }

    
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {
                definition && definition.header && definition.header.title &&
                <H2 uppercase={definition.header.title.uppercase} 
                    color={definition.header.title.color}>
                    {definition.header.title.content}
                </H2>
            }
            {
                submissionStatus && 
                <StatusMessage status={submissionStatus}/>
            }

            <GenerateFormFields definition={definition} register={register} errors={errors} formState={formState} getValues={getValues}/>
           
            <Button 
                type="submit" 
                color={definition && definition.button && definition.button.color}
                loading={loading ? 1 : 0}
            > 
            {
                loading 
                ?
                <span>
                    {definition && definition.button && definition.button.submittingName ? definition.button.submittingName : 'Submitting'}
                </span>
                :
                <span>
                    {definition && definition.button && definition.button.staticName ? definition.button.staticName : 'Submit'}
                </span>

            }
            </Button>
        </form>
    )



}

