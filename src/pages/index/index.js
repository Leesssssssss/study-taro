import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import amapFile from '../../libs/amap-wx.js'
import { Map } from '@tarojs/components'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '书架'
  }

  constructor (props) {
    super(props)
    this.state = { 
      markers: []
    }
  }

  componentWillMount() {
    var that = this
    var myAmapFun = new amapFile.AMapWX({key:'393f59f1c7dfbba3e801288e1d455d28'})
    myAmapFun.getPoiAround({
      success: function(data){
        //成功回调
        console.log(data);
        that.setState({
          markers: data.markers
        })
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })

    // Taro.getLocation(params).then(
    //   success: function( res ) {
    //     console.log( res )
    //     that.setData( {
    //       hasLocation: true,
    //       location: {
    //         longitude: res.longitude,
    //         latitude: res.latitude
    //       }
    //     })
    //   }
    // )
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onTap () {}

  render() {
    return (
      <Map className='map' markers={this.state.markers} onClick={this.onTap} />
    )
  }
}

