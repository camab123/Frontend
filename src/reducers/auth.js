import { axiosInstance } from '../components/utilities/useApi';
import { tokens } from './constants';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Actions
export function login(username, password) {
    // Return an async function for API calls
    return async dispatch => {
        try {
            const data = { username, password };
            const response = await axiosInstance.post('/user/token/obtain/', data);
            if (response === undefined) {
                throw Error("Incorrect username or password!");
            } else {
                dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            }
        } catch (error) {
            alert(error);
            dispatch({ type: LOGIN_FAIL });
        }
    }
}

export function logout() {
    return dispatch => {
        dispatch({ type: LOGOUT });
    }
}

// Reducer
const initialState = {
    accessToken: localStorage.getItem(tokens.ACCESS),
    refreshToken: localStorage.getItem(tokens.REFRESH),
    isAuthenticated: localStorage.getItem(tokens.REFRESH) !== null,
    isLoading: false,
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem(tokens.ACCESS, payload.access);
            localStorage.setItem(tokens.REFRESH, payload.refresh);
            window.location = '/home';
            return {
                ...state,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                isAuthenticated: true,
                isLoading: false,
            };
        }
        case LOGIN_FAIL:
        case LOGOUT: {
            localStorage.removeItem(tokens.ACCESS);
            localStorage.removeItem(tokens.REFRESH);
            if (type === LOGOUT) {
                window.location = '/login';
            }
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
}
