import ResponseError, { ResponseErrorJSON } from "./ResponseError";
import TokenManager from "./TokenManager";

interface APIResponseBody {
    type: string;
    message: any;
}

export interface FetchDetails {
    fetchURI: string;
    method: string;
    body?: any;
    fetchingRefreshToken?: boolean;
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
 * @param successHandler Function to call after success response
 * @param errorHandler Function to call when an error occurs
 */
export function getRequest (getURI: string, successHandler: Function, errorHandler: (err: Error) => any) {
    
    // Get the access token first
    TokenManager.manager.getToken().then(accessToken => {

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
            console.log('Fetch result', result);
            if (result.type === 'error') {
                // TODO: Fix refreshToken logic below
                throw new ResponseError(result.message as ResponseErrorJSON);
            }
    
            successHandler(result.message);
        })
        .catch((err: Error) => {
            errorHandler(err);
        });
    })
    .catch((err: Error) => {
        errorHandler(err);
    });
    
}


/**
 * Makes request to the given protected endpoint
 * 
 * @param fetchDetails Contains all the details for fetch request
 * @param successHandler Function to call after success
 * @param errorHandler Function to call when an error occurs
 */
export function protectedRequest (fetchDetails: FetchDetails, successHandler: Function, errorHandler: (err: Error) => any) {
    
    const getFetchHeaders = (accessToken?: string): HeadersInit => {
        let fetchHeaders = {
            'Content-Type': 'application/json'
        };

        if (fetchDetails.fetchingRefreshToken) return fetchHeaders;
        return {
            ...fetchHeaders,
            'Authorization': `Bearer ${accessToken}`
        }
    };

    // Wrapper to the fetch API
    const fetchAPI = (headers: HeadersInit, fetchAPIErrorHandler: (err: Error) => any) => {
        // Fetch the given fetchURI
        fetch(fetchDetails.fetchURI, {
            method: fetchDetails.method,
            headers,
            body: JSON.stringify(fetchDetails.body)
        })
        .then(res => (
            res.json()
        ))
        .then(result => {
            console.log('Fetch result', result);
            if (result.type === 'error') {
                // TODO: Fix refreshTokens logic below
                throw new ResponseError(result.message as ResponseErrorJSON);
            }
    
            successHandler(result.message);
        })
        .catch(fetchAPIErrorHandler);
    };

    // When making request to /refresh-token POST endpoint
    // In this case we don't need to fetch the access-token
    if (fetchDetails.fetchingRefreshToken) {
        return fetchAPI(getFetchHeaders(), (err: Error) => {
            console.log('Hello from fetch-requests.protected method fetchingRefreshToken catch block', err);
            errorHandler(err);
        });
    }

    // Get the access token first
    TokenManager.manager.getToken().then(accessToken => {

        fetchAPI(getFetchHeaders(accessToken), (err: Error) => {
            errorHandler(err);
        });
    })
    .catch((err: Error) => {
        errorHandler(err);
    });
}