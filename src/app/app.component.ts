import { Component } from '@angular/core';
import { GridComponent } from "./grid/grid.component";

@Component({
  selector: 'app-root',
  imports: [GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'emoji-memory-match';
}
