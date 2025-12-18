import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { filter, interval, map, Observable, Subscriber } from 'rxjs';

import { DestroyRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  clickCount = signal<number>(0);

  // Craeting my own Observable
  interval$ = new Observable((subscribe) => {
    let value = 0;

    const temp = setInterval(() => {

      if(value === 5){
        clearInterval(temp);
        subscribe.complete();
        return;
      }

      subscribe.next( value );
      value += 1;
    }, 1000);
  });

  constructor() {
    effect(() => {
      console.log('The current count is: ' + this.clickCount()); // The effect re-runs when count() changes
    });
  }

  ngOnInit() {
    const subscription = this.interval$.subscribe({
      next: (val) => console.log('Value from my custom observable : ' + val),
      complete : ()=> console.log("Completed !!!")
    });
  }

  onClick() {
    this.clickCount.update((count) => count + 1);
  }
}
