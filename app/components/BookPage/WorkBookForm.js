var React = require('react');
var validator = require('validator');
var Toaster = require('../Toast');

import { Router, Route, Link } from 'react-router';

var BookForm = React.createClass({
  getDefaultProps: function () {
    var nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10);
    return {userInput: nextDay};
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },
  render: function() {
    var iconStyle={
      marginBottom: -8,
      marginRight: 23
    };
    var inputStyle={
      padding: '1px 0',
      marginTop: 48,
      backgroundColor: 'inherit',
      width: 170,
      fontSize: '1.2em',
      lineHeight: '19px',
      borderWidth: '0 0 2px',
      borderRadius: 0,
      borderColor: 'transparent transparent #c4c4c4',
    };
    return (
      <div className="bookForm" style={{textAlign : 'center'}}>
        <Toaster ref="toast"/>
        <form ref="bookForm" >
          <div>
            <img 
              style={iconStyle}
              ref="nameImage"
              src="imgs/bookPage/name-image.png"
              srcSet="imgs/bookPage/name-image@2X.png 2x" />
            <input 
              style={inputStyle}
              ref="bookName"
              type="text" 
              placeholder="填写预约姓名" />
          </div>
          <div>
            <img 
              style={iconStyle}
              ref="phoneImage"
              src="imgs/bookPage/phone-image.png"
              srcSet="imgs/bookPage/phone-image@2X.png 2x" />
            <input 
              style={inputStyle}
              ref="bookPhone"
              type="text" 
              placeholder="填写预约电话" />
          </div>
          <div>
            <img 
              style={iconStyle}
              ref="dateImage"
              src="imgs/bookPage/date-image.png"
              srcSet="imgs/bookPage/date-image@2X.png 2x" />
            <input 
              style={inputStyle}
              ref="bookDate"
              type="date" 
              defaultValue={this.props.userInput}
              placeholder="选择拍照日期" />
          </div>
          <div 
            style={{  
              width: 126,
              height: 37,
              border: '2px solid',
              margin: '54px auto 0',
              borderRadius: '30px',
              borderColor: '#3c3c3c',
              fontSize: '1.3334em',
              backgroundColor: 'inherit',
              color: '#3c3c3c'
            }}
            className="active-item"
            ref="bookButton"
            onClick={this.handleSubmit} >
            {this.props.subValue}
          </div>
        </form>
      </div>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    // 获得用户输入
    const BuyerName     = this.refs.bookName.getDOMNode().value.trim();
    const BuyerTel      = this.refs.bookPhone.getDOMNode().value.trim();
    const AppointedTime = this.refs.bookDate.getDOMNode().value.trim();
    console.log();
    console.log();
    if (!BuyerName) {
      this.showMessage('请填写预约姓名');
      return;
    }
    if (!BuyerTel) {
      this.showMessage('请填写预约电话');
      return;
    }
    if (!validator.isMobilePhone(BuyerTel, 'zh-CN')) {
      this.showMessage('请输入正确的手机号');
      return;
    }
    if (+new Date(AppointedTime) < +new Date(this.props.userInput)) {
      this.showMessage('预约时间不能早于当前日期');
      return;
    }
    // console.log('预约信息', {BuyerName, BuyerTel, AppointedTime});

    // 网络存储
    this.props.onSubmit({BuyerName, BuyerTel, AppointedTime});
  }

});

module.exports = BookForm;