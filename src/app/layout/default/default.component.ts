import { Component, OnInit } from '@angular/core';
import { NavService } from '@services/layout/nav.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  mobileQuery: MediaQueryList;
  public onSideNavChange: boolean;

  constructor(private navService: NavService) {

    this.navService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }

  ngOnInit(): void {
  }
}
