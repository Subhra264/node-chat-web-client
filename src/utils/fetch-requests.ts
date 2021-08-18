import { Dispatch } from "react";
import { manageUser } from "./actions/User.actions";
import ResponseError, { ResponseErrorJSON } from "./ResponseError";

interface APIResponseBody {
    type: string;
    message: any;
}

export interface FetchDetails {
    fetchURI: string;
    method: string;
    body?: any;
} 

// Refreshes both the access token and the refresh token
// and uses the newly generated access token to retry fetching
// the original endpoint
function refreshTokens (retryFetchingWithAccess: (newAccessToken: string) => void, dispatch: Dispatch<any>, mainErrorHandler: (err: Error) => any ) {

    const fetchDetails = {
        fetchURI: '/api/auth/refresh-token/',
        method: 'POST'
    };

    const successHandler = (result: APIResponseBody) => {

        // Update the localStorage
        localStorage.setItem('user', JSON.stringify({
            username: result.message.username,
            userId: result.message.userId
        }));

        // Update the User store state
        dispatch(manageUser(result.message));

        // Retry fetching the original endpoint with new access token
        retryFetchingWithAccess(result.message.accessToken);
    };

    const errorHandler = (err: Error) => {
        // Do something
        localStorage.removeItem('user');
        dispatch(manageUser(null));
        mainErrorHandler(err);
    };

    // Makes request to '/api/auth/refresh-token/'
    protectedRequest(
        fetchDetails,
        '',
        successHandler,
        errorHandler
    );

}

// Used to authenticate the user( for Login and Sign up) 
export async function authenticate(authUri: string, reqBody: any) {
    try {
        const response = await fetch(`/api/auth/${authUri}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        const result = await response.json();

        if (result.type === 'error') throw new ResponseError(result.message);
        return result.message;

    } catch (err) {
        throw err;
    }
}


/**
 * Makes GET request to the given URI
 * 
 * @param getURI The GET URI to make fetch request to
 * @param accessToken The access token to check for authentication
 * @param successHandler Function to call after success response
 * @param errorHandler Function to call when an error occurs
 * @param dispatch Though not mandatory, but must be provided to refresh tokens automatically
 */
export function getRequest (getURI: string, accessToken: string, successHandler: Function, errorHandler: (err: Error) => any, dispatch?: Dispatch<any>) {
    // Make a GET request to the given getURI
    fetch(getURI, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => (
        res.json()
    ))
    .then((result: APIResponseBody) => {
        if (result.type === 'error') {
            if (result.message.message === 'token_not_valid' && dispatch) {
                refreshTokens((newAccessToken: string) => (
                    // We don't need to pass the dispatch function here
                    // as we need to refresh the token only once
                    getRequest(getURI, newAccessToken, successHandler, errorHandler)
                ), dispatch, errorHandler);
            } else {
                throw new ResponseError(result.message as ResponseErrorJSON);
            }
        }

        successHandler(result.message);
    })
    .catch((err: Error) => {
        errorHandler(err);
    });
}


/**
 * Makes request to the given protected endpoint
 * 
 * @param fetchDetails Contains all the details for fetch request
 * @param accessToken The access token for authentication
 * @param successHandler Function to call after success
 * @param errorHandler Function to call when an error occurs
 * @param dispatch Though not mandatory, but must be provided to refresh tokens automatically
 */
export function protectedRequest (fetchDetails: FetchDetails, accessToken: string, successHandler: Function, errorHandler: (err: Error) => any, dispatch?: Dispatch<any>) {
    
    fetch(fetchDetails.fetchURI, {
        method: fetchDetails.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(fetchDetails.body)
    })
    .then(res => (
        res.json()
    ))
    .then(result => {
        console.log('Fetch result', result);
        if (result.type === 'error') {
            if (result.message.message === 'token_not_valid' && dispatch) {
                // We don't need to pass dispatch function second time
                refreshTokens((newAccessToken: string) => (
                    protectedRequest(fetchDetails, newAccessToken, successHandler, errorHandler)
                ), dispatch, errorHandler);
            } else {
                throw new ResponseError(result.message as ResponseErrorJSON);
            }
        }

        successHandler(result.message);
    })
    .catch((err: Error) => {
        errorHandler(err);
    });
}