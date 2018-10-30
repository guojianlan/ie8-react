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


function renderApp(){
  fetch('/admin/site/checkLogin?t='+(+new Date())).then(resp=>{
    return resp.json();
  }).then(resp=>{
    var isLogin  = resp.status == 0 ? false:true
    function checkLogin(nextState, replace,next){
      alert(isLogin);
      if(isLogin){
        if(nextState.location.pathname=='/login'){
          replace("/")//如果token信息为空就直接到登录页面
        }
        next();
      }else{
        if(nextState.location.pathname!='/login'){
          replace("/login")//如果token信息为空就直接到登录页面
        }
        next();
      }
    }
    render(
      <Router history={hashHistory} >
        <Route path='/' onEnter={checkLogin} component={Index} />
        <Route path='/login' onEnter={checkLogin}  component={Login} />
      </Router>,
      document.getElementById('icp-root')
    );
  }).catch(err=>{
    console.log('失败')
  })
  
}
renderApp();

