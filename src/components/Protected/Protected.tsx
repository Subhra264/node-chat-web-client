import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import ChatBodyContainer from './BodyContainer/ChatBodyContainer/ChatBodyContainer';

const Protected: React.FC = () => {
    const isAuthenticated = useSelector(state => state);

    let routes: JSX.Element[];
    if (!isAuthenticated) {
        routes = [
            <Route key='redirect'>
                <Redirect to='/log-in' />
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