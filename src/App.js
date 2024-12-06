import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FetchUsers from './components/FetchUsers';
import FetchPosts from './components/FetchPosts';
import FetchError from './components/FetchError';
import DynamicFetch from './components/DynamicFetch';
import PaginateUsers from './components/PaginateUsers';
import SearchablePosts from './components/SearchablePosts';
import FetchDataWithCache from './components/FetchDataWithCache';
import FetchUserDetails from './components/FetchUserDetails';
import DebouncedSearch from './components/DebouncedSearch';
import InfiniteScroll from './components/InfiniteScroll';
import Auth from './components/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch-users" element={<FetchUsers />} />
        <Route path="/fetch-posts" element={<FetchPosts />} />
        <Route path="/fetch-error" element={<FetchError />} />
        <Route path="/dynamic-fetch" element={<DynamicFetch />} />
        <Route path="/paginated-users" element={<PaginateUsers />} />
        <Route path="/searchable-posts" element={<SearchablePosts />} />
        <Route path="/fetch-data-with-cache" element={<FetchDataWithCache />} />
        <Route path="/fetch-user-details" element={<FetchUserDetails />} />
        <Route path="/debounced-search" element={<DebouncedSearch />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
