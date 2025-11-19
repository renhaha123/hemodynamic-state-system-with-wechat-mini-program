// app.js
const {init} = require("./wxCloudClientSDK.umd.js")

App({
  onLaunch: function () {
    // 小程序启动时执行的逻辑
    console.log('小程序启动')

    //微信云初始化
    wx.cloud.init({
      env: "", // 替换为您的云开发环境 ID
      traceUser: true
    })

    // 初始化数据模型客户端
    const client = init(wx.cloud)
    this.globalData.client = client

    // 将 models 挂载到全局，方便在页面中使用
    this.globalData.models = client.models
    console.log("数据模型 SDK 初始化完成")
  },

  globalData: {
    // 全局数据
    patientRecords: [],
    models:null,
    showAuth:true,
    inputDisable:true,
    login:false,
    record_id:'',
    client:''
  }
})
