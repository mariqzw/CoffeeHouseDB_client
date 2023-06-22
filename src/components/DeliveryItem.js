import { Card, Col } from 'react-bootstrap'

const DeliveryItem = ({data}) => {
    return (
        <Col xl={3} lg={4} sm={6} className="mt-3">
            <Card style={{width: 200, cursor: 'pointer'}}>                
                <Card.Body style={{height: 100, overflow: 'hidden'}}>
                    <p>Поставка: {data.date}</p>
                    {/* <strong>{data.date}</strong> */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DeliveryItem