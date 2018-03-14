import React from 'react';
import {connect} from 'react-redux'
import { List, WhiteSpace, WingBlank } from 'antd-mobile'



@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr) {
    return arr[arr.length-1]
  }
  render() {
    if (!this.props.chat.chatmsg) {
      return chatList=[]
    }
    const Item = List.Item
    const Brief = Item.Brief
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    let chatList = Object.values(msgGroup)
    return (
      <div>
        <List>
          {chatList.map(v => {
            console.log(v);
            const lastItem = this.getLast(v)
            return (
              <Item key={lastItem._id}>
                {lastItem.content}
                <Brief>用户名</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg