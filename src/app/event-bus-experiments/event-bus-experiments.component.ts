import { Component, OnInit } from '@angular/core';
import { initializeLessonsList } from './event-bus';
import { testLessons } from '../shared/model/test-lessons';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  // EventBusExperimentsComponent ----------- c'est le top level component 
  constructor() { }

  ngOnInit() {
    console.log('EventBusExperimentsComponent onInit()  broadcasted all lessons ')
    // initialiser la liste des lessons qui sera envoye a chaque observer qui est enregistré
    initializeLessonsList(testLessons.slice(0));
    
    //simulation d' un appel ascyncrone 
    setTimeout(()=>{      
      const newLesson  = {
        id:Math.random(),
        description:'My lesson from a Rest service !'
      };
      //todo
    },5000)
  }

  addLesson(lessonText: string ){
    // toDO
  }

}
