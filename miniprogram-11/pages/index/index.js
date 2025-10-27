// pages/index/index.js

const app = getApp()

Page({
  data: {
    name:'',
    admission_number:'',
    gender:'',
    birth:'',
    age:'',
    height:'',
    weight:'',
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

    showAuth:'',
    inputDisable:'',

    record_id:''

  },
  onLoad: function (options) {

    this.models = app.globalData.models
    this.setData({
      showAuth:app.globalData.showAuth,
      inputDisable:app.globalData.inputDisable,
    })
  },
  // 输入框内容变化时触发
  inputChange: function(e) {
    let { field } = e.currentTarget.dataset
    this.setData({
      [field]: e.detail.value
    })

  },
  // 保存病人指标信息
  saveRecord: function() {
    let mydate = new Date()
    mydate = this.formatDate(mydate)
    this.setData({date:mydate})
    
    this.setData({record_id:app.globalData.record_id})

    let { 
      name,
      admission_number,
      gender,
      birth,
      age,
      height,
      weight,
      Hb,
      CVP,
  
      heart_rate,
      stroke_volume,
      stroke_index,
      cardiac_output,
      cardiac_output_index,
  
      stroke_volume_variation,
      revised_ejection_time,
      thoracic_fluid_content,
  
      SVR,
      SVRI,
  
      ICON,
      STR,
      PEP,
  
      MAP,
      SBP,
      DBP,
  
      LVET,
      VIC,

      date,
      record_id
   } = this.data
   
    if (!name||
      !admission_number||
      !gender||
      !birth||
      !age||
      !height||
      !weight||
      !Hb||
      !CVP||
      !heart_rate||
      !stroke_volume||
      !stroke_index||
      !cardiac_output||
      !cardiac_output_index||
      !stroke_volume_variation||
      !revised_ejection_time||
      !thoracic_fluid_content||
      !SVR||
      !SVRI||
      !ICON||
      !STR||
      !PEP||
      !MAP||
      !SBP||
      !DBP||
      !LVET||
      !VIC) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    weight = Number(weight)
    height = Number(height)
    var BMI= (weight/((height/100)**2)).toFixed(2)

    let record = {
      name,
      admission_number,
      gender,
      birth,
      age,
      height,
      weight,
      BMI,
      Hb,
      CVP,
  
      heart_rate,
      stroke_volume,
      stroke_index,
      cardiac_output,
      cardiac_output_index,
  
      stroke_volume_variation,
      revised_ejection_time,
      thoracic_fluid_content,
  
      SVR,
      SVRI,
  
      ICON,
      STR,
      PEP,
  
      MAP,
      SBP,
      DBP,

      LVET,
      VIC, 
      date,
      record_id}
    try{
      this.insertData(record)
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
    }
    catch(error){
      console.log('error:',error.message)
    }

    // 获取全局数据
    // let app = getApp()
    // app.globalData.patientRecords.push(record)
    // // 保存到本地存储
    // wx.setStorage({
    //   key: 'patientRecords',
    //   data: app.globalData.patientRecords
    // })

    // 清空输入框
    this.setData({
      name:'',
      admission_number:'',
      gender:'',
      birth:'',
      age:'',
      height:'',
      weight:'',
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
    })
  },
  // 格式化日期
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

  async loadData() {
    const {
        data
    } = await this.models.xldlzt.list({
        filter: {
            where: {}, // 查询条件，空对象表示查询所有
        }
    })
    console.log('数据库查询结果',data.records)
  },

 
  async insertData(insertData) {

    const {
        data
    } = await this.models.xldlzt.create({
        data: {
          name:insertData['name'],
          admission_number:insertData['admission_number'],
          gender:insertData['gender'],
          birth:insertData['birth'],
          age:insertData['age'],
          height:insertData['height'],
          BMI:insertData['BMI'],
          weight:insertData['weight'],
          Hb:insertData['Hb'],
          CVP:insertData['CVP'],


          heart_rate:insertData['heart_rate'],
          stroke_volume:insertData['stroke_volume'],
          stroke_index:insertData['stroke_index'],
          cardiac_output:insertData['cardiac_output'],
          cardiac_output_index:insertData['cardiac_output_index'],

          stroke_volume_variation:insertData['stroke_volume_variation'],
          revised_ejection_time:insertData['revised_ejection_time'],
          thoracic_fluid_content:insertData['thoracic_fluid_content'],

          SVR:insertData['SVR'],
          SVRI:insertData['SVRI'],
    
          ICON:insertData['ICON'],
          STR:insertData['STR'],
          PEP:insertData['PEP'],
    
          MAP:insertData['MAP'],
          SBP:insertData['SBP'],
          DBP:insertData['DBP'],
    
          LVET:insertData['LVET'],
          VIC:insertData['VIC'],

          createTime:insertData['date'],

          record_id:{_id:insertData['record_id']}
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
  toAuthorize:function(){
      wx.redirectTo({
        url: '/pages/login/login',
      })
  }


})
