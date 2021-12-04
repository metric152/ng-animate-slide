import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, group, AnimationEvent } from '@angular/animations';

const BACKWARD = 'backward';
const FORWARD = 'forward';
const TRANSITION_TIME = '500ms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('newBlockElement', [
      transition(`* => ${FORWARD}`, [
        group([
          query(':enter', [
            style({ opacity: 0, borderColor: 'red', transform: 'translateX(100%)' }),
            animate(TRANSITION_TIME, style({ opacity: 1, borderColor: 'black', transform: 'translateX(0)' }))
          ], { optional: true }),
          query(':leave', [
            animate(TRANSITION_TIME, style({ opacity: 0, borderColor: 'red', transform: 'translateX(-100%)' }))
          ], { optional: true })
        ])
      ]),
      transition(`* => ${BACKWARD}`, [
        group([
          query(':enter', [
            style({ opacity: 0, borderColor: 'red', transform: 'translateX(-100%)' }),
            animate(TRANSITION_TIME, style({ opacity: 1, borderColor: 'black', transform: 'translateX(0)' }))
          ], { optional: true }),
          query(':leave', [
            animate(TRANSITION_TIME, style({ opacity: 0, borderColor: 'red', transform: 'translateX(100%)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  /**
   * We need to query the :enter/:leaving element
   * https://angular.io/guide/complex-animation-sequences#filter-animation-example
   * https://javascript.plainenglish.io/more-complex-angular-animations-47015a42a8d1
   */
  blocks = [1, 2, 3];
  direction: string = '';

  DIRECTION_FORWARD = 1;
  DIRECTION_BACKWARD = -1;

  update(direction: number) {
    // This is backwards
    if (direction < 0) {
      this.blocks.pop();
      this.blocks.unshift(this.blocks[0] - 1);
      this.direction = BACKWARD;
    }

    // This is forwards
    if (direction > 0) {
      this.blocks.shift();
      this.blocks.push(this.blocks[this.blocks.length - 1] + 1);
      this.direction = FORWARD;
    }
  }

  onAnimation($event: AnimationEvent) {
    // Clear the direction when the animation finishes
    this.direction = '';
  }
}
