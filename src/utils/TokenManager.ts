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

// Single-ton pattern for TokenManager so that 
// only one instance is used throughout the application
export default class TokenManager {
    private static TokenManager_: TokenManager;
    private token_: string | null;

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
    }

    public refreshToken (mainSuccessHandler: (newAccessToken: string) => any, mainErrorHandler: (err: Error) => any) {
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
            this.token_ = result.accessToken as string;
            mainSuccessHandler(this.token_);
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
            mainErrorHandler(err);
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

            // Refresh the access-token and save it
            this.refreshToken(resolve, reject);
        });
    }
}