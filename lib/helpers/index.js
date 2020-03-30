export const MarshallMutationResponse = async (response, returnName) => {
    if(response.networkError && response.networkError.result && response.networkError.result.errors && response.networkError.result.errors.length > 0){
        return{
            title: "Uh Oh",
            error: true,
            message: response.networkError.result.errors[0].message.replace('GraphQL error: ', '')
        }
    }
  
    if(!response.data || !response.data[returnName]){
        let message = "Invalid response";
        if(response.message) {
            message = response.message.replace('GraphQL error: ', '')
        }
        return {
            title: "Uh Oh",
            error: true,
            message: message,
        }
    }
    if(response.data && response.data[returnName] && response.data[returnName]['__typename'] && response.data[returnName]['__typename'].endsWith('Error')){
        let message = "Invalid response";
        if(response.data[returnName].message){
            message = response.data[returnName].message;
        }
        return {
            title: "Uh Oh",
            error: true,
            message: message
        }
    }
    
    return response['data'][returnName];
}

export const SubmitMutation = async (mutation, payload) => {
    let response;
    try{
        response = await mutation({variables: {...payload}});
    } catch(e) {
        response = e;
    }
    return response;
}