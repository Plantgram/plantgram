import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.styl'],
})
export class MainLayoutComponent implements OnInit {
  user$;

  constructor(private authService: AuthService) {
    this.user$ = authService.currentUser$;
  }

  onLogout() {
    this.authService.signOut();
  }

  ngOnInit(): void {}
}
