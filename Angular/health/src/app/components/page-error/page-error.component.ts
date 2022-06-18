import { Component, OnInit } from '@angular/core';
import { PageErrorService } from 'src/app/servicios/page-error.service';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent implements OnInit {

  constructor(private pagError: PageErrorService) { }

  gato: any
  frase: any
  cargando: boolean;
  ngOnInit(): void {
    this.cargando = false;
    this.coctel()
    this.frases()
    setTimeout(() => {
      this.cargando = true;
    }, 2000);

  }

  coctel(){
    this.pagError.buscarCoctel().subscribe(data=>{
      this.gato = data
      console.log(this.gato)
      console.log(data.title)
    })
  }
  frases(){
    console.log("dentro de frase")
    this.pagError.buscarFrase().subscribe(data=>{
      this.frase = data
      console.log("chuck", data)
      // console.log(data.title)
    })
  }
}
