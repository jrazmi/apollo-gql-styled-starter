import { Row, Col } from '../Grid';
import { Legend } from '../Typography';
import { DynamicField } from './DynamicField';


export const GenerateFormFields = ({definition, register, errors, formState, getValues}) => {
    return (
        <div>
        {
                definition && definition.rows && definition.rows.length > 0 &&
                definition.rows.map( (section, idx) => {
                    return(
                        <fieldset key={idx}>
                        {
                            section && section.legend && section.legend.content &&
                            <Row>
                                <Col>
                                    <Legend uppercase={section.legend.uppercase} color={section.legend.color}> 
                                        {section.legend.content}
                                    </Legend>
                                </Col>
                            </Row>
                        }
                        <Row key={idx} bsPrefix={section && section.row ? section.row : 'row'}>
                            {
                                section && section.fields && section.fields.length > 0 &&
                                section.fields.map( (field, idx) => {
                                    return(
                                        <Col bsPrefix={field && field.col ? field.col : 'col-lg-12'} key={idx}>
                                            <DynamicField field={field} register={register} errors={errors} formState={formState} getValues={getValues}/>   
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                        </fieldset>
                        
                    )
                })
            }

        </div>
    )
}