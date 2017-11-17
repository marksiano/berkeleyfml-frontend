import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import AddPost from './components/AddPost';
import IndexPost from './components/IndexPost';
import Post from './components/Post';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/add-post' component={AddPost} />
        <Route path='/index' component={IndexPost} />
        <Route path='/post/:postId' component={Post} />
      </div>
  </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
