import axios from 'axios';
import { render } from 'react-dom';
import React, { Component } from 'react';
import { getApi } from '../utilities/useApi';
import Profile_view from './profile';
import {
    useQuery,
  } from 'react-query'


function ProfileContainer() {
    return (
        <Profile_view/>
    )
}
export default ProfileContainer;