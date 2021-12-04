import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('newBlockElement', [
      transition('* => forward', [
        query(':enter', [
          style({ opacity: 0, borderColor: 'red', transform: 'translateX(100%)' }),
          animate('500ms', style({ opacity: 1, borderColor: 'black', transform: 'translateX(0)' }))
        ], { optional: true }),
        query(':leave', [
          animate('500ms', style({ opacity: 0, borderColor: 'red', transform: 'translateX(-100%)', position: 'absolute' }))
        ], { optional: true })
      ]),
    ])
  ]
})
export class AppComponent {
  /**
   * We need to query the :enter/:leaving element
   * https://angular.io/guide/complex-animation-sequences#filter-animation-example
   * https://javascript.plainenglish.io/more-complex-angular-animations-47015a42a8d1
   */
  title = 'ng-animation';

  blocks = [1, 2, 3];
  direction: string = '';

  DIRECTION_FORWARD = 1;
  DIRECTION_BACKWARD = -1;

  update(direction: number) {
    // This is backwards
    if (direction < 0 && this.blocks[0] > 0) {
      this.blocks.pop();
      this.blocks.unshift(this.blocks[0] - 1);
      this.direction = 'backwards';
    }

    // This is forwards
    if (direction > 0) {
      this.blocks.shift();
      this.blocks.push(this.blocks[this.blocks.length - 1] + 1);
      this.direction = 'forward';
    }
  }

  onAnimation($event: AnimationEvent) {
    console.log(`event:`, $event)
    // Clear the direction when the animation finishes
    this.direction = '';
  }

}
