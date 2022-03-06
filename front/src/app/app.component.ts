import { Component } from '@angular/core';
import { MessagesService } from './messages/messages.service';
import { LoadingSpinnerService } from './shared/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front';
}
