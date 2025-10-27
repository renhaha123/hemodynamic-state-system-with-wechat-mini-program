// login.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const app = getApp()

Page({
  data: {
    name:"",
    pw:"",
    text:"",
    record_name:'',
    record_pw:'',
    user_id:'',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      // nickName: '',
    },
    record_id:'',
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    // canIUseNicknameComp: wx.canIUse('input.type.nickname')
    
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    // const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: avatarUrl && avatarUrl !== defaultAvatarUrl,
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
  register:function(){
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },
  submit:function(){
    let {name,pw,val} = this.data
    if(!name||!pw||!val) {
      wx.showToast({
        title: '请填写完整信息',
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
      this.loadData_userInfo(name,pw)
      //   data = data.data.records[0]
      //   this.setData({record_name:data.name})
      //   this.setData({record_pw:data.pw})
      //   this.setData({user_id:data._id})
      //   // console.log('record',this.data.record_name,this.data.record_pw,pw)
      // })
      // console.log('record',this.data.record_name,this.data.record_pw,pw)
      // if(pw!=this.data.record_pw){
      //   wx.showToast({
      //     title: '密码不正确',
      //     icon: 'none'
      //   })
      //   return
      // }
    }
  },
 async loadData_userInfo(name,pw) {
    const {
        data
     }= await this.models.user_info.list({
        filter: {
          where: {
            $and: [
              {
                name: {
                  $eq: name, // 推荐传入_id数据标识进行操作
                },
              },
            ]
          }
        }
    })
    if(data.records.length==0){
      wx.showToast({
        title: '无此用户',
        icon: 'none'
      })
      return
    }
    else if(pw!=data.records[0].pw){
      wx.showToast({
        title: '密码不正确',
        icon: 'none'
      })
      return
    }
    else{
      this.setData({user_id:data.records[0].user_ID})
      app.globalData.showAuth = false
      app.globalData.inputDisable = false
      app.globalData.login = true
      wx.reLaunch({
        url: '/pages/personal/personal?user_id='+this.data.user_id,
      })
     
    }
  },
  async insertData_userinfo(insertData) {
    const {
        data
    } = await this.models.user_info.create({
        data: {
            name: insertData.name,
            pw:insertData.pw,
            user_ID:insertData.user_id
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
