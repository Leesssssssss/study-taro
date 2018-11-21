import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './my.scss'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount() {
    // console.log(1);
    // Taro.request({
    //   url: 'http://novel.juhe.im/categories'
    // })
    //   .then(res => console.log(res.data))
  }

  componentDidMount() {
    // console.log(2);
  }

  componentWillUnmount() {
    // console.log(3);
  }

  componentDidShow() {
    // console.log(4);
  }

  componentDidHide() {
    // console.log(5);
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}

