import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppActionCreators } from '../store/reducers/app/action-creators';
import { UserActionCreators } from '../store/reducers/user/action-creators';
import { TaskActionCreators } from '../store/reducers/task/action-creators';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...AppActionCreators, ...UserActionCreators, ...TaskActionCreators }, dispatch);
};
