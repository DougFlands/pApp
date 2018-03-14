import React from 'react';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { NavBar } from "antd-mobile";
import NavLinkBar from '../navlink/navlink';
import Boss from '../boss/boss.js'
import Genius from '../genius/genius.js'
import User from '../user/user.js'
import Msg from '../msg/msg.js'

import { getMegList, sendMsg, recvMsg } from "../../redux/chat.redux";


function a() {
  console.log('1')
}

function First() {
  return <h2>首页</h2>
}


@connect(
  state => state,
  {getMegList, sendMsg, recvMsg}
)

class Dashboard extends React.Component{
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMegList()
      this.props.recvMsg()
    }
  }
  render() {
    const user = this.props.user
    const navList = [
      { path: '/boss', text: '求职者', icon: 'boss', title: '求职列表', component: Boss, hide: user.type === 'genius' },
      { path: '/genius', text: 'boss', icon: 'job', title: 'Boss列表', component: Genius, hide: user.type === 'boss' },
      { path: '/msg', text: '消息', icon: 'msg', title: '消息列表', component: Msg},
      { path: '/me', text: '我', icon: 'user', title: '个人中心', component: User},
      { path: '/', text: '首页', icon: 'user', title: '首页', component: First},
    ]
    const {pathname} = this.props.location
    return (
      <div>
        <NavBar mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard