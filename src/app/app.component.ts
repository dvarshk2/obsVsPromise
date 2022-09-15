import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
 
   title = 'obsVsPromise';
  mySubscription! : Subscription;
  ngOnInit(): void {
   let  promise = new Promise((resolve, reject) => {
    console.log('Promise is created, not consumed yet');
    setTimeout(() => {
      resolve('Promise is emitting data 1st time');
    }, 1000);
    setTimeout(() => {
      resolve('Promise is emitting data 2nd time')
    }, 2000);
    setTimeout(() => {
      resolve('Promise is emitting data 3rd time')
    }, 3000);
   })


   let obs = new Observable(observer => {
    console.log('Observable is created, not subscribed yet');
    setTimeout(() => {
      observer.next('Observable is emitting data 1st time')
    }, 1000);
    setTimeout(() => {
      observer.next('Observable is emitting data 2nd time')
    }, 2000);
    setTimeout(() => {
      observer.next('Observable is emitting data 3rd time')
    }, 3000);
   })

   promise.then(console.log);

   obs.subscribe(console.log);

   this.mySubscription = obs.pipe(
    filter(data => data == 'Observable is emitting data 2nd time'),
    map(data => `${data} and I Love Angular`)
   )
   .subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
