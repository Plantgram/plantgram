import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-mobile-toolbar',
  templateUrl: './mobile-toolbar.component.html',
  styleUrls: ['./mobile-toolbar.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileToolbarComponent {
  authUserId: any;
  constructor(private authService: AuthService) {
    this.authUserId = authService.currentUser?.id;
  }
  @Output() menuClicked: EventEmitter<void> = new EventEmitter<void>();
}
