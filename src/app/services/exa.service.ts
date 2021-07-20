import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Archivo } from '../models/archivos';
import { Correo } from '../models/correo';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ExaService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'Authorization'});
  tokensito:string;
  constructor(private metodohttp:HttpClient, private storage: AngularFireStorage) {

  }
  ruta1='http://localhost:2323/Exa/archivo'

  //CREAR ARCHIVOS EN FIREBASE
  crearArchivo(archivo:Archivo):Observable<Archivo>{
    return this.metodohttp.post<Archivo>(this.ruta1 + '/' , archivo);
  }
  getOneArchivo(id:string):Observable<Archivo[]>{
    return this.metodohttp.get<Archivo[]>(this.ruta1 + '/' + id);
  }
  deleteArchivo(id:number):Observable<Archivo[]>{
    return this.metodohttp.delete<Archivo[]>(this.ruta1 + '/' + id);
  }


  //GUARDAR Y MOSTRAR IMAGENES DESDE EL FIREBASE
  saveFile(archivo:File, nombre:string){
    const fileLocation = this.storage.ref(nombre)
    const sendFile = this.storage.upload(nombre, archivo);
  }
  showFileFirebase(nombre:string):Observable<string>{
  
    const ref = this.storage.ref(nombre)
    console.log(nombre)
    return ref.getDownloadURL();
  }


  //USUARIO
  ruta2 = 'http://localhost:2323/Exa/usuario'
  getAllUsuario():Observable<Usuario[]>{
    return this.metodohttp.get<Usuario[]>(this.ruta2 + '/');
  }
  getOneUsuario(id:number):Observable<Usuario[]>{
    return this.metodohttp.get<Usuario[]>(this.ruta2 + '/' + id);
  }
  singIn(user:Usuario):Observable<any>{
    // const httpHeaders_ = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic bW92aWxpZGFkOjEyMzQ1Njc='});
    return this.metodohttp.post<any>(this.ruta2 + '/signIn',user);
  }

  //TOKEN
  saveToken(token:string){
    this.tokensito = token
    sessionStorage.setItem('Token',token);
  }

  //VERIFICAR SI EL USUARIO ESTÁ LOGUEADO
  isAuthenticated(){
    if (sessionStorage.getItem('Token')) {
      return true;
    }else{
      return false;
    }
  }



  //CORREO ELECTRONICO
  ruta3 = 'http://localhost:2323/Exa/correo'

  createEmail(correo: Correo):Observable<Correo>{
    return this.metodohttp.post<Correo>(this.ruta3 + '/',correo)
  }

}
