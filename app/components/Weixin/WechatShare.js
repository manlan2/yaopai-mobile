'use strict';

var React = require ('react');
var $ = require('jquery');

var WechatShare = React.createClass({
  propTypes: {
    title:React.PropTypes.string,
    desc:React.PropTypes.string,
    link:React.PropTypes.string,
    imgUrl:React.PropTypes.string,
    apis:React.PropTypes.array,
    //onShareTimeLineSuccess:React.PropTypes.func,
    //onShareAppMessageSuccess:React.PropTypes.func
  },
  getInitialState() {
    return {
      isWechatReady:false,
      link:location.href,
      title:'',
      desc:'',
      imgUrl:'',
    };
  },
  getDefaultProps() {
    return {
      apis:['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage'],//,'onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'
    };
  },
  componentDidMount() {
    let self=this;
    self.setState({
      title:self.props.title,
      desc:self.props.desc,
      imgUrl:self.props.imgUrl,
    })
    console.log("location.href="+location.href)
    $.ajax({
      url: '//dev.m.aiyaopai.com/signPackage?url=' + location.href,
      dataType: 'json',
      type: "GET",
      success: function (data) {
        console.log("signPackage data= "+data)
        if(data.error){
          console.log(data.error)
        }else{
          initWechat(data)
        }
      },
      error : function() {
        console.log('fail');
      }
    })
    function initWechat(data){
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: self.props.apis, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2,
        currentUrl:self.state.link //hack wechat js, you must
      });
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.title !=this.state.title || nextProps.desc !=this.state.desc || nextProps.imgUrl !=this.state.imgUrl ){
      this.setState({
        title:nextProps.title,
        desc:nextProps.desc,
        imgUrl:nextProps.imgUrl,
      });
    }
  },
  render(){
    let self = this;
    wx.ready(function(){
      self.setState({
        isWechatReady:true
      })
      let title = this.state.title;
      let desc = this.state.desc;
      let link = this.state.link;
      let imgUrl = this.state.imgUrl;
      if(self.state.isWechatReady){
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            console.log("onMenuShareTimeline success")
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log("onMenuShareTimeline cancel")
          }
        });

        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            console.log("onMenuShareAppMessage success")
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log("onMenuShareAppMessage cancel")
          }
        });
      }
    })
    return <div></div>
  }
});

module.exports = WechatShare;