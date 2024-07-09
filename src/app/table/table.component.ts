import { Component, ViewChild } from '@angular/core';
import { LibroService } from '../service/libro.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Libro } from '../model/libro';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    HttpClientModule , 
    CommonModule,
   
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule

  ],
    
  providers: [LibroService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  constructor(
    private libroService: LibroService,
    private sanitizer: DomSanitizer,
  ) {}



  googleDrivePreviewUrl = 'https://drive.google.com/file/d/1b32v_DWJn6CMLaSujw_jsUSfP5yf8OZD/preview';
  UrlPased : any;

  headers:string[] = [
    // 'Folder',
    'Name',
    'Date Last Updated',
    'URL',
    // 'ID',
    // 'Description',
    // 'Type',
    // 'Autor',
    // 'Editorial',
    // 'Año'
  ];

  // headers:string[] = [
  //   // 'Folder',
  //   'Nombre',
  //   'Ultima Actualización',
  //   'URL',
  //   // 'ID',
  //   //'Descripcion',
  //   // 'Tipo',
  //   // 'Autor',
  //   // 'Editorial',
  //   // 'Año'
  // ];

  data: Libro[] = [];
  dataSource: MatTableDataSource<Libro> =[] as any as MatTableDataSource<Libro>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(){

    this.libroService.getLibros().subscribe(
      response =>{
        const parseData = this.parseData(response);
        this.data = parseData.data;
        this.dataSource = new MatTableDataSource<Libro>(this.data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //this.headers = parseData.headers;
       this.actualizarPdfView(this.data[0].ID);
      },
      error=>{
        console.log("Error al obtener los datos" + error);
      }
    )



  };


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    };
  }

  private parseData(csvData: string): {headers: string[] , data: any[]} {

    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

      const data = lines.slice(1).map(line =>{
        const values = line.split(',');
        const obj:any = {};
        headers.forEach((header , index) =>{
          obj[header] = values[index];
        })
        return obj;
      });
      return {headers , data};
  }

  private obtenerIdURL(url:string): string{
    let id = "";
    let urlSplit = url.split('/');

    id = urlSplit[urlSplit.length - 2];
    return id ;
  }

  public actualizarPdfView(id:string){
    let urlPdfView = this.generarLinkPdf(id);
    this.googleDrivePreviewUrl = urlPdfView;
    this.UrlPased = this.sanitizer.bypassSecurityTrustResourceUrl(this.googleDrivePreviewUrl);

  };

  private generarLinkPdf(id:string): string{
    return `https://drive.google.com/file/d/${id}/preview?usp=drivesdk`;
  }

}
