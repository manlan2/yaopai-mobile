var React = require('react');
var Router = require('react-router');
import {History,Location, Link} from 'react-router';
var Reflux = require('reflux');
var HamburgMenu = require('../HamburgMenu');
import UserAvatarBox from '../UserAvatarBox' ;
import JobTicketList from './JobTicketList';
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');
var _ = require('underscore');

var GrapherCenterPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),Reflux.listenTo(OrderStore,'_onOrderStoreChange'),History],
  getInitialState : function(){
    return {
      orders : [],
      userInfo : {}
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({netxPage : this.props.location.pathname},'/login_page');
    }else{
      let type = 'in';
      //得到当前摄影师的所有订单
      this.setState({userInfo : data});
      OrderActions.list(type,null);
    }
  },
  _onOrderStoreChange : function(data){
    if(data.flag == 'list'){
      if(!data.success){
        console.log(data.hintMessage);
      }else{
        //将订单按照状态排序，优先显示为完成订单
        var orders = _.sortBy(data.orders,function(order){return order.State})
        this.setState({orders : orders});
        // console.log(data.orders);
      }
    }
    if(data.flag == 'confirm'){
      if(!data.success){
        console.log(data.hintMessage);
      }else{
        console.log('确认订单成功');
        //刷新页面获取新的数据
        OrderActions.list('in',null);
      }
    }
  },

  render: function() {
    var style = {
      page: {
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
        minHeight: '100%',
        position: 'absolute',
        width: '100%'
      },
      splitLine: {
        margin: '24px 0 12px 0'
      }
    };

    var makeUiButton = function (icon, title, link="javascript:;", router="normalLink") {
      if(router == 'normalLink'){
        return (
          <div className="weui_cells weui_cells_access" >
            <a className="weui_cell" href={link} >
                <div className="weui_cell_hd">
                    <div className={"icon " + icon}
                        style={{fontSize:25,  color:'red', padding:'10'}} />
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <p className="titleDemo">{title}</p>
                </div>
                <div className="weui_cell_ft" />
            </a>
          </div>
        )
      }else{
        return (
          <div className="weui_cells weui_cells_access" >
            <Link className="weui_cell" to={link} >
                <div className="weui_cell_hd">
                    <div className={"icon " + icon}
                        style={{fontSize:25,  color:'red', padding:'10'}} />
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <p className="titleDemo">{title}</p>
                </div>
                <div className="weui_cell_ft" />
            </Link>
          </div>
        )
      }
    };

    return (
      <div 
        style={style.page}
        className="grapherCenterPage">
        <HamburgMenu />
        <UserAvatarBox background={true} data={this.state.userInfo}/>
        {makeUiButton('edit_icon', '订单管理', 'grapher_tickets', 'react-router')}
        {makeUiButton('edit_icon', '我的主页', 'grapherDetail/'+ this.state.userInfo.userId, 'react-router')}
        {makeUiButton('phone_circle_icon', '联系客服', 'tel:+86-0371-6533-7727')}  
      </div>
    );
  }
});

module.exports = GrapherCenterPage;
