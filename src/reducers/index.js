import { combineReducers } from 'redux';
import PostsReducer from './posts';
import RehydrationReducer from './rehydration'
import UpvotedReducer from './upvoted'
import PagesReducer from './pages'
import CommentsReducer from './comments'
import ModalReducer from './modal'
import AuthorizationReducer from './authorization'
import CurrentPostReducer from './currentpost'

const rootReducer = combineReducers({
  posts: PostsReducer,
  rehydration: RehydrationReducer,
  upvoted: UpvotedReducer,
  pages: PagesReducer,
  comments: CommentsReducer,
  modal: ModalReducer,
  authorization: AuthorizationReducer,
  currentpost: CurrentPostReducer
});

export default rootReducer;