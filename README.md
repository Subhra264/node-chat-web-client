# Node-Chat-Web-Client

React + Redux Frontend for NodeChat.

## Storing JWT access token
Uses Access Token + Refresh Token pair to authorize an user. Refresh token is stored as Http-only cookie (server sends refresh token as http-only cookie). Whereas Redux store is used to store the access token given by the server. This way, access token is safe (or almost safe) from XSS attacks as well as CSRF attacks(only the refresh token is sent to the server in this case so the server responds with NotAuthorized error as access token is absent). When user refreshes the page, the client app, sends POST request to '/refresh' endpoint along with the refresh token(as http-only cookie) and the server responds with a new Access token that the client stores in the redux store.