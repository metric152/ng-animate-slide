import { Component } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('newBlockElement', [
      transition(':enter', [
        style({ opacity: 0, borderColor: 'red', transform: 'translateX(100%)'}),
        animate('500ms', style({opacity: 1, borderColor: 'black', transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate('5000ms', style({opacity: 0, borderColor: 'red', transform: 'translateX(-100%)', position: 'releative'}))
      ])
    ])]
})
export class AppComponent {
  title = 'ng-animation';

  blocks = [1,2,3];

  update(direction: number) {
    if (direction < 0 && this.blocks[0] > 0) {
      this.blocks.pop();
      this.blocks.unshift(this.blocks[0] - 1);
    }

    if (direction > 0){
      this.blocks.shift();
      this.blocks.push(this.blocks[this.blocks.length - 1] + 1);
    }
  }

}
