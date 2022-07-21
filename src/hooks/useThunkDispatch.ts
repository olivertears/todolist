import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

export const useThunkDispatch = useDispatch<ThunkDispatch<any, any, any>>;
