import axios from 'axios';
import { render } from 'react-dom';
import React, { Component } from 'react';
import { getApi } from '../utilities/useApi';
import Market from './market';
import Performance from './performance';
import {
    useQuery,
  } from 'react-query'


function HomeContainer() {
    return (
        <Market/>
    )
}
export default HomeContainer;