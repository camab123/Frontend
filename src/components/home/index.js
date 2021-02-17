import axios from 'axios';
import { render } from 'react-dom';
import Market from './coin_list';
import React, { Component } from 'react';
import { getApi } from '../utilities/useApi';
import {
    useQuery,
  } from 'react-query'

function HomeContainer() {
    return (
        <div className="CoinContainer">
            <Market/>
        </div>
    )
}
export default HomeContainer;