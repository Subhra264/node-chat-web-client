import { Dispatch } from 'react';
import { manageUser } from './actions/User.actions';
import { FetchDetails, protectedRequest } from './fetch-requests';
import { User } from './reducers/User.reducer';
import store from './store';
import { 
    SSK_REFRESH_TOKEN_INVALID,
    SSV_REFRESH_TOKEN_INVALID_TRUE,
    SSK_USER
} from './storage-items';

interface RegisteredRequest {
    resolve: Function;
    reject: (err: Error) => any;
}

// Single-ton pattern for TokenManager so that 
// only one instance is used throughout the application
export default class TokenManager {
    private static TokenManager_: TokenManager;
    private token_: string | null;
    private busyFetching: boolean = false;
    private registeredRequests: RegisteredRequest[] = [];

    private constructor () {
        this.token_ = null;
    }

    public static get manager (): TokenManager {
        return this.TokenManager_;
    }

    public static activate () {
        if (!this.isActivated()) {
            this.TokenManager_ = new TokenManager();
        }
    }

    private static isActivated (): boolean {
        if (!this.TokenManager_) return false;
        return true;
    }

    public saveToken (token: string) {
        this.token_ = token;
        this.busyFetching = false;
        while (this.registeredRequests.length) {
            const { resolve } = this.registeredRequests.pop() as RegisteredRequest;

            resolve(token);
        }
    }

    private rejectRequests (err: Error) {
        this.busyFetching = false;
        while (this.registeredRequests.length) {
            const { reject } = this.registeredRequests.pop() as RegisteredRequest;

            reject(err);
        }
    }

    private registerRequest (requestToRegister: RegisteredRequest) {
        this.registeredRequests.push(requestToRegister);
    }

    public refreshToken () {
        const fetchDetails: FetchDetails = {
            fetchURI: '/api/auth/refresh-token/',
            method: 'POST'
        };

        const successHandler = (result: User) => {
            console.log('Refresh token successHanlder', result);
    
            const user = {
                username: result.username,
                userId: result.userId
            };

            // Update the sessionStorage
            sessionStorage.setItem(SSK_USER, JSON.stringify(user));
    
            // Update the User store state
            store.dispatch(manageUser(user));

            // Save the new accessToken and apply the mainSucessHandler
            this.saveToken(result.accessToken as string);
            // mainSuccessHandler(this.token_);
        };

        const errorHandler = (err: Error) => {
            console.log('Hello from errorHandler fetchRequest', err);
            // Remove all user data from all the stores
            sessionStorage.removeItem(SSK_USER);

            // Set REFRESH_TOKEN_INVALID as true in sessionStorage so that
            // The Login page don't again fetch for a access token using 
            // the invalid refresh token
            sessionStorage.setItem(SSK_REFRESH_TOKEN_INVALID, SSV_REFRESH_TOKEN_INVALID_TRUE);

            store.dispatch(manageUser(null));
            
            // Reject with err
            // mainErrorHandler(err);
            this.rejectRequests(err);
        };

        protectedRequest(
            fetchDetails,
            successHandler,
            errorHandler
        );
    }

    public getToken (): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.token_) return resolve(this.token_);
            
            // TODO: Remember to add time-checker to check if one hour has passed
            // TODO: as access-token will expire after an hour

            this.registerRequest({ resolve, reject });

            // If the TokenManager is not already busy fetching the new access token
            // then only try refreshing the token. This flag is just to ensure that
            // the TokenManager makes only one POST request to /refresh-token even if
            // multiple react components ask for the access token from Token Manager
            // in a very short time-span.
            if (!this.busyFetching) {
                this.busyFetching = true;
                // Refresh the access-token and save it
                this.refreshToken();
            }

        });
    }
}