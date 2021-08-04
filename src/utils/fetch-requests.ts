import ResponseError, { ResponseErrorJSON } from "./ResponseError";

interface APIResponseBody {
    type: string;
    message: any;
}

export interface FetchDetails {
    fetchURI: string;
    method: string;
    body: any;
} 

// 
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
 */
export function getRequest (getURI: string, accessToken: string, successHandler: Function, errorHandler: Function) {
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
        if (result.type === 'error') throw new ResponseError(result.message as ResponseErrorJSON);

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
 */
export function protectedRequest (fetchDetails: FetchDetails, accessToken: string, successHandler: Function, errorHandler: Function) {
    
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
        if (result.type === 'error') throw new ResponseError(result.message as ResponseErrorJSON);

        successHandler(result.message);
    })
    .catch((err: Error) => {
        errorHandler(err);
    });
}