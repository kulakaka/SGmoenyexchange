// pages/post/post.js
let app = getApp()

// 引入date
import { getdate } from '../../utils/date'

const db = wx.cloud.database()


Page({
  data: {
    bottomLift: app.globalData.bottomLift,
    postInfo: {}
  },

  /**
   * 页面加载
   */
  onLoad(options) {
    // 获取帖子详情信息
    this.getPostInfo(options.id)
  
  },

  // 获取帖子详情信息
  async getPostInfo(id) {
    // 获取帖子
    let { result } = await wx.cloud.callFunction({
      name: 'getPostInfo',
      data: { id }
    })
    // 将发布时间改成文字
    result.data.publish_date = getdate(result.data.publish_date)
    this.setData({ postInfo: result.data })
  },

  
  /**
   * 用户点击右上角转发
   */
  onShareAppMessage() {
    let { author_name, content } = this.data.postInfo
    let title = `@${author_name}: ${content}`
    return { title }
  }
})
