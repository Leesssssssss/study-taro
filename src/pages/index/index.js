import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class Index extends Component {

  config = {
    // navigationBarTitleText: '首页'
  }

  state = {
    openid: '',
    userInfo: {},
    notes: []
  }

  componentWillMount() {
    var that = this
    Taro.login({
      success(res) {
        if (res.code) {
          //小程序登录获取用户openid
          const appId = 'wxb856601fa3c29969'
          const secret = '98ac0657532a3cc8da45676aa4c94bbb'
          const code = res.code
          Taro.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'
          }).then(result => {
            Taro.request({
              url: 'http://localhost:3000/getOpenId',
              method: 'POST',
              data: {
                openid: result.data.openid,
                session_key: result.data.session_key
              }
            })

            // 根据获取的openid获取用户备忘录
            Taro.request({
              url: 'http://localhost:3000/getNote',
              method: 'POST',
              data: {
                openid: result.data.openid
              }
            }).then(results => {
              that.setState({ notes: results.data })
              console.log(results.data);
            })
            that.setState({ openid: result.data.openid })
            Taro.setStorage({ key: 'openid', data: result.data.openid })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  toCreated() {
    var that = this
    Taro.getUserInfo({
      success: function(res) {
        that.setState({
          userInfo: res.userInfo
        })
      }
    })

    if (!this.state.userInfo) {
      return;
    }

    // 存储获取的用户信息
    Taro.request({
      url: 'http://localhost:3000/getUserInfo',
      method: 'POST',
      data: {
        openid: this.state.openid,
        userInfo: this.state.userInfo
      }
    })

    // 跳转至新建备忘录页面
    Taro.navigateTo({
      url: '/pages/created/created'
    })
  }


  render() {
    let noteInfo = null
    const { notes } = this.state

    const card = (
      <View>
        {notes.map((note) =>
          <View className='watchBox'>
            <View className='watchBoxItem'>
              <Text className='name'>{note.title}</Text>
              <Text className='date'>{note.date}</Text>
            </View>
            <View className='watchBoxItem'>
              <Text className='day'>{note.day}</Text>
            </View>
          </View>
        )}
      </View>
    )

    if (notes.length === 0) {
      noteInfo = (
        <Button className='addBtn' open-type="getUserInfo" onClick={this.toCreated}>点击创建你的第一条备忘录</Button>
      )
    } else {
      noteInfo = (
        <View>
          {card}
        </View>
      )
    }
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

        {noteInfo}
      </View>
    )
  }
}

