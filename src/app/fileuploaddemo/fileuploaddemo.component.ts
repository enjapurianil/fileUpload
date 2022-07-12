import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExcelService } from '../services/excel-service.service';
import { NgxCaptureService } from 'ngx-capture';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
class file {
  id!: number;
  files!: any;
}
@Component({
  selector: 'app-fileuploaddemo',
  templateUrl: './fileuploaddemo.component.html',
  styleUrls: ['./fileuploaddemo.component.css']
})
export class FileuploaddemoComponent implements OnInit {
  //EXCEL Sheet//
  // npm install xlsx --save
  //   npm install filesaver --save 
  name = 'Angular 6';
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }
  // END EXCEL//
  // ScreenShot //
  // USE : npm install ngx-capture //
  imageView!: any;
  @ViewChild('screen', { static: true }) screen: any;
  capture() {
    this.captureService.getImage(this.screen.nativeElement, true).subscribe((img: any) => {
      this.imageView = img
      console.log(img)
    })

  }
  //End ScreenShot //
  //pdf export //

  //USE : npm install jspdf  //

  // Data = [  
  //   { Id: 101, Name: 'Nitin', Salary: 1234 },  
  //   { Id: 102, Name: 'Sonu', Salary: 1234 },  
  //   { Id: 103, Name: 'Mohit', Salary: 1234 },  
  //   { Id: 104, Name: 'Rahul', Salary: 1234 },  
  //   { Id: 105, Name: 'Kunal', Salary: 1234 }  
  // ];  

  // @ViewChild('content') content : any;  
  // public SavePDF(): void {  
  //   let content=this.content.nativeElement;  
  //   let doc = new jsPDF();  
  //   let _elementHandlers =  
  //   {  
  //     '#editor':function(element:any,renderer:any){  
  //       return true;  
  //     }  
  //   };  
  //   doc.fromHTML(content.innerHTML,15,15,{  
  //     'width':190,  
  //     'elementHandlers':_elementHandlers  
  //   });  

  //   doc.save('test.pdf');  
  // }  
  @ViewChild('htmlData') htmlData!: ElementRef;
  USERS = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      phone: '1-463-123-4447',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne@kory.org',
      phone: '493-170-9623 x156',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio@annie.ca',
      phone: '(254)954-1289',
    },
    {
      id: 6,
      name: 'Mrs. Dennis',
      email: 'karley@jasper.info',
      phone: '1-477-935-8478 x6430',
    },
  ];
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas: any) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
  //end export //
  //File Upload //
  isImageEnable: boolean = false;
  fileupload: file = new file();
  files: file[] = [];
  constructor(private http: HttpClient, private excelService: ExcelService, private captureService: NgxCaptureService) { }
  url: any;
  urllist: file[] = [];
  ngOnInit(): void {
    this.get();
  }
  saveImage(event: any) {
    debugger
    // console.log(event)
   // console.log(event.target.files)
    if (event.target.files) {
      for (let index = 0; index < event.target.files.length; index++) {
        if (event.target.files[index].size <= 40960) {
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[index]);
          reader.onloadend = (events) => {
            this.fileupload = new file();
            this.fileupload.files = events.target?.result;
            this.urllist.push(this.fileupload)
            console.log(this.fileupload)
          }
        }
        else{
          alert("size is too large")
        }
      }
    }
    this.isImageEnable = true;

  }
  save() {
    this.files = this.urllist;
    this.http.post("https://localhost:44388/api/SaveFiles", this.files).subscribe((data: any) => {
      alert(data);
      this.urllist = [];
      this.get();
    })
  }
  get() {
    this.http.get("https://localhost:44388/api/getFiles",).subscribe((data: any) => {
      this.files = data

    })
  }
}
  // end fileUpload

