import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Correo } from 'src/app/models/correo';
import { ExaService } from 'src/app/services/exa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  correoElect:Correo = new Correo();
  idusuarioLocal;
  form;
  constructor(fb:FormBuilder, private exaservice:ExaService) {
    //obteniendo idusuario del localstorage
    this.idusuarioLocal = Number(localStorage.getItem('idusuario'));

    //creando fecha
    this.correoElect.fecha = new Date();
    console.log(this.correoElect.fecha);

    this.form = fb.group({
      destinatario: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required]),
      fecha: new FormControl(this.correoElect.fecha),
      idusuario: new FormControl(this.idusuarioLocal),

    });
  }

  ngOnInit(): void {

  }

  enviarCorreo(){
    

    console.log("FORMULARIO :",this.form);
    if (this.form.valid) {
      this.correoElect = this.form.value;
      this.exaservice.createEmail(this.correoElect).subscribe(emails=>{
        Swal.fire({
          icon: 'success',
          title: 'CORREO ENVIADO !.',
          // text: 'Estado de solicitud',
        });

      })
          
    }else{
      Swal.fire({
        icon: 'error',
        title: ' CORREO NO VÁLIDO !.',
        // text: 'Estado de solicitud',
      });
    }
    
  }

}
