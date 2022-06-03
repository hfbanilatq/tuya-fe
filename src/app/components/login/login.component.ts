import { ToastrService } from 'ngx-toastr';
import { JwtService } from '@app/core/services/authentication/jwt.service';
import { LoginService } from '@app/core/services/authentication/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Login } from '@models/login';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { faEye, faEyeSlash, faQuestionCircle, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { DocumentTypeService } from '@src/app/core/services/document-type.service';
import { DocumentType } from '@src/app/models/document-type';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passHide = true;
  login: Login;
  roles: string[] = [];
  faUser = faUserAlt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faQuestionCircle = faQuestionCircle;

  documentTypes: DocumentType[];

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtDtoService: JwtService,
    private documentTypeService: DocumentTypeService,
    private toastrService: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        documentType: [null, [Validators.required]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
      }
    );
    this.documentTypeService.getDocumentTypes().subscribe(documentTypes => this.documentTypes = documentTypes);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.login = new Login(this.loginForm.value.documentType, this.loginForm.value.username, this.loginForm.value.password);

    this.loginService.login(this.login).subscribe(
      response => {

        this.jwtDtoService.setToken(response.token);

        this.toastrService.info(`Bienvenido: <strong> ${this.jwtDtoService.getUsername()} </strong> <br> Fecha: ${new Date()}`,
          'Inicio de sesión correcto', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true
        });
        if (this.loginService.redirectUrl) {
          this.router.navigate([this.loginService.redirectUrl]);
          this.loginService.redirectUrl = null;
        } else {
          this.router.navigate(['']).then(r => r);
        }
      }
    );
  }

}
