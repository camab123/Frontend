import { useApi } from '../utilities/useApi'
import { getApi } from '../utilities/useApi';
import { Container, Row, Card, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Number_Formatter } from '../utilities/number_formatter';
import { FontAwesome } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import './profile.css';
import {
    useQuery,
  } from 'react-query'

function Profile_interface({username, first_name, last_name, avatar, bio, location, followers, reviews, monthly_price, three_month, six_month, one_year, three_year, five_year}){
    return (
        
        <Card className='profile-card'>
            <div className='side-bar-line'>

            </div>
            <Card.Body>
            <Card.Title>
                <Row className="profile-top-row">
                    <Col xs={3}className="profile-image-column">
                        <Card.Img className ="profile-avatar" variant="top" src={avatar} />
                    </Col>
                    <Col xs={4} className="main-profile-row">
                        <div className="profile-username">
                            {first_name} {last_name}
                            <br/>
                        </div>
                        <div className="profile-tag">
                            @{username}
                        </div>
                        
                        <div className="profile-bio">
                            {bio}
                        </div>
                        <div className="profile-social-info">
                            <div className="profile-followers">
                                {followers} <p>Followers</p>
                            </div>
                            <div className="profile-reviews">
                                {reviews} <p>Reviews</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="profile-monthly">
                            <div className="profile-monthly-fee">
                                Monthly cost: ${monthly_price}
                            </div>
                        </div>
                        <div className="profile-rating">
                            Rating: <p><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/></p>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div className="social-media-container">
                            <div className="profile-facebook">
                                <FaFacebookF/>
                            </div>
                            <div className="profile-twitter">
                                <FaTwitter/>
                            </div>
                            <div className="profile-instagram">
                                <FaInstagram/>
                            </div>
                        </div>
                    </Col>
                </Row>
                </Card.Title>
                <Row>
                    <Col xs={3}>
                        <div className="performance-container">
                            <div className="performance-title">
                                Performance
                            </div>
                            <div className="performance-statistics">
                                <div>
                                    Three Months: <p>{three_month}%</p>
                                </div>
                                <br/>
                                <div>
                                Six Months: <p>{six_month}%</p>
                                </div>
                                <br/>
                                <div>
                                One Year: <p>{one_year}%</p>
                                </div>
                                <br/>
                                <div>
                                Three Years: <p>{three_year}%</p>
                                </div>
                                <br/>
                                <div>
                                Five Years: <p>{five_year}%</p>
                                </div>
                            </div>
                        </div>
                        
                    </Col>
                    <Col xs={8}>
                        <h1>    </h1>
                    </Col>
                </Row>
            </Card.Body>
            </Card>
        
    )
}

function Profile_view({ avatar, bio, location, followers, reviews, monthly_price}){
    var url = (window.location.href)
    var username = url.substring(22)
    const query = useQuery(`get-profile`, getApi('/user/' + username))
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
        var thisDay = new Date("May 23, 2018 14:35:08");
        
           
    return (
        <Col className='profile-view-container'>
            {
                
                data.map(e => (
                    <Profile_interface
                        username = {e.username}
                        first_name = {e.first_name}
                        last_name = {e.last_name}
                        bio = {e.bio}
                        avatar = {e.avatar}
                        location = {e.location}
                        followers = {Number_Formatter(e.followers,2)}
                        reviews = {Number_Formatter(e.reviews,0)}
                        monthly_price = {e.monthly_price}
                        three_month = {e.three_month_perf}
                        six_month = {e.six_month_perf}
                        one_year = {e.one_year_perf}
                        three_year = {e.three_year_perf}
                        five_year = {e.five_year_perf}
                    />
                )
                )
            }
        </Col>
    )
}
}

export default Profile_view;