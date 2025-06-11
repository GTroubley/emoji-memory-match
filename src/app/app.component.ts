import { Component } from '@angular/core';
import { GridComponent } from "./grid/grid.component";
import { HeaderComponent } from "./header/header.component";
import { ScoreComponent } from "./score/score.component";
import { ReactionComponent } from "./reaction/reaction.component";

@Component({
  selector: 'app-root',
  imports: [GridComponent, HeaderComponent, ScoreComponent, ReactionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'emoji-memory-match';
}
