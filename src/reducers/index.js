import { combineReducers } from 'redux';
import PostsReducer from './posts';
import RehydrationReducer from './rehydration'
import UpvotedReducer from './upvoted'
import PagesReducer from './pages'
import CommentsReducer from './comments'
import ModalReducer from './modal'

const rootReducer = combineReducers({
  posts: PostsReducer,
  rehydration: RehydrationReducer,
  upvoted: UpvotedReducer,
  pages: PagesReducer,
  comments: CommentsReducer,
  modal: ModalReducer
});

export default rootReducer;