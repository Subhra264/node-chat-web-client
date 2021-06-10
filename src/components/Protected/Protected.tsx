import { Route, Switch } from 'react-router';
import ChatBodyContainer from './BodyContainer/ChatBodyContainer/ChatBodyContainer';

const Protected: React.FC = () => {
    return (
        <Switch>
            <Route path='/:groupId/channels/:channelId'>
                <ChatBodyContainer />
            </Route>
            <Route path='/profile/@me'>
                
            </Route>
        </Switch>
    );
};

export default Protected;