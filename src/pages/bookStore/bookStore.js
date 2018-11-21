import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './bookStore.scss'
import { AtTabBar } from 'taro-ui'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '书城'
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

  constructor() {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  handleClick(value) {
    this.setState({
      current: value
    })
    Taro.navigateTo({
      url: '../bookStore/bookStore.js'
    })
  }

  render() {
    return (
      <View>
        {/* <AtTabBar
          color='#888888'
          fixed
          tabList={[
            { title: '书架', iconPrefixClass: 'icon', iconType: 'book' },
            { title: '书城', iconPrefixClass: 'icon', iconType: 'bookStore' },
            { title: '搜索', iconType: 'search' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        /> */}
      </View>
    )
  }
}

