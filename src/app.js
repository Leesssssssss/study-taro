import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import './icon.scss'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/bookStore/bookStore',
      'pages/search/search',
      'pages/my/my'

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#888888',
      selectedColor: '	#6190E8',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '书架',
          iconPath: './assets/image/book.png',
          selectedIconPath: './assets/image/bookd.png'
        },
        {
          pagePath: 'pages/bookStore/bookStore',
          text: '书城',
          iconPath: './assets/image/bookStore.png',
          selectedIconPath: './assets/image/bookStored.png'
        },
        {
          pagePath: 'pages/search/search',
          text: '搜索',
          iconPath: './assets/image/search.png',
          selectedIconPath: './assets/image/searchd.png'
        },
        {
          pagePath: 'pages/my/my',
          text: '我的',
          iconPath: './assets/image/my.png',
          selectedIconPath: './assets/image/myd.png'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
