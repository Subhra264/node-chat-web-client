import { Route, Switch, Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import useUserSelector from '../../hooks/useUserSelector';
import ChatBodyContainer from './BodyContainer/ChatBodyContainer/ChatBodyContainer';
import Profile from './BodyContainer/Profile/Profile';

const Protected: React.FC = () => {
    const isAuthenticated = useUserSelector();
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
            <Route path={['/:groupId/channels/:channelId', '/profile/@me']} key='chat-body'>
                <ChatBodyContainer />
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