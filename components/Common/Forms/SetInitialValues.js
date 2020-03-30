export const SetInitialValues = (definition, initialItem, router) => {
    const defaultValues = {};
    const fieldNames = [];
    // get array of fieldnames from form definition
    definition && definition.rows && definition.rows.map((section,idx) => {
        section.fields.map((field, idx) => {
            fieldNames.push(field.name);
        })
    });

    fieldNames && fieldNames.map((field, idx) => {
        // set initialvalues if they exist on the object
        if(initialItem && initialItem[field]){
            defaultValues[field] = initialItem[field];
        } 
        //override initialvaules if query param
        if(router && router.query && router.query[field]){
            defaultValues[field] = router.query[field];
        }
    });
    return defaultValues;
}