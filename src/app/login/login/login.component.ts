import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ExaService } from 'src/app/services/exa.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  form;
  constructor(private loginrouter: Router, private examservice: ExaService) {

  }

  iniciarsesion() {

    this.examservice.singIn(this.usuario).subscribe(token => {

      this.examservice.getAllUsuario().subscribe(usuariosdata=>{
        
        console.log("LA CTMREEEEE");
        for (let i = 0; i < usuariosdata.length; i++) {
          if (usuariosdata[i].username == token.username && usuariosdata[i].password ==token.password) {
            localStorage.setItem('idusuario', usuariosdata[i].idusuario.toString())
          }
        }
      })

      this.examservice.saveToken(token.token)
      this.loginrouter.navigateByUrl('principal');
      Swal.fire({
        icon: 'success',
        title: 'BIENVENIDO.',
        // text: 'Estado de solicitud',
      });
     

    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'USUARIO O CONTRASEÑA INCORRECTO.',
        // text: 'Estado de solicitud',
      });
      
    })
    

  }

  ngOnInit(): void {
  }
}
