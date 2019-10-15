import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiConfig } from './login/firebaseui.config';

const firebaseUiAuthConfig: firebaseui.auth.Config = firebaseUiConfig;

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatButtonModule,
    FirebaseUIModule.forFeature(firebaseUiAuthConfig)
  ]
})
export class AuthModule { }
