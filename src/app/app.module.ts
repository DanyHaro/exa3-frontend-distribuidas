import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//FIREBASE IMPORTS
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

//COMPONENTS
import { LoginComponent } from './login/login/login.component';
import { PrincipalComponent } from './principal/principal/principal.component';

//GUARD
import { AuthGuard } from './guards/auth.guard';
import { DocumentosComponent } from './principal/documentos/documentos.component';
import { MensajeComponent } from './principal/mensaje/mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    DocumentosComponent,
    MensajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    //FIREBASE
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgxDocViewerModule
  ],
  providers: [
    // {provide: BUCKET,useValue:'gs://exam3-24564.appspot.com'}
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
