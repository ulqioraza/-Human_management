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

function Print_Examination(props) {

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

        fetch(window.server + '/examination_by_id' , postDlist)
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
    daily_list = data.examination_member
    fetch(window.server + '/get_user/' , postUser)
        .then(res => res.json())
        .then(result => getUser(result.user[0]))
        .catch(err => alert(err))
    
  }

  function getUser(data){
    
    user = 'username'
    createPDF()
  }

  function createHead(i,page){
    if(props.value.place === undefined){
      var place = ''
    }else{
      place = props.value.place
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
          { text: 'บันทึกผลการตรวจสารเสพติด', style: 'secondheader' },
          { text: '', style: 'header' }
        ]
      },
      {
        columns:[
          { text: '\n\nประเภทของสารเสพติด : ' + props.value.examination_group + 
          
          '\n\n\n\n\nหัวข้อ : ' + props.value.examination_title +  
            '\n\nวันที่ตรวจ : ' + Moment(props.value.examination_date).format('DD-MM-yyyy') +
            '\n\nผู้ตรวจ : ' + props.value.inspector, style: 'detailleftheader'} , 
            { text:'\n\nสถานที่ : ' + place, style: 'detailrightheader'}
        ]
      },
    ]
  }

  function createFooter(){
    pdfFooter = [
      {
        columns:[
          { text: '\n ', style: 'footerdetail2' } , 
        ]
      },
      {
        columns:[
          { text: ' ', style: 'footerdetail' } , 
          { text: 'ผู้ประเมินการตรจ:________________________________', style: 'footerdetail2' },
        ]
      },
      {
        columns:[
          { text: '', style: 'footerdetail2' } , 
          { text: 'วันที่:___________________________________', style: 'footerdetail' },
        ]
      },
      {
        columns:[
          { text: '' + '\n' + ' ', style: 'footer' },
        ]
      }
    ]
  }

  function createFooterblank(){
    pdfFooter = [
      {
        columns:[
            { text: '\n ', style: 'footerdetail2' } , 
            { text: '\n ', style: 'footerdetail2' },
        ]
      },
      {
        columns:[
            { text: ' ', style: 'footerdetail' } , 
            { text: ' ', style: 'footerdetail' },
        ]
      },
      {
        columns:[
            { text: ' ', style: 'footerdetail2' } , 
            { text: ' ', style: 'footerdetail2' },
        ]
      },
      {
          columns:[
              { text: ''  + '\n' + ' ', style: 'footer' },
          ]
          
          }
    ]
  }


  function Toptable(j,page){
    var column = [];

      column.push('ลำดับที่');
      column.push('ชื่อ-สกุล');
      column.push('ตำแหน่ง');
      column.push('ลงชื่อ(ตัวบรรจง)');
      column.push('ผ่าน');
      column.push('ไม่ผ่าน');
      column.push('หมายเหตุ'); 

      bodyData[headerTable] = column;

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

      }else{
       /* if(page > 0){
          dataRow.push(i+(num+1));
        }else{
          dataRow.push(i+1);
        }*/
        if(sourceData[i].last_name === null){
          var l_name = ' '
        }else{
          l_name = sourceData[i].last_name
        }
        dataRow.push(i+(num+1));
        dataRow.push(sourceData[i].name + ' ' + l_name);
        dataRow.push(sourceData[i].department);
        dataRow.push('');
        if(sourceData[i].results === true){
          dataRow.push('√');
          dataRow.push('');
        }else if(sourceData[i].results === false){
          dataRow.push('');
          dataRow.push('x');
        }else{
          dataRow.push('');
          dataRow.push('');
        }
        dataRow.push(sourceData[i].remark);
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
        { text: item[4], alignment : 'center'},
        item[5],
        {text: item[6], alignment: 'left', noWrap: true}
      ]
    })
    
    pdfTable = [    
      {
        style: 'topTable',
        table: {
          widths: ['7%','24%','15%','22%', '6%','8%','17%'],
          heights: [1,1,1,1,1,1,1],
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
    pageDataLast = 20
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
          margin: [-5, 5, 0, 15],
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
          margin: [20, -15, -20, 15],
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
          margin: [45, 5, 0, 10],
          alignment: 'left'
        },
        footerdetail2: {       
          fontSize: 10,
          bold: false,
          margin: [10, 0, 0, 10],
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

export default Print_Examination;