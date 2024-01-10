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

function Print_Absend_History(props) {

  const bodyData = []
  const headerTable = 0
  var allPageData = 19
  var pageDataFirst = 0
  var pageDataLast = 19
  var pdfTable = []
  var pdfHead = []
  var pdfFooter = []
  var lastRow = 20
  var remark = ''
  var daily_list = []
  var count = 0
  const lastTable = 20
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

        fetch(window.server + '/emp_by_id' , postDlist)
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
    daily_list = data.absend_history
    count = data.count_do
    fetch(window.server + '/get_user/' , postUser)
        .then(res => res.json())
        .then(result => getUser(result.user[0]))
        .catch(err => alert(err))
    
  }

  function getUser(data){
  
    createPDF()
  }

  function createHead(i,page){
   
    pdfHead =  [
      {
        columns:[
          
          { text: ' ', style: 'header'},
          { text: ' ', style: 'header' },
          { text: ' ', style: 'rightheader' },
        ]
      },
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
          { text: 'ประวัติการลา', style: 'subheader' },
          { text: '', style: 'header' }
        ]
      },
      {
        columns:[
          { text: '\nชื่อ-นามสกุล : ' + props.value.name + ' ' + props.value.last_name , style: 'detailleftheader'} , 
          { text: '\nแผนก : ' + props.value.department_name , style: 'detailleftheader'} ,
          { text: '\nตำแหน่ง : ' + props.value.position_name, style: 'detailleftheader'}
        ]
      },
    ]
  }

  function createFooter(){
    pdfFooter = [
      {
        columns:[
          { text: '' + '\n' + 'FM-HR-016 rev.00', style: 'footer' },
        ]
      }
    ]
  }

  function createFooterblank(){
    pdfFooter = [
      {
          columns:[
              { text: ''  + '\n' + 'FM-HR-016 rev.00', style: 'footer' },
          ]
          
          }
    ]
  }


  function Toptable(j,page){

    var column = [];

      column.push('ลำดับที่');
      column.push('ประเภท');
      column.push('สาเหตุ');
      column.push('วันที่เริ่มลา');
      column.push('วันสิ้นสุดการลา');
      column.push('วันที่มาทำงาน');
      column.push('จำนวน (วัน)'); 
      column.push('ผู้ขอลา'); 
      column.push('หัวหน้าแผนก');
      column.push('ฝ่ายบุคคล');

      bodyData[headerTable] = column;
    if((j+1) < page){
      var totalWeight = [];
              
          totalWeight.push('');
          totalWeight.push('');
          totalWeight.push(' ');
          totalWeight.push(' ');
          totalWeight.push(' ');
          totalWeight.push(' ');
          totalWeight.push(' ');
          totalWeight.push(' ');
          totalWeight.push(' ');
          totalWeight.push(' ');
          

      bodyData[lastTable] = totalWeight;
    }else{
      var totalWeight = [];
              
        totalWeight.push('');
        totalWeight.push('');
        totalWeight.push('');
        totalWeight.push(' ');
        totalWeight.push(' ');
        totalWeight.push(' ');
        totalWeight.push(' ');
        totalWeight.push(' ');
        totalWeight.push(' ');
        totalWeight.push(' ');
        

      bodyData[lastTable] = totalWeight;
    }
  }

  function createTable(i,page){
    var sourceData = [];   
    if(pageDataLast > daily_list.length){
            var plast = daily_list.length
            var pageDataItem = daily_list.slice(pageDataFirst,plast);
            sourceData = pageDataItem;
            var num = pageDataFirst;
            var sizeOfItem = sourceData.length;
            pageDataLast = plast
            Toptable(i,page)
    }else{
            var pageDataItem = daily_list.slice(pageDataFirst,pageDataLast);
            sourceData = pageDataItem;
            var sizeOfItem = sourceData.length;
            pageDataLast = pageDataLast + allPageData
            var num = pageDataFirst;
            pageDataFirst = pageDataFirst + allPageData
            Toptable(i,page)
    }
    
    for(var i = 0; i < allPageData; i++) {
      //alert(JSON.stringify(data[i].name))
      var dataRow = []
      if(sourceData[i] === undefined){
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');
        dataRow.push('');

      }else{
       /* if(page > 0){
          dataRow.push(i+(num+1));
        }else{
          dataRow.push(i+1);
        }*/
        dataRow.push(i+(num+1));
        dataRow.push(sourceData[i].absend_type);
        dataRow.push(sourceData[i].motive);
        dataRow.push(Moment(sourceData[i].start_date).format('DD-MM-yyyy'));
        dataRow.push(Moment(sourceData[i].end_date).format('DD-MM-yyyy'));
        dataRow.push(Moment(sourceData[i].work_date).format('DD-MM-yyyy'));
        dataRow.push(sourceData[i].date_amount);
        dataRow.push(props.value.name);
        dataRow.push(sourceData[i].user_stamp);
        dataRow.push(sourceData[i].user_update);
      }

      bodyData[i+1] = dataRow
    }
    //alert(JSON.stringify(bodyData))
    var dataItem = bodyData.map(function(item){
      return[
        { text: item[0], alignment : 'right'},
        item[1],
        { text: item[2], alignment : 'left'},
        item[3],
        { text: item[4], alignment : 'left'},
        item[5],
        {text: item[6], alignment: 'right', noWrap: true},
        {text: item[7], alignment: 'right', noWrap: true},
        {text: item[8], alignment: 'right', noWrap: true},
        {text: item[9], alignment: 'right', noWrap: true}
      ]
    })
    
    pdfTable = [    
      {
        style: 'topTable',
        table: {
          widths: ['5%','8%','20%','10%', '10%','10%','8%','8%','10%','11%'],
          heights: [1,1,1,1,1,1,1,1,1,1],
          headerRows: 1,
          body: dataItem
        },      
        layout: {
          paddingLeft: function(i, node) { return 8; },
          paddingRight: function(i, node) { return 8; },
          paddingTop: function(i, node) { return 3; },
          paddingBottom: function(i, node) { return 3; },
          fillColor: function (i, node) {
              return (i === 0 || i >= lastRow) ?  '#F5F5F5' : null;
          }
        },
        
      }
  
    ]
  }


  function createPDF(){
    pageDataFirst = 0
    pageDataLast = 19
    //alert(JSON.stringify(props.value))
    //alert(JSON.stringify(daily_list))
    var page = Math.ceil(daily_list.length/allPageData)
    var setPage = null;
    for(var i = 0; i<page;i++){ 
      createHead(i, page);
      createTable(i,page);
      if(i == page-1){
        createFooter();
      }else{
        createFooterblank();
      }  
      var dataContent = [pdfHead,pdfTable,pdfFooter]
        
      if(setPage === null){
        setPage = dataContent;
      }
      else{
        setPage = [setPage,dataContent];
      } 
      //alert(JSON.stringify(setPage))
    }
    
    var docDefinition = {
      
      content: [
        setPage
      ],
      pageSize: 'A4',
      pageMargins: [10,10,10,10],
      pageOrientation: 'landscape',
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
            fontSize: 9,
            bold: true,
            margin: [0, 0, 0, 15],
            alignment: 'left'
        },
        subheader: {       
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 15],
          alignment: 'center'
        },
        detailheader: {       
          fontSize: 9,
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
        detailleftheader: {       
          fontSize: 10,
          bold: false,
          margin: [20, 0, -20, 15],
          alignment: 'left'
        },
        detailrightheader: {       
          fontSize: 9,
          bold: false,
          margin: [50, 0, 0, 15],
          alignment: 'left'
        },
        footerdetail: {       
          fontSize: 9,
          bold: false,
          margin: [30, 5, 0, 10],
          alignment: 'left'
        },
        footerdetail2: {       
          fontSize: 9,
          bold: false,
          margin: [60, 5, 0, 10],
          alignment: 'left'
        },
        footer: {
            fontSize: 9,
            margin: [0, 20, 0, 25],
            alignment: 'right'
        }
      }
    };

      pdfMake.createPdf(docDefinition).open()
    }
    return (
     
          <a onClick={getData}><i style={{color: "salmon"}} title="PRINT ABSEND HISTORY" class="fa fa-file fa-2x "></i> PRINT</a>
     
    ) 
  }

export default Print_Absend_History;