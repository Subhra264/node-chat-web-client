import { manageUser } from './actions/User.actions';
import { FetchDetails, protectedRequest } from './fetch-requests';
import { User } from './reducers/User.reducer';
import store from './store';
import {
  SSK_REFRESH_TOKEN_INVALID,
  SSV_REFRESH_TOKEN_INVALID_TRUE,
  SSK_USER,
} from './storage-items';

interface RegisteredRequest {
  resolve: Function;
  reject: (err: Error) => any;
}

interface Token {
  token: string;
  receivedAt: number;
}

// Single-ton pattern for TokenManager so that
// only one instance is used throughout the application
export default class TokenManager {
  private static TokenManager_: TokenManager;
  private token_: Token | null;
  private busyFetching: boolean = false;
  private registeredRequests: RegisteredRequest[] = [];

  private constructor() {
    this.token_ = null;
  }

  public static get manager(): TokenManager {
    return this.TokenManager_;
  }

  public static activate() {
    if (!this.isActivated()) {
      this.TokenManager_ = new TokenManager();
    }
  }

  private static isActivated(): boolean {
    if (!this.TokenManager_) return false;
    return true;
  }

  public saveToken(token: string) {
    this.token_ = {
      token,
      receivedAt: Date.now() / 1000,
    };
    this.busyFetching = false;
    while (this.registeredRequests.length) {
      const { resolve } = this.registeredRequests.pop() as RegisteredRequest;

      resolve(token);
    }
  }

  // Check if the stored access token has passed 50 minutes
  // If so, then return true
  private didTokenExpire() {
    // Convert 50 minutes to seconds
    const TOKEN_EXPIRATION_INTERVAL = 50 * 60;

    // The current time in seconds
    const CURR_TIME = Date.now() / 1000;

    if (
      CURR_TIME - (this.token_ as Token).receivedAt >
      TOKEN_EXPIRATION_INTERVAL
    ) {
      return true;
    }
    return false;
  }

  private rejectRequests(err: Error) {
    this.busyFetching = false;
    while (this.registeredRequests.length) {
      const { reject } = this.registeredRequests.pop() as RegisteredRequest;

      reject(err);
    }
  }

  private registerRequest(requestToRegister: RegisteredRequest) {
    this.registeredRequests.push(requestToRegister);
    console.log('Inside TokenManager registerRequest', this.registeredRequests);
  }

  public refreshToken() {
    console.log(
      'Inside TokenManager refreshToken, busyFetching?',
      this.busyFetching,
    );
    const fetchDetails: FetchDetails = {
      fetchURI: '/api/auth/refresh-token/',
      fetchingRefreshToken: true,
      method: 'POST',
    };

    const successHandler = (result: User) => {
      console.log('Refresh token successHanlder', result);

      const user = {
        username: result.username,
        userId: result.userId,
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
      sessionStorage.setItem(
        SSK_REFRESH_TOKEN_INVALID,
        SSV_REFRESH_TOKEN_INVALID_TRUE,
      );

      store.dispatch(manageUser(null));

      // Reject with err
      // mainErrorHandler(err);
      this.rejectRequests(err);
    };

    protectedRequest(fetchDetails, successHandler, errorHandler);
  }

  public getToken(): Promise<string> {
    console.log('TokenManager getToken before Promise');
    return new Promise((resolve, reject) => {
      console.log('TokenManager getToken inside Promise');
      if (this.token_) {
        // Check if 50 minutes(near expiry time) have passed after receiving
        // the access-token from the server. If not then return the strored
        // access-token
        console.log('TokenManager if this.token_', this.token_);
        if (!this.didTokenExpire()) {
          // TODO: Return the current token and asynchronously fetch a new access token
          console.log('TokenManager token expired?', this.didTokenExpire());
          return resolve(this.token_.token);
        }
      }

      // Register this request
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
