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
    dateSel: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate(),
    selector: ['不重复', '每年', '每月', '每周'],
    selectorChecked: '不重复',
    day: 0,
    top: true,
    openid: ''
  }

  componentWillMount() {
    Taro.getStorage({ key: 'openid' })
      .then(res =>
        this.state.openid = res.data
      )
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

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  onInput = e => {
    this.setState({
      inputValue: e.detail.value + '还有'
    })
  }

  changeChoose() {
    this.setState({
      top: !this.state.top
    })
  }

  save() {
    if (this.state.inputValue === '备忘录名称') {
      Taro.showToast({
        title: '请输入备忘录名称！',
        image: '../../assets/image/reminder.png',
        duration: 2000
      })
    } else {
      var note = {
        title: this.state.inputValue,
        date: this.state.dateSel,
        repeat: this.state.selectorChecked,
        top: this.state.top,
        day: this.state.day,
        openid: this.state.openid
      }
      Taro.request({
        url: 'http://localhost:3000/addNote',
        method: 'POST',
        data: note
      })
    }
  }

  render() {
    let isChoose = null;
    if (top === true) {
      isChoose = (
        <View className='choose'>
          <AtIcon value='check-circle' size='25' color='#fad300'></AtIcon>
        </View>
      )
    } else {
      isChoose = (
        <View className='choose'>
          <AtIcon value='check-circle' size='25' color='#b4b7ba'></AtIcon>
        </View>
      )
    }
    return (
      <View>
        <Image className='bgImg' src={bgImg} />
        <View className='mask'></View>

        <View className='back' onClick={this.back}>
          <AtIcon prefixClass='icon' value='leftround' size='30' color='#000000'></AtIcon>
        </View>

        <View className='titleBox'>
          <Text className='title'>创建新备忘录</Text>
          <Button className='saveBtn' onClick={this.save}>保存</Button>
        </View>

        <View className='inputBox'>
          <Text className='title'>备忘录名称</Text>
          <Input className='input' onInput={this.onInput} placeholder='请输入备忘录名称'></Input>
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

        <View className='watch'>
          <Text className='title'>预览</Text>
          <View className='watchBox'>
            <View className='watchBoxItem'>
              <Text className='name'>{this.state.inputValue}</Text>
              <Text className='date'>{this.state.dateSel}</Text>
            </View>
            <View className='watchBoxItem'>
              <Text className='day'>{this.state.day}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

