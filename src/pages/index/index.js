import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class Index extends Component {

  config = {
    // navigationBarTitleText: '首页'
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     markers: [],
  //     longitude: 0,
  //     latitude: 0
  //   }
  // }

  componentWillMount() {

  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  toCreated(e) {
    console.log(e.detail.userInfo);
    if (!e.detail.userInfo) {
      return;
    }
    Taro.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          const appId = 'wxb856601fa3c29969'
          const secret = '98ac0657532a3cc8da45676aa4c94bbb'
          const code = res.code
          Taro.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'
          }).then(result => {
            Taro.request({
              url: 'http://localhost:3000/getUserInfo',
              method: 'POST',
              data: {
                openid: result.data.openid,
                session_key: result.data.session_key,
                userInfo: e.detail.userInfo
              }
            }).then(results => {
              if (results.data === 'ok') {
                Taro.setStorage({ key: 'openid', data: result.data.openid })
                  .then(res => console.log(res))
              }
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    Taro.navigateTo({
      url: '/pages/created/created'
    })
  }


  render() {
    return (
      <View>
        <Image className='bgImg' src={bgImg} />
        <View className='mask'></View>

        <View className='icons'>
          <View className='iconsItem' onClick={this.toCreated}>
            <AtIcon prefixClass='icon' value='add' size='20' color='#4e3a4b'></AtIcon>
          </View>
          <View className='iconsItem'>
            <AtIcon prefixClass='icon' value='setting' size='22' color='#4e3a4b'></AtIcon>
          </View>
          <View className='iconsItem'>
            <AtIcon prefixClass='icon' value='time' size='22' color='#4e3a4b'></AtIcon>
          </View>
        </View>

        <Button className='addBtn' open-type="getUserInfo" onGetUserInfo={this.toCreated}>点击创建你的第一条备忘录</Button>
      </View>
    )
  }
}

