require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('babel-polyfill');
require('fetch-detector');
require('fetch-ie8');
require('fetch-jsonp');
import React from 'react'
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
require('./assets/css/global.scss')
import Index from './views/index'
import Login from './views/login'
import Register from './views/register'
import PositionList from './views/positionList'
import PositionItem from './views/positionItem'

function renderApp(){
  fetch('/job/job/categoryList').then(resp=>{
    return resp.json();
  }).then(resp=>{
    render(
      <Router history={hashHistory} >
        <Route path='/' state={resp.data} component={Index} />
        <Route path='/login' state={resp.data} component={Login} />
        <Route path='/register' state={resp.data} component={Register} />
        <Route path='/positionList' state={resp.data} component={PositionList} />
        <Route path='/positionItem' state={resp.data} component={PositionItem} />
      </Router>,
      document.getElementById('icp-root')
    );
  }).catch(err=>{
    console.log('失败')
  })
  
}
renderApp();

