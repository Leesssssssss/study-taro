import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './noteDetail.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class noteDetail extends Component {

  config = {
    // navigationBarTitleText: '首页'
  }

  state = {
    openid: '',
    note: {}
  }

  componentWillMount() {
    this.setState({ note: this.$router.params });
    // 获取本地存储openid
    Taro.getStorage({ key: 'openid' })
      .then(res =>
        this.state.openid = res.data
      )
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

  // 删除备忘录
  deleteNote() {
    Taro.showModal({
      title: '确认删除？',
      content: '时光易逝，且行且珍惜',
    })
      .then(res => {
        console.log(res.confirm, res.cancel)
        if (res.confirm === true) {
          Taro.request({
            url: 'http://localhost:3000/deleteNote',
            method: 'POST',
            data: {
              openid: this.state.openid,
              _id: this.state.note._id
            }
          })
          Taro.navigateTo({
            url: '/pages/index/index'
          })
        }
      })
  }

  render() {
    return (
      <View>
        <Image className='bgImg' src={bgImg} />
        <View className='mask'></View>

        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#ffffff'></AtIcon>
        </View>

        <View className='noteDetail'>
          <View className='topNote'>
            <Text className='topNoteDay'>{this.state.note.day}</Text>
            <Text className='topNoteTitle'>{this.state.note.title}</Text>
            <View className='topNoteItem'>
              <Text className='topNoteTOP'>TOP</Text>
              <Text className='topNoteDate'>{this.state.note.date}</Text>
            </View>
          </View>

          <View className='bottom-icon'>
            <AtIcon prefixClass='icon' value='bianji' size='30' color='#ffffff'></AtIcon>
            <AtIcon prefixClass='icon' value='zhuanfa' size='30' color='#ffffff'></AtIcon>
            <AtIcon prefixClass='icon' value='shanchu' size='30' color='#ffffff' onClick={this.deleteNote}></AtIcon>
          </View>
        </View>

      </View>
    )
  }
}

