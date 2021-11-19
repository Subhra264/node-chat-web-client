import { useContext, useState } from 'react';
import { GroupContext } from '../../../../utils/contexts';
import { FetchDetails, protectedRequest } from '../../../../utils/fetch-requests';
import ModalBox from '../../../ModalBox/ModalBox';
import MemberList from './MemberList';

const GroupMemberList: React.FC = (props): JSX.Element => {
    const { groupId } = useContext(GroupContext); 
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteModalContent, setInviteModalContent] = useState('');

    const generateInviteLink = () => {
        setInviteModalContent('Generating Link...');
        setShowInviteModal(true);

        const successHandler = (result: any) => {
            console.log('Invitation link result', result);
            setInviteModalContent(window.location.host + '/join-group/' + result.invitationToken);
        };

        const errorHandler = (err: Error) => {
            setInviteModalContent('Error generating link...');
        };

        const fetchDetais: FetchDetails = {
            fetchURI: '/api/groups/create-invitation',
            method: 'POST',
            body: {
                groupId
            }
        };

        // Makes POST request to '/groups/create-invitation'
        protectedRequest(
            fetchDetais,
            successHandler,
            errorHandler
        );
    };

    return (
        <MemberList 
            fetchURI={`/api/groups/${groupId}/members`}
            effectDeps={[groupId]}
        >
            <div className="item add-item" onClick={generateInviteLink} >
                Invite Friends
            </div>
            <ModalBox
                show={showInviteModal}
                setShow={setShowInviteModal}
                name='Invitation Link'
            >
                <div className="invite-modal-content">
                    { inviteModalContent }
                </div>
            </ModalBox>
        </MemberList>
    );
};

export default GroupMemberList;