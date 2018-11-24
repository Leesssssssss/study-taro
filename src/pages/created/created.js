import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import './created.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class Created extends Component {

  config = {
    // navigationBarTitleText: '创建'
  }

  constructor(props) {
    super(props)
    // this.state = {
    //   markers: [],
    //   longitude: 0,
    //   latitude: 0
    // }
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  back() {
    Taro.navigateBack({
      delta: 1
    })
  }

  render() {
    return (
      <View>
        <Image className='bgImg' src={bgImg} />
        <View className='mask'></View>

        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#000000'></AtIcon>
        </View>

        <View className='titleBox'>
          <Text className='title'>创建新备忘录</Text>
          <Button className='saveBtn'>保存</Button>
        </View>

        <View>
          <Text>备忘录名称</Text>
          <Input placeholder='备忘录名称'></Input>
        </View>
      </View>
    )
  }
}

