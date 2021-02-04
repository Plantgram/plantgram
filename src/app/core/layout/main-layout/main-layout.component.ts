import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.styl'],
})
export class MainLayoutComponent implements OnDestroy {
  userSubscription: Subscription;
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.userSubscription = authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  onLogout() {
    this.authService.signOut();
  }

  onProfile() {
    this.router.navigate(['/user', this.user?.id]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
