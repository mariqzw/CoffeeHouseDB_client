import { Card, Col } from 'react-bootstrap'

const DrinkItem = ({data}) => {
    return (
        <Col xl={3} lg={4} sm={6} className="mt-3">
            <Card style={{width: 200, cursor: 'pointer'}}>                
                <Card.Body style={{height: 100, overflow: 'hidden'}}>
                    <p>Напиток: </p>
                    <strong>{data.name}</strong>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DrinkItem