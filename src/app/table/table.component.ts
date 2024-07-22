import { Component, ElementRef, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
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
import { Carrera } from '../model/carrera';
import * as Papa from 'papaparse';
import { ToastrService } from 'ngx-toastr';
import { Curso } from '../model/curso';
import { Tema } from '../model/tema';


declare var bootstrap: any;


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
  styleUrls: ['./table.component.css' , './SideBar.css' ,   '/src/styles.css']
})
export class TableComponent {

  constructor(
    private libroService: LibroService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}



  googleDrivePreviewUrl = 'https://drive.google.com/file/d/1b32v_DWJn6CMLaSujw_jsUSfP5yf8OZD/preview';
  UrlPased : any;

  srcImg = "assets/image/libroAbierto-Img-removebg-preview.png";
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


  carreras:Carrera[] = [] ;
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
  @ViewChild('itemListTittle') itemListTittle !: ElementRef;
  @ViewChild('itemListContent') itemListContent !: ElementRef;
  @ViewChild('NabvarAside') NabvarAside !: ElementRef;
  @ViewChildren('NabvarAsideElement') NabvarAsideElements !:QueryList<ElementRef>;

  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;



    var collapsibleElements = document.querySelectorAll('[data-bs-toggle="collapse"]');
    collapsibleElements.forEach((element) => {
      new bootstrap.Collapse(element , {
        toggle:false
      });
    });
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit(){

    this.libroService.getLibros().subscribe(
      async response =>{
        const parseData = await this.parseDataV2(response);
        
        //this.data = parseData.data;
        this.dataSource = new MatTableDataSource<Libro>(this.data);

        this.dataSource.paginator = this.paginator;

        if(this.data && this.data.length > 0){
          this.actualizarPdfView(this.data[0].ID);
        }
      
        this.getCarreras_cursos();
        //this.headers = parseData.headers;
        //console.log(this.data[0]);


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

  //private  parseData(csvData: string): {headers: string[] , data: any[]} {
  private  async parseData(csvData: string):Promise<{headers: string[] , data: any[]}> {
    try {
  
    
          var  resultado  = await this.parseDataV2(csvData);
          const lines = resultado.split('\n');
          const headers = lines[0].split(',');
      
            const data = lines.slice(1).map(line =>{
              const values = line.split(',');
              var separaciones  = values.length; //tien que tener 10 separaciones
                const obj:any = {};
                headers.forEach((header , index) =>{
                  obj[header] = values[index];
                })
                return obj;
              
            });
            
      
      return {headers , data};
          

    } catch (error) {
      console.log(error);
      return {headers: [] , data: []};
    }



  }

  private async  parseDataV2(csvData: string):Promise<string> {
    const promesaSCV: Promise<string> = new  Promise<string>((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (result: any) => {
          //console.log( result);
          const parsedData = JSON.stringify(result.data);
          this.data = result.data;
          //console.log("parse data" +parsedData);
          resolve(parsedData);
        },
        error: (error: any) => {
          console.log(error);
          reject(error);
        }
      });
    });
    try {
      let resultadoString = await promesaSCV; 

      return resultadoString;
    } catch (error) {
      throw error;
    }

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



  public getCarreras_cursos():void {
    let carreras:Carrera[] = [] ;

    this.data.forEach((element) => {
      var folderSeparado = element.Folder.split('/');
      var carrera: Carrera  = {
        descripcion: '',
        cursos: []
      } ; 
      var curso: Curso = {
        nombre: '',
        temas: []
      };

      var tema = {
        nombre: ''
      };

      var cursosFiltered:Curso[];
      var temasFiltered:Tema[];

      var carreraFromData = folderSeparado[0];// carrera
      var cursoFromData = folderSeparado[1];// curso
      var temaFromData = folderSeparado[2];// tema

      if (carreras.length > 0){
        var ultimaCarrera = carreras[carreras.length - 1].descripcion;
        var carerrasfiltradas = carreras.filter(element => element.descripcion == carreraFromData);

        cursosFiltered = carreras[carreras.length - 1].cursos;

        var cursosFiltradosV2 = cursosFiltered.filter(element => element.nombre == cursoFromData); 
        //var cursosFiltrados = carreras.filter(element => element.descripcion == carreraFromData && element.cursos.filter(element2 => element2.nombre == cursoFromData).length > 0);
        
        if(ultimaCarrera != carreraFromData && carerrasfiltradas.length == 0){
          carrera.descripcion = carreraFromData;
          curso.nombre = cursoFromData;
          carrera.cursos.push(curso); 
          carreras.push(carrera);
        };

        if(  cursosFiltradosV2.length == 0  ){
          curso.nombre = cursoFromData;
          carreras[carreras.length - 1 ].cursos.push(curso);

  
        };


        if(cursosFiltradosV2.length > 0){
          temasFiltered = cursosFiltradosV2[cursosFiltradosV2.length-1].temas;

          //var temaFiltrados  = carreras.filter(element=> element.descripcion == carreraFromData && element.cursos.filter(element => element.nombre == cursoFromData && curso.temas?.filter(element => element.nombre == temaFromData).length > 0).length > 0);
          var temasFiltradosV2 = temasFiltered.filter(element => element.nombre == temaFromData);

          if( cursosFiltradosV2.length == 1 && temasFiltradosV2.length == 0){
            tema.nombre = temaFromData;

            if(temaFromData){
              cursosFiltradosV2[0].temas.push(tema);

            }
           
          };
        }
        
      };
      if(carreras.length == 0){
        carrera.descripcion = folderSeparado[0];// carrera

        curso.nombre = cursoFromData;

        tema.nombre = temaFromData;
        if(temaFromData){
          curso.temas.push(tema);// tema  
        }
        carrera.cursos.push(curso);// curso
  
        carreras.push(carrera);
      };


    });
    console.log("carreras :");
    console.log(carreras);
    this.carreras = carreras;
  }

  public filtrar(textoFiltrar:string){
    this.dataSource.filter = textoFiltrar.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();

      this.toastr.info(`Se han filtrado los datos ${textoFiltrar}`, 'Filtrado');
    };
  }
  
  btnCollapseClick(event:any){
    this.NabvarAsideElements.forEach((element) => {
      var btnNabvarAside = element.nativeElement as HTMLElement;
      var navbarAside = this.NabvarAside.nativeElement as HTMLElement; 

      if(btnNabvarAside.classList.contains('animate-appear')){
        //btnNabvarAside.classList.remove('d-none');
        btnNabvarAside.classList.remove('animate-appear');
        btnNabvarAside.classList.add('animate-disappear');

        if(navbarAside.classList.contains('navbar-aside')){
          //setTimeout(() => {
            //navbarAside.classList.add('navbar-aside-disappearing');
            navbarAside.classList.add('navbar-aside-small');
            navbarAside.classList.remove('navbar-aside');
          //}, 800);
          
        };
      }else{
        //btnNabvarAside.classList.add('d-none');
        btnNabvarAside.classList.add('animate-appear');
        navbarAside.classList.remove('navbar-aside-small');
        navbarAside.classList.add('navbar-aside');
      }
    });



  }
}
