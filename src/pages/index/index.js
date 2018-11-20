import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import starB from './starB.png'
import starG from './starG.png'
import starP from './starP.png'
import starR from './starR.png'
import starY from './starY.png'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        {/* <View className='grid'>
          <View className='gridItem'>1</View>
          <View className='gridItem'>1</View>
          <View className='gridItem'>1</View>
          <View className='gridItem'>1</View>
          <View className='gridItem'>1</View>
          <View className='gridItem'>1</View>
        </View> */}
        <View className='index'>
          <View className='starBox'>
            <Image src={starB} />
          </View>
        </View>
      </View>
    )
  }
}

