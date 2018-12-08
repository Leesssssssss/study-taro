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
    openid: ''
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
        top: (this.$router.params.top) === "false" ? false : true
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
          _id: this.$router.params._id
        }
        console.log(note);
        Taro.request({
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
              console.log(res);
              // 跳转至主页
              Taro.navigateTo({
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
          url: 'http://localhost:3000/addNote',
          method: 'POST',
          data: note
        }).then(res => {
          console.log(res.data);

          Taro.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 2000
          }).then(res => {
            console.log(res);
            // 跳转至主页
            Taro.navigateTo({
              url: '/pages/index/index'
            })
          })
        })
      }
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

