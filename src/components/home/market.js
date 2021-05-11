import { useApi } from '../utilities/useApi'
import { getApi } from '../utilities/useApi';
import { Container, Row, Card, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Performance from './performance';
import { Number_Formatter } from '../utilities/number_formatter';
import './home.css';
import {
    useQuery,
  } from 'react-query'

function Top_Users({ avatar, username, threem, followers, reviews, monthly_price}) {
return (
    <Col className='top-trader-column'>
        <Card>
            <Card.Img variant="top" src={avatar} />
                <Card.Body>
                    <Card.Title>
                        <div className="username">
                            <a href={'/' + username}>@{username}</a>
                        </div>
                    </Card.Title>
                            <div className="performance_text">
                                <p>3 Months: {threem}%</p>
                            </div>
                            <div className="social_text">
                                Followers: {followers}
                                <p>Reviews: {reviews}</p>
                            </div>
                            <div className="monthly_fee">
                                Fee: ${monthly_price}
                            </div>
            </Card.Body>
        </Card>
        </Col>
    )
}

function Market (){
    const query = useQuery(`get-topusers`, getApi('/user/list'))
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
        var x = 0

        const width = window.innerWidth

        var traders_per_page = 0
        if (width <= 1000) {
            console.log("2")
            traders_per_page = 2 
        }
        if (width => 1500 && width > 1000) {
            console.log("3")
            traders_per_page = 3 
        }
        if (width > 1500 && width <= 1700) {
            console.log("4")
            traders_per_page = 4
        }
        if (width => 1800) {
            console.log("5")
            traders_per_page = 5
        }

        return (
            <div>
                <div className="title-text">Top Traders</div>
                <Container className='top-traders-col'>
                    <Row className="top-traders-row">
                        {
                            
                            data.slice(x,traders_per_page).map(e =>(
                                <Top_Users
                                    avatar = {e.avatar}
                                    username = {e.username}
                                    threem = {e.three_month_perf}
                                    followers = {Number_Formatter(e.followers, 2)}
                                    reviews = {Number_Formatter(e.reviews, 0)}
                                    monthly_price = {e.monthly_price}
                                />
                            )
                            )
                        
                        }
                    </Row>
                </Container>
                </div>
        )
}
}
export default Market;