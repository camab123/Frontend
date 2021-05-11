import { useApi } from '../utilities/useApi'
import { getApi } from '../utilities/useApi';
import { Container, Row, Card, Col } from 'react-bootstrap';
import './crypto_home.css';
import {
    useQuery,
  } from 'react-query'

function Coins({ name, price }) {
    return (
        <Row>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Row>
    )
}

function Market (){
    const query = useQuery(`get-coins`, getApi('/coins/'))
    const {isLoading, isError} = query;
    if(isError){
        return <p>ERROR</p>;
    }
    else if(isLoading){
        return <p>Loading...</p>;
    }
    else{
        /* we can only access the data once its loaded and there's no error.
        It's structured data: {data}, this is not a mistake
        */
        const {data: { data }} = query

        console.log(data)
        return (
            <div>
                <Container fluid='md'>
                <div className="title-text">
                    Crypto Currencies
                </div>
                
                {
                    data.map(e =>(
                        <Coins
                            name = {e.name}
                            price = {e.price}
                        />
                    )
                    )
                }
                </Container>
            </div>
        )
}
}
export default Market;