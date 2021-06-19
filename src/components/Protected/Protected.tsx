import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import ChatBodyContainer from './BodyContainer/ChatBodyContainer/ChatBodyContainer';

const Protected: React.FC = () => {
    const isAuthenticated = useSelector(state => state);
    const location = useLocation();

    let routes: JSX.Element[];
    if (!isAuthenticated) {
        routes = [
            <Route key='redirect'>
                <Redirect 
                    to={{
                        pathname: '/log-in',
                        state: {
                            redirectTo: location.pathname
                        }
                    }} 
                />
            </Route>
        ];
    } else {
        routes = [
            <Route path='/:groupId/channels/:channelId' key='chat-body'>
                <ChatBodyContainer />
            </Route>,
            <Route path='/profile/@me' key='my-profile'>
                
            </Route>
        ];
    }

    return (
        <Switch>
            {routes.map(route => route)}
        </Switch>
    );
};

export default Protected;