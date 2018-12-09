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
    note: [],
    topNote: {},
    otherNotes: [],
    otherNotesDone: [],
    isShowNote: false,
    scrollHeight: ''
  }

  componentWillMount() {
    this.getLogin()
    var that = this
    Taro.getSystemInfo({
      success: function (res) {
        that.setState({ scrollHeight: 'height:' + (res.windowHeight * 0.55) + 'px' });
      }
    });  
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 登录获取用户信息
  getLogin() {
    let that = this;
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
            Taro.setStorage({ key: 'openid', data: result.data.openid })
            that.setState({ openid: result.data.openid }, () => {
              that.getNotes()
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  // 根据每一条备忘录的day属性值进行排序
  compare(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }

  getNotes() {
    // 根据获取的openid获取用户备忘录
    Taro.request({
      url: 'http://localhost:3000/getNote',
      method: 'POST',
      data: {
        openid: this.state.openid
      }
    }).then(results => {
      this.setState({ note: results.data })
      let others = []
      let othersDone = []
      for (let i = 0; i < results.data.length; i++) {
        results.data[i].day = this.compute(results.data[i].date)
        // 找出置顶的一条备忘录
        if (results.data[i].top === true) {
          this.setState({ topNote: results.data[i] })
          continue;
        }
        // 将日期已经过去的备忘录存入一个数组
        if (results.data[i].day < 0) {
          othersDone.push(results.data[i])
        } else {
          // 将剩下的备忘录存入一个数组
          others.push(results.data[i])
        }
      }
      others.sort(this.compare('day'))
      othersDone.reverse(this.compare('day'))
      this.setState({
        otherNotes: others,
        otherNotesDone: othersDone
      }, () => {
        this.setState({
          isShowNote: true
        })
      })
    })
  }

  // 计算day，即 设置的日期 与 当天的日期 之间的差值
  compute(noteDay) {
    var start = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
    var start_date = new Date(start.replace(/-/g, "/"))
    var end_date = new Date(noteDay.replace(/-/g, "/"))
    var days = end_date.getTime() - start_date.getTime()
    var day = parseInt(days / (1000 * 60 * 60 * 24))
    return day
  }

  // 新建备忘录
  toCreated() {
    var that = this
    Taro.getUserInfo({
      success: function (res) {
        // 存储获取的用户信息
        Taro.request({
          url: 'http://localhost:3000/getUserInfo',
          method: 'POST',
          data: {
            openid: that.state.openid,
            userInfo: res.userInfo
          }
        }).then(result => {
          if (result.data === '存储用户信息成功') {
            // 跳转至新建备忘录页面
            Taro.navigateTo({
              url: '/pages/created/created'
            })
          }
        })
      }
    })
  }

  toNoteDetail(note) {
    // 携带点击的备忘录信息跳转至备忘录详情页面
    var date = note.date
    var title = note.title
    var day = note.day
    var repeat = note.repeat
    var top = note.top
    var _id = note._id
    Taro.navigateTo({
      url: '/pages/noteDetail/noteDetail?date=' + date + '&title=' + title + '&day=' + day + '&repeat=' + repeat + '&top=' + top + '&_id=' + _id
    })
  }

  render() {
    let noteInfo = null
    let topDay = null
    let topTitle = null
    const { note, otherNotes, otherNotesDone, topNote } = this.state
    let isShowNote = this.state.isShowNote

    // 判断置顶备忘录day是否为负数，若是则需要更改样式
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

    const card = (
      <View className='card'>
        {/* 置顶备忘录 */}
        <View className='topNote' onClick={this.toNoteDetail.bind(this, topNote)}>
          {topDay}
          {topTitle}
          <View className='topNoteItem'>
            <Text className='topNoteTOP'>TOP</Text>
            <Text className='topNoteDate'>{topNote.date}</Text>
          </View>
        </View>
        {/* 其他非置顶备忘录 */}
        <ScrollView
          className='scroll'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style={this.state.scrollHeight}>
          {otherNotes.map((otherNote) =>
            <View className='watchBox' key={otherNote._id} onClick={this.toNoteDetail.bind(this, otherNote)}>
              <View className='watchBoxItem'>
                <Text className='name'>{otherNote.title}</Text>
                <Text className='date'>{otherNote.date}</Text>
              </View>
              <View className='watchBoxItem'>
                <Text className='day'>{otherNote.day}</Text>
              </View>
            </View>
          )}
          {otherNotesDone.map((otherNoteDone) =>
            <View className='watchBox' key={otherNoteDone._id} onClick={this.toNoteDetail.bind(this, otherNoteDone)}>
              <View className='watchBoxItem'>
                <Text className='name'>{otherNoteDone.title.slice(0, -2) + '已经'}</Text>
                <Text className='date'>{otherNoteDone.date}</Text>
              </View>
              <View className='watchBoxItem'>
                <Text className='dayR'>{Math.abs(otherNoteDone.day)}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    )

    // 若没有保存过备忘录则要显示创建第一条备忘录的按钮
    if (note.length === 0 && isShowNote) {
      noteInfo = (
        <Button className='addBtn' open-type="getUserInfo" onClick={this.toCreated}>点击创建你的第一条备忘录</Button>
      )
    } else if (note.length > 0 && isShowNote) {
      // 若保存过备忘录直接显示备忘录
      noteInfo = (
        <View className='card'>
          {card}
        </View>
      )
    }

    return (
      <View>
        {/* 背景图片 */}
        <Image className='bgImg' src={bgImg} />
        <View className='mask'></View>

        {/* 左上角icon图标 */}
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

