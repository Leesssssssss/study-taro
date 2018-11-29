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

  toCreated() {
    Taro.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              Taro.navigateTo({
                url: '/pages/created/created'
              })
            }
          })
        }
      }
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

        <Button className='addBtn' open-type="getUserInfo" onClick={this.toCreated}>点击创建你的第一条备忘录</Button>
      </View>
    )
  }
}

