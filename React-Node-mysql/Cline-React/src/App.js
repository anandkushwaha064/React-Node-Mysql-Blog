import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Posts from './components/posts';
import Router from './router';
import EventBinding from './components/EventBinding';
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <EventBinding />
        <div>
          {/* <Route component={Header} />

          <Route component={Router} />

          <Route component={Footer} /> */}
        </div>
      </BrowserRouter>
    );
  }
}
