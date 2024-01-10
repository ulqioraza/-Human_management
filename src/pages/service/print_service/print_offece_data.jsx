import React, { Component, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Moment from 'moment';

//pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  tahoma: {
    normal: 'tahoma.ttf',
    bold: 'tahomabd.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

function Print_Offence_Data(props) {

  const bodyData = []
  const headerTable = 0
  var allPageData = 20
  var pageDataFirst = 0
  var pageDataLast = 20
  var pdfTable = []
  var pdfHead = []
  var pdfFooter = []
  var lastRow = 21
  var remark = ''
  var daily_list = []
  var count = 0
  const lastTable = 21
  const [checkLastTable, setCheckLastTable] = useState(0)
  var user = ''
  //const page = Math.ceil(props.value.length/10)
  const token = localStorage.getItem('accessToken')

  function getData(){
    const postDlist = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  token
        },
        body: JSON.stringify(props.value.id)
      }
    const postUser = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  token
        },
        body: JSON.stringify(props.user)
      }

    if(props.value.id !== 0 || props.value.id !== undefined){

        fetch(window.server + '/offence_by_id' , postDlist)
            .then(res => res.json())
            .then(result => (getDaily_List(result)))
            .catch(err => alert(err))
    
    }

    //createPDF()
  }

  function getDaily_List(data){
    const postUser = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  token
      },
      body: JSON.stringify(props.user)
    }
    daily_list = data.offence[0]
    fetch(window.server + '/get_user/' , postUser)
        .then(res => res.json())
        .then(result => getUser(result.user[0]))
        .catch(err => alert(err))
    
  }

  function getUser(data){
    
    user = 'username'
    createPDF()
  }

  function createHead(){
    if(props.value.place === undefined){
      var place = ''
    }else{
      place = props.value.place
    }
    if(daily_list.last_name === null){
      var l_name = ' '
    }else{
      l_name = daily_list.last_name
    }
    if(daily_list.offence_result_id === 1){
      var a = '√'
      var b = ''
      var c = ''
      var d = ''
      var e = ''
      var f = ''
      var g = ''
      var h = ''
      var remark1 = ' '
      var remark2 = ' '
      var remark3 = ' '
      var remark4 = ' '
      var remark5 = ' '
    }else if(daily_list.offence_result_id === 2){
       a = ''
       b = '√'
       c = ''
       d = ''
       e = ''
       f = ''
       g = ''
       h = ''
       remark1 = ' '
       remark2 = ' '
       remark3 = ' '
       remark4 = ' '
       remark5 = ' '
    }else if(daily_list.offence_result_id === 3){
        a = ''
        b = ''
        c = '√'
        d = ''
        e = ''
        f = ''
        g = ''
        h = ''
        remark1 = ' '
        remark2 = ' '
        remark3 = ' '
        remark4 = ' '
        remark5 = ' '
    }else if(daily_list.offence_result_id === 4){
        a = ''
        b = ''
        c = ''
        d = '√'
        e = ''
        f = ''
        g = ''
        h = ''
        remark1 = daily_list.result_remark
        remark2 = Moment(daily_list.furlough_start).format('DD-MM-YYYY')
        remark3 = Moment(daily_list.furlough_end).format('DD-MM-YYYY')
        remark4 = ' '
        remark5 = ' '
    }else if(daily_list.offence_result_id === 6){
      a = ''
      b = ''
      c = ''
      d = ''
      e = '√'
      f = ''
      g = ''
      h = ''
        remark1 = ''
        remark2 = ''
        remark3 = ''
        remark4 = ' '
        remark5 = daily_list.result_remark
    }else if(daily_list.offence_result_id === 7){
      a = ''
      b = ''
      c = ''
      d = ''
      e = ''
      f = '√'
      g = ''
      h = ''
        remark1 = ' '
        remark2 = ' '
        remark3 = ' '
        remark4 = Moment(daily_list.fire_date).format('DD-MM-YYYY')
        remark5 = ' '
    }else{

    }
    pdfHead =  [

      {
        columns:[
            { text: '', style: 'header' } , 
            { text: 'บริษัท โรโตโมล์ดิ้ง จำกัด', style: 'subheader' },
            { text: '', style: 'header' }   
        ]
      },
      {
        columns:[
          { text: '', style: 'header' } , 
          { text: 'ROTO MOLDING CO..LTD.', style: 'secondheader' },
          { text: '', style: 'header' }
        ]
      },
      {
        columns:[
          { text: '', style: 'header' } , 
          { text: 'หนังสือตักเตือน', style: 'secondheader' },
          { text: '', style: 'header' }
        ]
      },
      {
        columns:[
          { text: ' ' , style: 'detailleftheader'} , 
          { text: '', style: 'detailrightheader'}
        ]
      },
      {
        columns:[
          { text: '' , style: 'detailrightheader'} , 
          { text: '' , style: 'detailrightheader'} , 
          { text: '\nวันที่ ' + Moment(props.value.offence_date).format('DD') + 
                    ' เดือน ' + Moment(props.value.offence_date).format('MM') + 
                    ' ค.ศ. ' + Moment(props.value.offence_date).format('yyyy'), style: 'detailrightheader'}
        ]
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '12%','88%'],
  
          body: [ 
        
            [ { text: '\nเรื่อง', style: 'detaitableheader'}, 
            { text: '\n' + props.value.offence_title , style: 'detaitableheader' }], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '12.43%','36%','10.25%','41.3%'],
  
          body: [ 
        
            [ { text: '\nเรียน', style: 'detaitableheader'}, 
            { text: '\n' + daily_list.name + ' ' + l_name , style: 'detaitableheader' },
            { text: '\nแผนก', style: 'detaitableheader'},
            { text: '\n' + daily_list.department, style: 'detaitableheader'},], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '12%','88%',],
  
          body: [ 
        
            [ { text: '\nตำแหน่ง', style: 'detaitableheader'}, 
            { text: '\n' + daily_list.postion , style: 'detaitableheader' },], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '60%','40%',],
  
          body: [ 
        
            [ { text: '\nด้วยท่านได้กระทำการฝ่าฝืนกฎระเบียบข้อบังคับของบริษัทฯ เมื่อวันที่', style: 'detaitableheader'}, 
            { text: '\n' + Moment(props.value.offence_date).format('DD-MM-yyyy') , style: 'detaitableheader' },], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '12%','88%',],
  
          body: [ 
        
            [ { text: '\nสถานที่', style: 'detaitableheader'}, 
            { text: '\n' + props.value.place , style: 'detaitableheader' },], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '100%'],
  
          body: [ 
        
            [ { text: '\nความผิดครั้งนี้เนื่องมาจาก', style: 'detaitableheader'}, 
            ], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'black';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '100%'],
          body: [ 
            [ { text: props.value.offence_detail, style: 'detailleftheader1'}, 
            ], 
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'white' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '100%'],
  
          body: [ 
        
            [ { text: '\nรายละเอียดความเสียหาย', style: 'detaitableheader'}, 
            ], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'black' : 'black';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '100%'],
          body: [ 
        
            [ { text: props.value.offence_detail, style: 'detailleftheader1'}, 
            ], 
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'white' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        style: 'topTable',
        color: '#000',
        table: {
          widths: [ '100%'],
  
          body: [ 
        
            [ { text: ' ', style: 'detaitableheader'}, 
            ], 
  
          ]
        },
        layout: {     
            hLineColor: function(i, node) {
                return (i===0) ? 'white' : 'black';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === 5|| i === node.table.widths.length) ? 'black' : 'black';
            },
            paddingLeft: function(i, node) { return 5; },
            paddingRight: function(i, node) { return 4; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 2; },
            fillColor: function (i, node) {
              return (i === 0 || i >= node.table.widths.length) ?  'white' : 'white';
          }
        }
      },
      {
        columns:[
          { text: ' ' , style: 'detailleftheader'} , 
          { text: ' ', style: 'detailrightheader'},
        ]
      },
      {
        columns:[
          { text: ' ' , style: 'detailleftheader'} , 
          { text: ' ', style: 'detailrightheader'},
        ]
      },
      {
        columns:[
          { text: 'ในกรณีนี้พิจารณาให้ :' , style: 'detailleftheader'} , 
          { text: ' ', style: 'detailrightheader'},
        ]
      },
      { text: '\n' + a + ' ตักเตือนด้วยวาจา       ' + b + '  ตักเตือนเป็นลายลักษณ์อักษร       ' + c + '   ตักเตือนเป็นครั้งสุดท้าย' +
                    '\n\n' + d + ' พักงาน:  ' + remark1 + '  ตั้งแต่: ' + remark2 + ' ถึง : ' + remark3 +  
                    '\n\n' + e + ' ภาคทัณฑ์' + 
                    '\n\n' + f + ' รับผิดชอบค่าเสียหายที่เกิดขึ้น   รวมเป็นเงิน     ' +  remark5 + '      บาท' +
                    '\n\n' + g + ' พ้นสภาพการเป็นพนักงาน ตั้งแต่วันที่ :  ' +  remark4
            , style: 'detailrightheader'}
    ]
  }

  function createFooter(){
    pdfFooter = [
      {
        columns:[
          { text: '\nลงชื่อ ______'+ daily_list.name + '_' + daily_list.last_name +'_______ รับทราบ', style: 'footerdetail2' } , 
          { text: '\nลงชื่อ ________'+ daily_list.create_user +  '_________รับทราบ', style: 'footerdetail2' } ,
        ]
      },
      {
        columns:[
          { text: '(..................................................)     ', style: 'footerdetail3' } , 
          { text: '(..................................................)     ', style: 'footerdetail3' } , 
        ]
      },
      {
        columns:[
          { text: '\n    ผู้ถูกตักเตือน     ', style: 'footerdetail5' } , 
          { text: '\n    ผู้ประสานงาน / ผู้รายงาน     ', style: 'footerdetail4' } , 
        ]
      },
      {
        columns:[
          { text: '\n', style: 'footerdetail' } , 
          { text: '\nลงชื่อ:________________________________', style: 'footerdetail2' },
        ]
      },
      {
        columns:[
          { text: '', style: 'footerdetail2' } , 
          { text: '(........................................................)', style: 'footerdetail3' },
        ]
      },
      {
        columns:[
          { text: '', style: 'footerdetail2' } , 
          { text: 'กรรมการผู้จัดการ / ผู้จัดการฝ่ายวางแผนการผลิต', style: 'footerdetail' },
        ]
      },
      {
        columns:[
          { text: '' + '\n' + 'FM-HR-011 Rev01', style: 'footer' },
        ]
      }
    ]
  }

  function createPDF(){

      createHead();
      createFooter();
     
      var dataContent = [pdfHead,pdfTable,pdfFooter]
      
    var docDefinition = {
      
      content: [
        dataContent
      ],
      pageSize: 'A4',
      pageMargins: [10,10,10,10],
      //pageOrientation: 'landscape',
      defaultStyle:{
        font:'tahoma'
      },
      styles: {
        topHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 6, 0, 30],
            alignment: 'left'
        },
        topTable: {
            fontSize: 10,
            font:'tahoma',
            alignment: 'left',
            color: 'black',
            margin: [0, 0, 0, 0],
        },
        
        header: {       
            fontSize: 10,
            bold: true,
            margin: [0, 0, 0, 15],
            alignment: 'left'
        },
        subheader: {       
          fontSize: 15,
          bold: true,
          margin: [0, 15, 0, 15],
          alignment: 'center'
        },
        secondheader: {       
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 15],
          alignment: 'center'
        },
        detailheader: {       
          fontSize: 11,
          bold: false,
          margin: [20, 0, 0, 15],
          alignment: 'left'
        },
        rightheader: {
          fontSize: 9,
          bold: true,
          margin: [0, 0, 0, 15],
          alignment: 'right'
        },
        detailtableheader: {         
          fontSize: 11,
          bold: false,
          margin: [20, 0, -20, 15],
          alignment: 'left'
        },
        detailleftheader: {         
          fontSize: 10,
          bold: false,
          margin: [20, -15, -20, 15],
          alignment: 'left'
        },
        detailleftheader1: {         
          fontSize: 11,
          bold: false,
          margin: [50, 10, -20, 15],
          alignment: 'left'
        },
        detailmiddle: {         
          fontSize: 10,
          bold: false,
          margin: [-170, -15, -20, 15],
          alignment: 'left'
        },
        detailrightheader: {       
          fontSize: 10,
          bold: false,
          margin: [42, -15, 0, 15],
          alignment: 'left'
        },
        footerdetail: {       
          fontSize: 9,
          bold: false,
          margin: [45, 5, 0, 0],
          alignment: 'left'
        },
        footerdetail2: {       
          fontSize: 10,
          bold: false,
          margin: [10, 0, 0, 10],
          alignment: 'left'
        },
        footerdetail3: {       
          fontSize: 10,
          bold: false,
          margin: [35, 0, 0, 10],
          alignment: 'left'
        },
        footerdetail4: {       
          fontSize: 10,
          bold: false,
          margin: [70, 0, 0, 10],
          alignment: 'left'
        },
        footerdetail5: {       
          fontSize: 10,
          bold: false,
          margin: [78, 0, 0, 10],
          alignment: 'left'
        },
        footer: {
            fontSize: 9,
            margin: [0, 15, 0, 25],
            alignment: 'right'
        }
      }
    };

      pdfMake.createPdf(docDefinition).open()
    }
    return (
     
          <a onClick={getData}><i style={{color: "brown"}} title="Print Training" class="fa fa-file fa-2x "></i></a>
     
    ) 
  }

export default Print_Offence_Data;