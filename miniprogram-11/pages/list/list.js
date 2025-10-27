// pages/list/list.js

const app = getApp()

Page({
  data: {
    records: [],
    showAuth:null,
    showDetail:false,

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

    date:'',
    doctor:''
  },

  onLoad: function (options) {
    this.models = app.globalData.models
    this.setData({showAuth:app.globalData.showAuth})
  },

  onShow: function () {
    // 页面显示时，从本地存储获取数据
    console.log('list Page执行onShow')
    if(!this.data.showAuth){
      this.loadData()
    }   
  },
  onHide: function () {
    console.log('list page执行onHide')
    this.setData({showDetail:false})
  },
  loadRecords: function() {
    let app = getApp()
    wx.getStorage({
      key: 'patientRecords',
      success: (res) => {
        app.globalData.patientRecords = res.data
        this.setData({
          records: res.data
        })
      },
      fail: () => {
        this.setData({
          records: []
        })
      }
    })
  },
  formatDate: function(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [year, month, day].map(this.formatNumber).join('-')+' '+[hour,minute,second].map(this.formatNumber).join(':')
  },
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  closeDetail:function(){
    this.setData({showDetail:false})
  },
  showDetail:function(e){
    this.setData({showDetail:true})
    let index = e.currentTarget.dataset.index
    let record = this.data.records[index]
    // console.log('@@@',record)
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


      date:record.createTime,
      doctor:record.record_id
    })
  },
  showRecordDetail: function(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.records[index]
    wx.showModal({
      title: '记录详情',
     content:`个人信息\t\n姓名：${record.name}\u3000\u3000\u3000\u3000\u3000\u3000\t\n床位号：${record.bed_number}\u3000\u3000\u3000\u3000\u3000\u3000\t\n住院号：${record.admission_number}\u3000\u3000\u3000\u3000\t\n流量\r\n心率：${record.heart_rate}bpm\u3000\u3000\u3000\u3000\u3000\t\n每搏心输入量:${record.stroke_volume}ml\u3000\u3000\u3000\t\n每搏输出指数:${record.stroke_index} BSA\u3000\u3000\u3000\t\n心排量:${record.cardiac_output} l/min\u3000\u3000\u3000\u3000\u3000\t\n心排指数:${record.cardiac_output_index} BSA\u3000\u3000\u3000\u3000\u3000\t\n液体状态\u3000\t\n每搏输出量变异:${record.stroke_volume_variation} %\u3000\u3000\u3000\t\n修正的射血时间:${record.revised_ejection_time} ms\u3000\u3000\t\n胸腔液体水平:${record.thoracic_fluid_content}\u3000\u3000\u3000\u3000\u3000\t\n医生:${record.record_id}\u3000\u3000\u3000\u3000\u3000\u3000\t\n日期:${record.createTime}`,
      showCancel: false
    })
  },

  async loadData() {
    try{
        const {
        data
        } = await this.models.xldlzt.list({
            filter: {
                where: {
                 
                }, // 查询条件，空对象表示查询所有
            }
        })
        this.setData({records:data.records})
        let result = await this.models.user_info.list({
          filter: {
              where: {
               
              }, // 查询条件，空对象表示查询所有
          }
        })
        // this.setData({record:result.data.records})
        // console.log('$$$$%%%%%',data.records.length,result.data.records.length)
        for(var i=0;i<data.records.length;i++){
          for(var j=0;j<result.data.records.length;j++){
            if(data.records[i].record_id==result.data.records[j]._id){
              // console.log('###',this.data.records[i].record_id)
              this.data.records[i].record_id = result.data.records[j].name
              // console.log('@@@',i,j,this.data.records[i].record_id,result.data.records[j].name)
            }
          }
        }
      } catch(error){
        console.error()
      }
    
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
          cardiac_output_index:insertData[' cardiac_output_index'],

          stroke_volume_variation:insertData['stroke_volume_variation'],
          revised_ejection_time:insertData['revised_ejection_time'],
          thoracic_fluid_content:insertData['thoracic_fluid_content'],

          createTime:date
        }
    })
    console.log('已成功插入数据')
  },

  async updateData(id, updateData) {
    
    await this.models.xldlzt.update({
      data: {
        cardiac_output_index: updateData // 姓名
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
  }
})
