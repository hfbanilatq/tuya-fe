import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
    // With this subject you can save the sidenav option and consumed later into other modules.
    public sideNavState$: Subject<boolean> = new Subject();

    constructor() { }

}
