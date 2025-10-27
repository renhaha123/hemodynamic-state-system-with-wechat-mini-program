//register.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const app = getApp()

Page({
  data: {
    name:"",
    pw_1:"",
    avatarUrl: defaultAvatarUrl,
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    // canIUseNicknameComp: wx.canIUse('input.type.nickname')
    text:"",
    
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    var avatarUrl = e.detail.avatarUrl
    this.setData({avatarUrl:avatarUrl})
  },
  chooseimg(res){
    // console.log(res)
    const avatarUr = res.detail.split("/").pop()
    this.setData({
      "userInfo.avatarUrl": avatarUrl
    })
    // 选择一张图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        console.log(res.tempFilePaths[0])
        // this.setData({tempFilePath:res.tempFilePaths[0]})
        // 上传图片
        wx.cloud.uploadFile({
          cloudPath: '.jpg',
          filePath: tempFilePath, // 文件路径
        }).then(res => {
          console.log('fileID',res.fileID)
        }).catch(error => {
        })
      }
    })
  },
  // onInputChange(e) {
  //   const nickName = e.detail.value
  //   const { avatarUrl } = this.data.userInfo
  //   this.setData({
  //     "userInfo.nickName": nickName,
  //     hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
  //   })
  // },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('getUserProfile',res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onLoad(){
    console.log('register Page执行onLoad'),
    this.models = app.globalData.models
    //this.insertData('张')
    // this.updateData('BR24TEBVJ0','李')
    //this.deleteData('BR25QZJ5K6')

    var that = this
    this.drawPic(that)
  },
  onShow(){
    //console.log('Page执行onShow')
    
  },
  onReady(){
    // console.log('Page执行onReady')
  },
  onHide(){
    // console.log('Page执行onHide')
  },

  async loadData() {
    const {
        data
    } = await this.models.xldlzt.list({
        filter: {
            where: {}, // 查询条件，空对象表示查询所有
        }
    })
    // console.log('数据库查询结果',data.records)
  },

  async insertData(insertData) {
    const {
        data
    } = await this.models.xldlzt.create({
        data: {
            name: insertData
        }
    })
  },

  async updateData(id, updateData) {
    
    await this.models.xldlzt.update({
      data: {
        name: updateData // 姓名
      },
    filter: {
      where: {
        $and: [
          {
            _id: {
              $eq: id, // 推荐传入_id数据标识进行操作
            },
          },
        ]
      }
    },
    })
    this.loadData()
  },
  async deleteData(id) {
    const {
        data
    } = await this.models.xldlzt.delete({
      filter: {
        where: {
          $and: [
            {
              _id: {
                $eq: id, // 推荐传入_id数据标识进行操作
              },
            },
          ]
        }
      }
    })
    console.log('删除成功')
  },
   // 更换图形验证码
   change: function() {
    var that = this
    this.drawPic(that)
  },
  // 随机数
  randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
      },
      /**生成一个随机色**/
      randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
  },
  /**绘制验证码图片**/
  drawPic(that) {
      // ctx = wx.createCanvasContext('canvas');
      var ctx;
      wx.createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .node(({ node: canvas }) => {
          canvas.width = 80
          canvas.height = 30
          const ctx12 = canvas.getContext('2d')
          ctx = ctx12
      })
      .exec((res)=>{
          /**绘制背景色**/
          ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
          ctx.fillRect(0, 0, 90, 28)
          /**绘制文字**/
          var arr;
          var text = '';
          var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
          for (var i = 0; i < 4; i++) {
          var txt = str[this.randomNum(0, str.length)];
          ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
          ctx.font = this.randomNum(20, 25) + 'px SimHei'; //随机生成字体大小
          var x = 5 + i * 16;
          var y = this.randomNum(20, 25);
          var deg = this.randomNum(-20, 20);
          //修改坐标原点和旋转角度
          ctx.translate(x, y);
          ctx.rotate(deg * Math.PI / 180);
          ctx.fillText(txt, 5, 0);
          text = text + txt;
          //恢复坐标原点和旋转角度
          ctx.rotate(-deg * Math.PI / 180);
          ctx.translate(-x, -y);
          }
          /**绘制干扰线**/
          for (var i = 0; i < 3; i++) {
          ctx.strokeStyle = this.randomColor(40, 180);
          ctx.beginPath();
          ctx.moveTo(this.randomNum(0, 90), this.randomNum(0, 28));
          ctx.lineTo(this.randomNum(0, 90), this.randomNum(0, 28));
          ctx.stroke();
          }
          /**绘制干扰点**/
          for (var i = 0; i < 10; i++) {
          ctx.fillStyle = this.randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(this.randomNum(0, 90), this.randomNum(0, 28), 1, 0, 2 * Math.PI);
          ctx.fill();
          }
          that.setData({
              text: text
          })
      })
  },
  inputChange:function(e){
    let { field } = e.currentTarget.dataset
    this.setData({
      [field]: e.detail.value
    })
  },
  getUserID(){
    var str = 'ABCEFGHJKLMNPQRSTWXYqwertyuiopasdfghjklzxcvbnm123456789';
    let id = ''
    let rdm =''
    for (var i = 0; i < 8; i++) {
      rdm = str[Math.floor(Math.random() * (str.length - 0) + 0)];
      id = id + rdm
    }
    let time = ''
    let date = new Date()
    // let year = date.getFullYear()-2000
    // time = time+year.toString()
    // let month = date.getMonth() + 1
    // time = time+month.toString()
    // let day = date.getDate()
    // time = time+day.toString()
    // let hour = date.getHours()
    // time = time+hour.toString()
    // let minute = date.getMinutes()
    // time = time+minute.toString()
    // let second = date.getSeconds()
    // time = time+second.toString()
    let year = date.getFullYear()-2000
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    time = [year, month, day,hour,minute,second].map(this.formatNumber).join('')
    id = id + time
    return id
  },
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  submit:function(){
    let {name, pw,pw_1,val} = this.data
    if(!name||!pw||!pw_1||!val) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    else if(pw!=pw_1){
      wx.showToast({
        title: '输入的两次密码不一致',
        icon: 'none'
      })
      return
    }
    else if(val.toLowerCase()!=this.data.text.toLowerCase()){
      wx.showToast({
        title: '验证码不正确',
        icon: 'none'
      })
      return
    }
    else{
      app.globalData.showAuth = false
      app.globalData.inputDisable = false
      app.globalData.login = true
      // wx.setStorageSync('avatarUrl', this.data.userInfo.avatarUrl)
      let that = this
      var aa = this.data.avatarUrl
      var Url = aa.split('/').pop()
      wx.cloud.uploadFile({
        cloudPath:Url,
        filePath: aa,
        success: res => { 
          wx.cloud.getTempFileURL({
            fileList: [res.fileID], 
            success: ress => {
              that.setData({
                avatarUrl: ress.fileList[0].tempFileURL+'?t='+new Date().getTime(),
                fileID:res.fileID
              }, () => {
               let avatarUrl = this.data.avatarUrl
              //  console.log("222222",this.data.fileID,this.data.avatarUrl)
               let {name,pw,fileID} = this.data
               let id = this.getUserID()
               let record = {name,pw,fileID,user_id:id,avatarUrl:avatarUrl}
              //  console.log("qqqq",record)
               this.insertData_userinfo(record)
               wx.reLaunch({
                 url: '/pages/personal/personal?user_id='+id,
               })
              })
            },
            fail: console.error
          })
  
        },
        fail: err => {
          console.log("上传云存储失败", err)
        }
      })

    }
  },
  async loadData_userInfo() {
    const {
        data
    } = await this.models.user_info.list({
        filter: {
          where: {
            $and: [
              {
                _id: {
                  $eq: id, // 推荐传入_id数据标识进行操作
                },
              },
            ]
          }
        }
    })
    console.log('数据库查询结果',data.records)
  },
  async insertData_userinfo(insertData) {
    const {
        data
    } = await this.models.user_info.create({
        data: {
            name: insertData.name,
            pw:insertData.pw,
            user_ID:insertData.user_id,
            fileID:insertData.fileID
        }
    })
  },

  async updateData_userinfo(id, updateData) {
    
    await this.models.userinfo.update({
      data: {
        name: updateData // 姓名
      },
    filter: {
      where: {
        $and: [
          {
            _id: {
              $eq: id, // 推荐传入_id数据标识进行操作
            },
          },
        ]
      }
    },
    })
    this.loadData()
  },

})
