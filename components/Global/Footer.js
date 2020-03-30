import styled from 'styled-components';
import { Container, Row, Col } from '../Common';

const Foot = styled('footer')`
    background-color: ${props => props.theme.colors.primary};
    padding: 50px 0px;
    color: ${props => props.theme.colors.white};
`;

export const Footer = ({currentUser}) => {
    return(
        <Foot>

            <Container>
                <Row bsPrefix="row justify-content-center">
                    <Col md={4}>
                        HII
                    </Col>
                </Row>
            </Container>

        </Foot>
    )
}