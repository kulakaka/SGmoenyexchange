// index.js
import { getdate } from '../../utils/date'

const db = wx.cloud.database()
const user = db.collection('User')
const Post = db.collection('Post')

Page({
    data:{
        SgdToRmbList:[],
        RmbToSgdList:[],
        active:0
    },

    onLoad(){
        this.getUserInfo()
        this.getPostList(0)
        this.getPostList(1)
    },
    
    async getPostList(type){
      let data={type}
      let dataType = type === 0? 'SgdToRmbList':'RmbToSgdList'
      

      let {result} = await wx.cloud.callFunction({
        name:'getPostList',
        data
      })
      

      result.data?.forEach(item=>item.publish_date=
        getdate(item.publish_date))

        this.setData({
          [dataType]:result.data
        })
    },

    getUserInfo(){
      user.get().then(res=>{
        if(res.data.length===1){
          wx.setStorageSync('currentUser',res.data[0])
        } else{
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      })
    },

      onChange(event){
        this.setData({active:event.detial.name})
        this.getPostList(event.detial.name)
      },

      toPost(event){
        wx.navigateTo({
          url: `/pages/myPost/post?id=${event.currenntTarget.id}`
        })
      }

})
