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
    // console.log(this.$router.params);
    // this.compute(this.$router.params.date);
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

  // 修改备忘录
  toCreated(){
    var date = this.state.note.date
    var title = this.state.note.title
    var day = this.state.note.day
    var repeat = this.state.note.repeat
    var top = this.state.note.top
    var _id = this.state.note._id
    var update = 'update'
    Taro.navigateTo({
      url: '/pages/created/created?date=' + date + '&title=' + title + '&day=' + day + '&repeat=' + repeat + '&top=' + top + '&_id=' + _id + '&update=' + update
    })
  }

  // 分享
  toShare() {
    Taro.navigateTo({
      url: '/pages/share/share'
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
    let top = null
    const { note } = this.state
    if (note.top === 'true') {
      top = (
        <Text className='topNoteTOP'>TOP</Text>
      )
    }

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
              {top}
              <Text className='topNoteDate'>{this.state.note.date}</Text>
            </View>
          </View>

          <View className='bottom-icon'>
            <AtIcon prefixClass='icon' value='bianji' size='30' color='#ffffff' onClick={this.toCreated}></AtIcon>
            <AtIcon prefixClass='icon' value='zhuanfa' size='30' color='#ffffff' onClick={this.toShare}></AtIcon>
            <AtIcon prefixClass='icon' value='shanchu' size='30' color='#ffffff' onClick={this.deleteNote}></AtIcon>
          </View>
        </View>

      </View>
    )
  }
}

