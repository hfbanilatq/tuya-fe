import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { faQuestionCircle, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt, faSignOutAlt, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '@src/app/core/services/authentication/login.service';
import { NavService } from '@src/app/core/services/layout/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserCircle = faUserCircle;
  faCog = faCog;
  faBars = faBars;
  @Input() sidenav: MatSidenav;
  isLoggedIn = false;
  isAdmin = false;

  constructor(public navService: NavService,
              public authService: LoginService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
