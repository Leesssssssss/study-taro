import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import './search.scss'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '搜索'
  }

  constructor (props) {
    super(props)
    this.state = { 
      books: []
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onInput(e) {
    this.setState({
      value: e.target.value
    })
    Taro.request({
      url: 'http://novel.juhe.im/search?keyword=' + e.target.value
    })
      .then(res => 
        this.state.books = res.data.books,
        console.log(this.state.books)
        )
  }

  render() {
    return (
      <View>
        <Input className='search' type='text' placeholder='搜索书名、作者、出版社' placeholderStyle='color:#bdbdbd;font-size:15px' value={this.state.value} onInput={this.onInput}/>

        <View>

        </View>
      </View>
    )
  }
}

