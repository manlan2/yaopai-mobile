import React from 'react';
import UserActions from '../../actions/UserActions';

var WechatLogin = React.createClass({
  _weChatLogin : function(){
    UserActions.openLogin();
  },
  render: function() {
    return (
      <div onClick={this._weChatLogin} className="wechatLogin">
        <span 
          className="icon wechat_circle_icon"
          ref="wechatLogo"
          style={{fontSize:55}} />
        <div ref="wechatText">微信帐号登录</div>
      </div>
    );
  }
});

export {WechatLogin as default};