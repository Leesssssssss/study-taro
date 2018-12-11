import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './share.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class Index extends Component {
  config = {
    // navigationBarTitleText: '首页'
  }

  state = {
    topNote: {}
  }
  componentWillMount() {
    console.log(this.$router.params);
    this.setState({
      topNote: {
        date: this.$router.params.date,
        title: this.$router.params.title,
        day: this.$router.params.day
      }
    })
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
    let topDay = null
    let topTitle = null
    const { topNote } = this.state

    // 判断备忘录day是否为负数，若是则需要更改样式
    if (topNote.day < 0) {
      topDay = (
        <Text className='topNoteDay'>{Math.abs(topNote.day)}</Text>
      )
      topTitle = (
        <Text className='topNoteTitle'>{topNote.title.slice(0, -2) + '已经'}</Text>
      )
    } else {
      topDay = (
        <Text className='topNoteDay'>{topNote.day}</Text>
      )
      topTitle = (
        <Text className='topNoteTitle'>{topNote.title}</Text>
      )
    }

    return (
      <View>
        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#000000'></AtIcon>
        </View>

        <View className='topNote'>
          <Image className='bgImg' mode='aspectFill' src={bgImg} />
          <View className='mask'></View>
          {topDay}
          {topTitle}
          <Text className='topNoteDate'>{topNote.date}</Text>
        </View>

        <Button className='shareBtn' openType='share'>分享给群或好友</Button>

      </View>
    )
  }
}