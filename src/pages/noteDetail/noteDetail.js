import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class noteDetail extends Component {

  config = {
    // navigationBarTitleText: '首页'
  }

  state = {
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        <Image className='bgImg' src={bgImg} />
        <View className='mask'></View>
        
      </View>
    )
  }
}

