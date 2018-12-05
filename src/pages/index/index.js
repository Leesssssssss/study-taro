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
    isShowNote: false
  }

  componentWillMount() {
    this.getLogin();
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

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
      for (let i = 0; i < results.data.length; i++) {
        results.data[i].day = this.compute(results.data[i].date)
        if (results.data[i].top === true) {
          this.setState({ topNote: results.data[i] })
          continue;
        }
        others.push(results.data[i])
      }
      this.setState({
        otherNotes: others
      }, () => {
        this.setState({
          isShowNote: true
        })
      })
    })
  }

  compute(noteDay) {
    var start = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
    var start_date = new Date(start.replace(/-/g, "/"))
    var end_date = new Date(noteDay.replace(/-/g, "/"))
    var days = end_date.getTime() - start_date.getTime()
    var day = parseInt(days / (1000 * 60 * 60 * 24))
    return day
  }

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

  toNoteDetail(otherNote) {
    // 跳转至备忘录详情页面
    var date = otherNote.date
    var title = otherNote.title
    var day = otherNote.day
    var repeat = otherNote.repeat
    var top = otherNote.top
    var _id = otherNote._id
    Taro.navigateTo({
      url: '/pages/noteDetail/noteDetail?date=' + date + '&title=' + title + '&day=' + day + '&repeat=' + repeat + '&top=' + top + '&_id=' + _id
    })
  }

  render() {
    let noteInfo = null
    const { note, otherNotes, topNote } = this.state
    let isShowNote = this.state.isShowNote

    const card = (
      <View>
        <View className='topNote'>
          <Text className='topNoteDay'>{topNote.day}</Text>
          <Text className='topNoteTitle'>{topNote.title}</Text>
          <View className='topNoteItem'>
            <Text className='topNoteTOP'>TOP</Text>
            <Text className='topNoteDate'>{topNote.date}</Text>
          </View>
        </View>
        <ScrollView
          className='scroll'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height:60vh;'>
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
        </ScrollView>
      </View>
    )

    if (note.length === 0 && isShowNote) {
      noteInfo = (
        <Button className='addBtn' open-type="getUserInfo" onClick={this.toCreated}>点击创建你的第一条备忘录</Button>
      )
    } else if (note.length > 0 && isShowNote) {
      noteInfo = (
        <View>
          {card}
        </View>
      )
    }

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

        {noteInfo}
      </View>
    )
  }
}

