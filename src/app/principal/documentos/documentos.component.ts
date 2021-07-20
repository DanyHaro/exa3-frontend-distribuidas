import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Archivo } from 'src/app/models/archivos';
import { ExaService } from 'src/app/services/exa.service';
import Swal from 'sweetalert2';

// const fs = require('fs');


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  archivo:File
  archivoObjeto:Archivo = new Archivo();
  archivoArray=[]
  rutaFile
  etiqueta=false
  form;
  archivomostrar;

  constructor(fb:FormBuilder, private exaservice:ExaService, private storage: AngularFireStorage) {
    this.form = fb.group({
      nombre: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.exaservice.getOneArchivo(localStorage.getItem('idusuario')).subscribe(archivoData=>{
      console.log(archivoData,"ARCHIVOS DEL USUARIO");
      this.archivoArray = archivoData;
    })
  }
  showFile(evento){
    console.log("ARCHIVO : ",evento.target.files[0]);
    this.archivo = evento.target.files[0]
  }

  SendFile(){
    const id = Math.random().toString(20).substring(3);
    const filePath = `uploads/file_${id + this.archivo.name}`
    var extension = (filePath.substring(filePath.lastIndexOf("."))).toLowerCase();    
    this.archivoObjeto.url = filePath;
    this.archivoObjeto.tipo = extension;
    this.archivoObjeto.nombre = this.form.value.nombre;
    let idusuario;
    idusuario = Number(localStorage.getItem('idusuario'));
    this.archivoObjeto.idusuario = idusuario;
    this.exaservice.crearArchivo(this.archivoObjeto).subscribe(datacreada=>{
      this.exaservice.saveFile(this.archivo,filePath);
      alert("GUARDADO CON EXITO !");
      this.ngOnInit();
    })

  }

  mostrarFile(url:string){
    console.log(url);
    
    this.exaservice.showFileFirebase(url).subscribe(data=>{
      
      console.log(data);
      if (data) {
        this.archivomostrar = data
        this.etiqueta = true;
        console.log("VALIDO !");
      }else{
        alert("No se encontró imagen")
      }
    })
  }

  eliminarArchivo(doc:Archivo){
    console.log(doc.idarchivo,"ALA MRD ALTOKE");
    
    this.exaservice.deleteArchivo(doc.idarchivo).subscribe(doc=>{
      Swal.fire({
        icon: 'success',
        title: 'ARCHIVO ELIMINADO !',
        // text: 'Estado de solicitud',
      });
    })
  }

}
