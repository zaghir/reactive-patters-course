import { Component, OnInit } from '@angular/core';
import { store} from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import { Observer } from 'rxjs';


@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer<Lesson[]>, OnInit {

  lessonsCounter: number = 0;
  // la modification dans notre observable et la factorisation permet de ne plus prendre la tete
  // avec les temps de creation de l observable et le moment ou l' observer se connecte à lui
  // des que l'observer s inscrit à l'observable il recoit les notifications 
  // on peut se s'inscrire à l'observable dans le la methode OnInit() , à l initialisation de component 
  // constructor() {
  //   console.log('LessonsCounterComponent is regestred as observer...');
  //   store.lessonListObservable.subscribe(this);
  // }
  ngOnInit(): void {
    console.log('LessonsCounterComponent is regestred as observer...');
    store.lessonListObservable.subscribe(this);
  }

  next(data: Lesson[]){
    this.lessonsCounter = data.length ;
    console.log("lessons-counters next ==>", this.lessonsCounter);
  }
  
  error(error){
    console.log("lesson counter error ", error);
  }
  
  complete(){
    console.log("lesson counter complet ");
  }

}
