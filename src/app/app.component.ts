import { Component , computed, effect, inject, OnInit, signal} from '@angular/core';
import {filter, interval, map} from 'rxjs';

import { DestroyRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  destroyRef = inject(DestroyRef);

  clickCount = signal<number>(0)

  // You can created an observable based on signal
  clickCount$ = toObservable(this.clickCount)


  // Converting observable into signal
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue : 0});

  constructor() {
    // Define an effect to log the current count whenever it changes

    // This is similar to subscribing an observable
    // effect(() => {
    //   console.log('The current count is: ' + this.intervalSignal()); // The effect re-runs when count() changes
    // });
  }


  // constructor() {
  //   // It will make the original signal var into an observable
  //   toObservable(this.clickCount);


  //   // And you can still use all the methods of signal into it and also methods of Observable

  //   effect(() => {
  //     console.log('The current count is: ' + this.clickCount()); // The effect re-runs when count() changes
  //   });
  // }


  ngOnInit(){
    // const subscription = interval(1000).pipe(
    //   map((val)=>val * 2),
    //   filter((val)=> val % 2 === 0)
    // )
    // .subscribe({
    //   next : (val)=> console.log(val)
    // });

    // this.destroyRef.onDestroy(()=>{
    //   console.log("Destroyed");
    //   subscription.unsubscribe();
    // })


    // const subscribe = this.clickCount$.subscribe({
    //   next : (val)=> console.log("The current count is : " + val)
    // });

    // this.destroyRef.onDestroy(()=>{
    //   console.log("Destroyed");
    //   subscribe.unsubscribe();
    // })
  }

  onClick(){
     this.clickCount.update((count)=> count + 1);
  }

}
