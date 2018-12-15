import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './noteDetail.scss'
import { AtIcon } from 'taro-ui'
import bgImg from '../../assets/image/bgImg.png'

export default class noteDetail extends Component {

  config = {
    // navigationBarTitleText: '首页'
  }

  state = {
    openid: '',
    note: {},
    imageTempPath: ''
  }

  componentWillMount() {
    // 获取备忘录详细信息
    this.setState({ note: this.$router.params }, () => {
      this.compute(this.state.note.date)
    });
    // 获取本地存储openid
    Taro.getStorage({ key: 'openid' })
      .then(res =>
        this.setState({
          openid: res.data
        })
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

  // 计算day，即设置的日期 与 当天的日期 之间的差值
  compute(noteDay) {
    var start = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
    var start_date = new Date(start.replace(/-/g, "/"))
    var end_date = new Date(noteDay.replace(/-/g, "/"))
    var days = end_date.getTime() - start_date.getTime()
    var day = parseInt(days / (1000 * 60 * 60 * 24))
    console.log(day);
    let note = this.state.note;
    note.day = day;
    this.setState({
      note: note
    })
  }

  // 携带信息跳转至修改备忘录页面
  toCreated() {
    var date = this.state.note.date
    var title = this.state.note.title
    var day = this.state.note.day
    var repeat = this.state.note.repeat
    var top = this.state.note.top
    var _id = this.state.note._id
    var _id1 = this.state.note._id1
    var update = 'update'
    Taro.navigateTo({
      url: '/pages/created/created?date=' + date + '&title=' + title + '&day=' + day + '&repeat=' + repeat + '&top=' + top + '&_id=' + _id + '&_id1=' + _id1 + '&update=' + update
    })
  }

  // 分享
  toShare() {
    var date = this.state.note.date
    var title = this.state.note.title
    var day = this.state.note.day
    Taro.navigateTo({
      url: '/pages/share/share?date=' + date + '&title=' + title + '&day=' + day
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
            // url: 'https://lee.hhp.im/deleteNote',
            url: 'http://localhost:3000/deleteNote',
            method: 'POST',
            data: {
              openid: this.state.openid,
              _id: this.state.note._id,
              top: this.state.note.top,
              _id1: this.state.note._id1
            }
          })
          Taro.redirectTo({
            url: '/pages/index/index'
          })
        }
      })
  }

  render() {
    let top = null
    let topDay = null
    let topTitle = null
    const { note } = this.state

    // 若为置顶备忘录则显示TOP小标志
    if (note.top === 'true') {
      top = (
        <Text className='topNoteTOP'>TOP</Text>
      )
    }

    // 判断备忘录day是否为负数，若是则需要更改样式
    if (note.day < 0) {
      topDay = (
        <Text className='topNoteDay'>{Math.abs(note.day)}</Text>
      )
      topTitle = (
        <Text className='topNoteTitle'>{note.title.slice(0, -2) + '已经'}</Text>
      )
    } else {
      topDay = (
        <Text className='topNoteDay'>{note.day}</Text>
      )
      topTitle = (
        <Text className='topNoteTitle'>{note.title}</Text>
      )
    }

    return (
      <View>
        {/* 背景罩 */}
        <View className='mask'></View>

        {/* 返回上一页icon图标 */}
        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#ffffff'></AtIcon>
        </View>

        {/* 备忘录信息 */}
        <View id='card' className='noteDetail'>
          <View className='topNote'>
            {topDay}
            {topTitle}
            <View className='topNoteItem'>
              {top}
              <Text className='topNoteDate'>{note.date}</Text>
            </View>
          </View>

          <View className='bottom-icon'>
            <AtIcon prefixClass='icon' value='bianji' size='30' color='#ffffff' onClick={this.toCreated}></AtIcon>
            <AtIcon prefixClass='icon' value='zhuanfa' size='30' color='#ffffff' onClick={this.toShare}></AtIcon>
            <AtIcon prefixClass='icon' value='shanchu' size='30' color='#ffffff' onClick={this.deleteNote}></AtIcon>
          </View>
        </View>

        {/* 背景图片 */}
        <Image className='bgImg' src={bgImg} />
      </View>
    )
  }
}

