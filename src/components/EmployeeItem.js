import { Card, Col } from 'react-bootstrap'

const EmployeeItem = ({data}) => {
    return (
        <Col xl={3} lg={4} sm={6} className="mt-3">
            <Card style={{width: 200, cursor: 'pointer'}}>                
                <Card.Body style={{height: 100, overflow: 'hidden'}}>
                    <p>Сотрудник: {data.surname}</p>
                    <strong>{data.position}</strong>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default EmployeeItem