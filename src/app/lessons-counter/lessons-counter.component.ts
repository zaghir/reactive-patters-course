import { Component, OnInit } from '@angular/core';
import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements OnInit , Observer {

  lessonsCounter: number = 0;
  constructor() {
    console.log('LessonsCounterComponent is regestred as observer...');
    globalEventBus.resisterObserver(LESSONS_LIST_AVAILABLE, this);

    globalEventBus.resisterObserver(ADD_NEW_LESSON, {notify:lessonText => this.lessonsCounter +=1});
   }

  ngOnInit() {
  }

  notify(data: Lesson[]){
    this.lessonsCounter = data.length ;
  }

}
