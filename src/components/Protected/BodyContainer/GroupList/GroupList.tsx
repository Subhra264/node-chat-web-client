import {
  MouseEventHandler,
  MouseEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FetchDetails,
  getRequest,
  protectedRequest,
} from '../../../../utils/fetch-requests';
import ResponseError from '../../../../utils/ResponseError';
import { FormProps } from '../../../Form/Form';
import ModalBox from '../../../ModalBox/ModalBox';

export interface Group {
  _id: string;
  name: string;
  defaultChannel: string;
  image?: string;
  // unreadMsg?: number;
}

const GroupList: React.FC = (props): JSX.Element => {
  const [show, setShow] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [fetchedGroupList, setFetchedGroupList] = useState<Group[]>([]);
  const [error, setError] = useState<ResponseError>();
  const history = useHistory();

  const onGroupNameChange: ChangeEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>,
  ) => {
    setNewGroupName(ev.target.value);
  };

  const openModalBox: MouseEventHandler = (ev: MouseEvent) => {
    ev.preventDefault();

    setShow(true);
  };

  // Called when creating a new Group
  const createGroup: MouseEventHandler = (ev: MouseEvent) => {
    ev.preventDefault();

    const successHandler = (result: any) => {
      console.log('New Group result', result);
      setShow(false);
      setFetchedGroupList((oldGroupList) => [
        ...oldGroupList,
        result, // Add the new Group to the GroupList
      ]);
      history.push(`/${result._id}/channels/${result.defaultChannel}`);
    };

    const errorHandler = (err: Error) => {
      console.log('Error creating new Group', err.message);
      setError(err as ResponseError);
    };

    const fetchDetails: FetchDetails = {
      fetchURI: '/api/group',
      method: 'POST',
      body: {
        name: newGroupName,
      },
    };

    // Makes POST request to the '/api/group/' endpoint
    protectedRequest(fetchDetails, successHandler, errorHandler);
  };

  const formProps: FormProps = {
    fields: {
      groupName: {
        type: 'text',
        required: true,
        placeholder: 'Group Name',
        value: newGroupName,
        onChange: onGroupNameChange,
      },
    },
    onSubmit: createGroup,
    error,
  };

  // Fetches the list of groups, the user is part of
  useEffect(() => {
    const successHandler = (result: any) => {
      setFetchedGroupList(result);
    };

    const errorHandler = (err: Error) => {
      console.log('Error fetching groupList', err.message);
    };

    getRequest('/api/user/groups', successHandler, errorHandler);
  }, []);

  return (
    <div id="group-list">
      <div className="group">
        <Link to="/profile/@me">Profile</Link>
      </div>
      {fetchedGroupList.map((group: Group) => (
        <div className="group" key={group._id}>
          {/* TODO: The response also return the welcome channel id */}
          <Link to={`/${group._id}/channels/${group.defaultChannel}`}>
            {group.name}
          </Link>
        </div>
      ))}
      <div className="group" id="add-group" onClick={openModalBox}>
        +
      </div>
      <ModalBox show={show} setShow={setShow} form={formProps} />
    </div>
  );
};

export default GroupList;
