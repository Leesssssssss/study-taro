import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './share.scss'
import { AtIcon } from 'taro-ui'

export default class Index extends Component {
  config = {
    // navigationBarTitleText: '首页'
  }

  componentWillMount() {
  }

  
  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 返回上一页
  back() {
    Taro.navigateBack({
      delta: 1
    })
  }

  render() {
    return (
      <View>
        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#000000'></AtIcon>
        </View>

        <View></View>

        <Button className='shareBtn' openType='share'>分享给群或好友</Button>

      </View>
    )
  }
}