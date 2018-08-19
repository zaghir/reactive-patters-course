import { Component, OnInit } from '@angular/core';
import { store, Observer} from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer {

  lessonsCounter: number = 0;
  constructor() {
    console.log('LessonsCounterComponent is regestred as observer...');
    store.lessonListObservable.subscribe(this);
   }

  next(data: Lesson[]){
    this.lessonsCounter = data.length ;
  }

}
