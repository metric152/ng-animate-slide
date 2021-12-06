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
      // Transition from any state to forward
      transition(`* => ${FORWARD}`, [
        // Run the leaving and entering animation at the same time
        group([
          query(':enter', [
            // Style the starting point
            style({ opacity: 0, borderColor: 'red', transform: 'translateX(100%) scale(0.5)' }),
            // Animation properties to their end value
            animate(TRANSITION_TIME, style({ opacity: 1, borderColor: '#3E6FB5', transform: 'translateX(0) scale(1)' }))
          ], { optional: true }),
          query(':leave', [
            style({ position: 'absolute', top: 0, left: 0, 'z-index': 1 }),
            animate(TRANSITION_TIME, style({ opacity: 0, borderColor: 'red', transform: 'translateX(-100%) scale(0.5)' }))
          ], { optional: true })
        ])
      ]),
      // Transition from any state to backwards
      transition(`* => ${BACKWARD}`, [
        group([
          query(':enter', [
            style({ opacity: 0, borderColor: 'red', transform: 'translateX(-100%) scale(0.5)' }),
            animate(TRANSITION_TIME, style({ opacity: 1, borderColor: '#3E6FB5', transform: 'translateX(0) scale(1)' }))
          ], { optional: true }),
          query(':leave', [
            style({ position: 'absolute', top: 0, right: 0, 'z-index': 1 }),
            animate(TRANSITION_TIME, style({ opacity: 0, borderColor: 'red', transform: 'translateX(100%) scale(0.5)' }))
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
   * https://indepth.dev/posts/1285/in-depth-guide-into-animations-in-angular
   */
  blocks = [1, 2, 3];
  direction: string = '';

  DIRECTION_FORWARD = 1;
  DIRECTION_BACKWARD = -1;

  update(direction: number) {
    switch(direction) {
      case this.DIRECTION_BACKWARD:
        this.blocks.pop();
        this.blocks.unshift(this.blocks[0] - 1);
        this.direction = BACKWARD;
        break;
      case this.DIRECTION_FORWARD:
        this.blocks.shift();
        this.blocks.push(this.blocks[this.blocks.length - 1] + 1);
        this.direction = FORWARD;
        break;
    }
  }

  onAnimation($event: AnimationEvent) {
    // Clear the direction when the animation finishes
    this.direction = '';
  }
}
