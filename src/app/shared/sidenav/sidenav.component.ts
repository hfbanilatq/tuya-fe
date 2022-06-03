import { Component, OnInit } from '@angular/core';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faAddressBook, faHandshake, faCalendarAlt, faFileExcel, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faArrowRight, faHome, faUsers, faUserTie, faCartPlus, faDonate, faSitemap, faChalkboardTeacher, faWalking, faBookReader, faHistory, faListOl } from '@fortawesome/free-solid-svg-icons';
import { onSideNavChange } from '@src/app/animations/nav.animation';
import { NavService } from '@src/app/core/services/layout/nav.service';
import { NavItem } from '@src/app/models/nav-item';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [onSideNavChange]
})
export class SidenavComponent implements OnInit {

  public sideNavState = false;
  public linkText = false;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  public navItems: NavItem[] = [
    {name: 'Inicio', link: '', icon: faHome},
    {name: 'Simulador', link: 'simulator', icon: faCreditCard},
    {name: 'Simulaciones', link: 'history', icon: faListOl},
  ];

  constructor(private sidenavService: NavService) {
  }

  ngOnInit(): void {
  }

  onSidenavToggle(event: Event): void {
    this.sideNavState = !this.sideNavState;
    setTimeout(
      () => {
        this.linkText = this.sideNavState;
        window.dispatchEvent(new Event('resize')); 
        this.sidenavService.sideNavState$.next(this.sideNavState);
      }, 200);
   
  }

}
