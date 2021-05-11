import { useApi } from '../utilities/useApi'
import { getApi } from '../utilities/useApi';
import { Container, Row, Card, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import './home.css';

import {
    useQuery,
  } from 'react-query'

function Performance({ Todays_Returns, Portfolio_Value, Top_Performer_1_Name, Top_Performer_1_Value, Top_Performer_2_Name, Top_Performer_2_Value, Top_Performer_3_Name, Top_Performer_3_Value}) {
return (
        <Col>
            <div className='todays-returns'>
                Today's Returns: {Todays_Returns}%
                <div className='Perform_Arrow_Returns_Up'><FaArrowUp/></div>
            </div>
            <div className='portfolio-value'>
                Portfolio Value: ${Portfolio_Value}
            </div>
            <div className='Top_Performers'>
                <div className='Top_Performer_1'>
                    {Top_Performer_1_Name}: ${Top_Performer_1_Value}
                    <div className='Perform_Arrow_Up'><FaArrowUp/></div>
                </div>
                <div className='Top_Performer_2'>
                    {Top_Performer_2_Name}: ${Top_Performer_2_Value}
                    <div className='Perform_Arrow_Up'><FaArrowUp/></div>
                </div>
                <div className='Top_Performer_3'>
                    {Top_Performer_3_Name}: ${Top_Performer_3_Value}
                    <div className='Perform_Arrow_Down'><FaArrowDown/></div>   
                </div>
            </div>
        </Col>
    )
}

function Performance_Graph (){
        const data = [
            {Todays_Returns: 2,
            Portfolio_Value: 93812,
            Top_Performer_1_Name: "AAPL",
            Top_Performer_1_Value: 223.21,
            Top_Performer_2_Name: "CCIV",
            Top_Performer_2_Value: 20.12,
            Top_Performer_3_Name: "TSLA",
            Top_Performer_3_Value: 687.31,}
        ]
        console.log(data)
        
        return (
            
                <Container className='performance-container'>
                    <Row className="performance-row">
                        <Col>
                        {
                            data.map(e =>(
                                <Performance
                                    Todays_Returns = {e.Todays_Returns}
                                    Portfolio_Value = {e.Portfolio_Value}
                                    Top_Performer_1_Name = {e.Top_Performer_1_Name}
                                    Top_Performer_1_Value = {e.Top_Performer_1_Value}
                                    Top_Performer_2_Name = {e.Top_Performer_2_Name}
                                    Top_Performer_2_Value = {e.Top_Performer_2_Value}
                                    Top_Performer_3_Name = {e.Top_Performer_3_Name}
                                    Top_Performer_3_Value = {e.Top_Performer_3_Value}
                                />
                            )
                            )
                        }
                    </Col>
                    </Row>
                </Container>
        )
}

export default Performance_Graph;