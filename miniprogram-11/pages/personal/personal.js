// pages/personal/personal.js
const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data: {
    userInfo: null,
    doctor_name:'',

    name:'',
    admission_number:'',
    gender:'',
    birth:'',
    age:'',
    height:'',
    weight:'',
    BMI:'',
    Hb:'',
    CVP:'',

    heart_rate:'',
    stroke_volume:'',
    stroke_index:'',
    cardiac_output:'',
    cardiac_output_index:'',

    stroke_volume_variation:'',
    revised_ejection_time:'',
    thoracic_fluid_content:'',

    SVR:'',
    SVRI:'',

    ICON:'',
    STR:'',
    PEP:'',

    MAP:'',
    SBP:'',
    DBP:'',

    LVET:'',
    VIC:'',

    user_id:'',
    data_id:'',
    records:[],
    avatarUrl:defaultAvatarUrl,
    showList:true,
    showRevise:false,
    login:false
  },
  onLoad: function (options) {
    console.log('personal Page执行onLoad')
    this.setData({login:app.globalData.login})
    if(this.data.login){
      this.models = app.globalData.models
      this.setData({user_id:options.user_id})

    // this.loadData_userInfo(this.data.user_id)
    }
    
  },
  onShow(){
    console.log('personal Page执行onShow')
    if(this.data.login){
      this.loadData_userInfo(this.data.user_id)
    }
  },

  onHide(){
    console.log('person page执行onHide')
    this.setData({
      showRevise:false,
      showList:true
    })
  },
  exitProg:function(){
    let that = this
    wx.showModal({
      title: '确认退出',
      content: '确定要退出小程序吗？',
      success(res) {
        if (res.confirm) {
          wx.exitMiniProgram()
          // wx.removeStorageSync('record_id')
          app.globalData.record_id=''
          app.globalData.login = false
          that.setData({showList:false}) 
          that.onLoad()
        }
      }
    })
  },
  inputChange: function(e) {
    let { field } = e.currentTarget.dataset
    // console.log('111',field)
    this.setData({
      [field]: e.detail.value
    })
    // console.log('222',e.detail.value)
  },
  reviseData(e){
    this.setData({
      showList:false,
      showRevise:true
      })
    let index = e.currentTarget.dataset.index
    let record = this.data.records[index]
    this.setData({
      data_id:this.data.records[index]._id
      })
    // console.log("revise",this.data.records[index])
    this.setData({
      name:record.name,
      admission_number:record.admission_number,
      gender:record.gender,
      birth:record.birth,
      age:record.age,
      height:record.height,
      weight:record.weight,
      BMI:record.BMI,
      Hb:record.Hb,
      CVP:record.CVP,

      heart_rate:record.heart_rate,
      stroke_volume:record.stroke_volume,
      stroke_index:record.stroke_index,
      cardiac_output:record.cardiac_output,
      cardiac_output_index:record.cardiac_output_index,

      stroke_volume_variation:record.stroke_volume_variation,
      revised_ejection_time:record.revised_ejection_time,
      thoracic_fluid_content:record.thoracic_fluid_content,

      SVR:record.SVR,
      SVRI:record.SVRI,

      ICON:record.ICON,
      STR:record.STR,
      PEP:record.PEP,

      MAP:record.MAP,
      SBP:record.SBP,
      DBP:record.DBP,

      LVET:record.LVET,
      VIC:record.VIC,
    })
  },
  saveRevise(){
    this.updateData(this.data.data_id,this.data)
    wx.showToast({
      title: '修改成功',
      icon:'none'
    })
    this.setData({
      showList:true,
      showRevise:false
    })
    this.onShow()
  },
  showRecordDetail(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.records[index]
    wx.showModal({
      title: '记录详情',
      content: `个人信息\r\n姓名：${record.name}\r\n床位号：${record.bed_number}\r\n住院号：${record.admission_number}\r\n流量\r\n心率：${record.heart_rate}bpm\r\n每搏心输入量:${record.stroke_volume}ml\r\n每搏输出指数:${record.stroke_index}BSA\r\n心排量:${record.cardiac_output}l/min\r\n心排指数:${record.cardiac_output_index}BSA\r\n液体状态\r\n每搏输出量变异:${record.stroke_volume_variation}%\r\n修正的射血时间:${record.revised_ejection_time}ms\r\n胸腔液体水平:${record.thoracic_fluid_content}`,
      showCancel: false
    })
  },
  loadUserInfo: function() {
    // let Url=wx.getStorageSync('avatarUrl')
    let Url = this.data.avatarUrl
    if(Url){
      this.setData({
        "avatarUrl":Url
      })
    }
    else{
      this.setData({
        userInfo:{avatarUrl:defaultAvatarUrl}
      })
    }
  },
  async loadData(id) {
    const {
        data
    } = await this.models.xldlzt.list({
        filter: {
          where: {
            $and: [
              {
                record_id: {
                  $eq: id, // 推荐传入_id数据标识进行操作
                },
              },
            ]
          }
        }
    })
  },

 
  async insertData(insertData) {

    const {
        data
    } = await this.models.xldlzt.create({
        data: {
          name:insertData['name'],
          bed_number:insertData['bed_number'],
          admission_number:insertData['admission_number'],

          heart_rate:insertData['heart_rate'],
          stroke_volume:insertData['stroke_volume'],
          stroke_index:insertData['stroke_index'],
          cardiac_output:insertData['cardiac_output'],
          cardiac_output_index:insertData['cardiac_output_index'],

          stroke_volume_variation:insertData['stroke_volume_variation'],
          revised_ejection_time:insertData['revised_ejection_time'],
          thoracic_fluid_content:insertData['thoracic_fluid_content'],

          createTime:insertData['date']
        }
    })

  },

  async updateData(id, updateData) {
    
    await this.models.xldlzt.update({
      data: {
        name:updateData['name'],
        admission_number:updateData['admission_number'],
        gender:updateData['gender'],
        birth:updateData['birth'],
        age:updateData['age'],
        height:updateData['height'],
        BMI:updateData['BMI'],
        weight:updateData['weight'],
        Hb:updateData['Hb'],
        CVP:updateData['CVP'],


        heart_rate:updateData['heart_rate'],
        stroke_volume:updateData['stroke_volume'],
        stroke_index:updateData['stroke_index'],
        cardiac_output:updateData['cardiac_output'],
        cardiac_output_index:updateData['cardiac_output_index'],

        stroke_volume_variation:updateData['stroke_volume_variation'],
        revised_ejection_time:updateData['revised_ejection_time'],
        thoracic_fluid_content:updateData['thoracic_fluid_content'],

        SVR:updateData['SVR'],
        SVRI:updateData['SVRI'],
  
        ICON:updateData['ICON'],
        STR:updateData['STR'],
        PEP:updateData['PEP'],
  
        MAP:updateData['MAP'],
        SBP:updateData['SBP'],
        DBP:updateData['DBP'],
  
        LVET:updateData['LVET'],
        VIC:updateData['VIC'],


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
  async loadData_userInfo(id) {
    const {
      data
    } = await this.models.user_info.list({
        filter: {
          where: {
            $and: [
              {
                user_ID: {
                  $eq: id, // 推荐传入_id数据标识进行操作
                },
              },
            ]
          }
        }
    })
    // console.log("fileID",data.records[0].fileID)
    this.setData({doctor_name:data.records[0].name})
    var that = this
    wx.cloud.downloadFile({
      fileID: data.records[0].fileID,
      success: res => { 
        that.setData({
          avatarUrl: res.tempFilePath
        })
          },
          fail: console.error
    })
    let record_id = data.records[0]._id
    // wx.setStorageSync('record_id', record_id)
    app.globalData.record_id = record_id
    let result
     = await this.models.xldlzt.list({
      filter: {
        where: {
          $and: [
            {
              record_id: {
                $eq: record_id, // 推荐传入_id数据标识进行操作
              },
            },
          ]
        }
      }
  })

  this.setData({records:result.data.records})
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
  toAuthorize:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
}
})
