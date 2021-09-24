import { FetchDetails, protectedRequest } from './fetch-requests';
import { User } from './reducers/User.reducer';

// Single-ton pattern for TokenManager so that 
// only one instance is used throughout the application
export default class TokenManager {
    private static TokenManager_: TokenManager;
    private token_: string | null;

    private constructor () {
        this.token_ = null;
    }

    public static get tokenManager (): TokenManager {
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

    public get token (): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.token_) return resolve(this.token_);
            
            // TODO: Remember to add time-checker to check if one hour has passed
            // TODO: as access-token will expire after an hour

            const fetchDetails: FetchDetails = {
                fetchURI: '/api/auth/refresh-token/',
                method: 'POST'
            };

            const successHandler = (result: User) => {
                console.log('Refresh token successHanlder', result);
        
                // Update the localStorage
                localStorage.setItem('user', JSON.stringify({
                    username: result.username,
                    userId: result.userId
                }));
        
                // Update the User store state
                // dispatch(manageUser(result));
        
                // Retry fetching the original endpoint with new access token
                // retryFetchingWithAccess(result.accessToken as string);

                this.token_ = result.accessToken as string;
                resolve(this.token_);
            };

            const errorHandler = (err: Error) => {
                console.log('Hello from errorHandler fetchRequest', err);
                // Remove all user data from all the stores
                localStorage.removeItem('user');
                // dispatch(manageUser(null));
                
                // Call the actual errorHandler
                // mainErrorHandler(err);

                reject(err);
            };

            protectedRequest(
                fetchDetails,
                '',
                successHandler,
                errorHandler
            );
        })
    }
}