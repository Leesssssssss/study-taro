import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import './created.scss'
import { AtIcon } from 'taro-ui'
import { Picker } from '@tarojs/components'
import bgImg from '../../assets/image/bgImg.png'

export default class Created extends Component {

  config = {
    // navigationBarTitleText: '创建'
  }

  state = {
    inputValue: '备忘录名称',
    value: '',
    dateSel: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate(),
    selector: ['不重复', '每年', '每月', '每周'],
    selectorChecked: '不重复',
    day: 0,
    top: true,
    openid: '',
    title: '创建新备忘录'
  }

  componentWillMount() {
    // 获取本地存储openid
    Taro.getStorage({ key: 'openid' })
      .then(res =>
        this.setState({ openid: res.data })
      )

    // 如果是修改备忘录则先获取传入的数据
    if (this.$router.params.update === 'update') {
      this.setState({
        dateSel: this.$router.params.date,
        day: this.$router.params.day,
        selectorChecked: this.$router.params.repeat,
        inputValue: this.$router.params.title,
        value: this.$router.params.title,
        top: (this.$router.params.top) === "false" ? false : true,
        title: '编辑备忘录'
      })
    }
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

  // 设置日期以及计算天数
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
    var start = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
    var start_date = new Date(start.replace(/-/g, "/"))
    var end_date = new Date(e.detail.value.replace(/-/g, "/"))
    var days = end_date.getTime() - start_date.getTime()
    var day = parseInt(days / (1000 * 60 * 60 * 24))
    this.setState({
      day: day
    })
  }

  // 设置重复
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  // 实时获取输入的备忘录名称
  onInput = e => {
    this.setState({
      inputValue: e.detail.value + '还有'
    })
  }

  // 设置是否置顶
  changeChoose() {
    this.setState({
      top: !this.state.top
    })
  }

  // 存储输入的信息
  save() {
    if (this.state.inputValue === '备忘录名称') {
      Taro.showToast({
        title: '请输入备忘录名称！',
        image: '../../assets/image/reminder.png',
        duration: 2000
      })
    } else {
      // 如果是修改备忘录
      if (this.$router.params.update === 'update') {
        var note = {
          title: this.state.inputValue,
          date: this.state.dateSel,
          repeat: this.state.selectorChecked,
          top: this.state.top,
          day: this.state.day,
          openid: this.state.openid,
          _id: this.$router.params._id,
          _id1: this.$router.params._id1
        }
        Taro.request({
          // url: 'https://lee.hhp.im/updateNote',
          url: 'http://localhost:3000/updateNote',
          method: 'POST',
          data: note
        }).then(res => {
          if (res.data === '修改备忘录成功') {
            Taro.showToast({
              title: '保存成功！',
              icon: 'success',
              duration: 2000
            }).then(res => {
              // 跳转至主页
              Taro.redirectTo({
                url: '/pages/index/index'
              })
            })
          }
        })
      } else {
        // 如果是创建新的备忘录
        var note = {
          title: this.state.inputValue,
          date: this.state.dateSel,
          repeat: this.state.selectorChecked,
          top: this.state.top,
          day: this.state.day,
          openid: this.state.openid
        }
        Taro.request({
          // url: 'https://lee.hhp.im/addNote',
          url: 'http://localhost:3000/addNote',
          method: 'POST',
          data: note
        }).then(res => {
          Taro.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 2000
          }).then(res => {
            // 跳转至主页
            Taro.redirectTo({
              url: '/pages/index/index'
            })
          })
        })
      }
    }
  }

  render() {
    let isChoose = null
    let noteDay = null
    let noteTitle = null

    // 选择置顶该条备忘录则top为true
    if (this.state.top === true) {
      isChoose = (
        <View className='choose'>
          <AtIcon value='check-circle' size='25' color='#fad300'></AtIcon>
        </View>
      )
    } else {
      // 选择不置顶该条备忘录则top为false
      isChoose = (
        <View className='choose'>
          <AtIcon value='check-circle' size='25' color='#b4b7ba'></AtIcon>
        </View>
      )
    }

    // 判断备忘录day是否为负数，若是则需要更改样式
    if (this.state.day < 0) {
      noteDay = (
        <Text className='dayR'>{Math.abs(this.state.day)}</Text>
      )
      noteTitle = (
        <Text className='name'>{this.state.inputValue.slice(0,-2) + '已经'}</Text>
      )
    } else {
      noteDay = (
        <Text className='day'>{this.state.day}</Text>
      )
      noteTitle = (
        <Text className='name'>{this.state.inputValue}</Text>
      )
    }
    

    return (
      <View>
        {/* 背景罩 */}
        <View className='mask'></View>

        {/* 返回上一页icon图标 */}
        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#000000'></AtIcon>
        </View>

        {/* 备忘录具体内容 */}
        <View className='titleBox'>
          <Text className='title'>{this.state.title}</Text>
          <Button className='saveBtn' onClick={this.save}>保存</Button>
        </View>

        <View className='inputBox'>
          <Text className='title'>备忘录名称</Text>
          <Input className='input' value={this.state.value} onInput={this.onInput} placeholder='请输入备忘录名称'></Input>
        </View>

        <View className='inputBox'>
          <Text className='title'>日期</Text>
          <Picker mode='date' onChange={this.onDateChange}>
            <View className='picker'>
              {this.state.dateSel}
            </View>
          </Picker>
        </View>

        <View className='inputBox'>
          <Text className='title'>重复</Text>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
            <View className='picker'>
              {this.state.selectorChecked}
            </View>
          </Picker>
        </View>

        <View className='top'>
          <View className='choose' onClick={this.changeChoose}>
            {isChoose}
          </View>
          <Text className='title'>置顶</Text>
        </View>

        {/* 预览备忘录 */}
        <View className='watch'>
          <Text className='title'>预览</Text>
          <View className='watchBox'>
            <View className='watchBoxItem'>
              {noteTitle}
              <Text className='date'>{this.state.dateSel}</Text>
            </View>
            <View className='watchBoxItem'>
              {noteDay}
            </View>
          </View>
        </View>

        {/* 背景图片 */}
        <Image className='bgImg' src={bgImg} />
      </View>
    )
  }
}

