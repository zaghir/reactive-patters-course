import { Component, OnInit } from '@angular/core';
import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit , Observer {

  lessons: Lesson[] = [];

  constructor() {
     // on transforme notre class a un observer avec l'implementation de Oserver et le redefinition de la methode notify
     console.log('lessonsListComponent ==> onInit observer is registered as an observer...');
     // ecouter l'evenement LESSONS_LIST_AVAILABLE
     globalEventBus.resisterObserver(LESSONS_LIST_AVAILABLE,this);
     // on peut avoir un problème de synco, du au observable => globalEventBus est initialisé dans le ngInit
     // qu' au la page est créé et fini ,on met le code dans le constructeur on s'enregistre et on attend les notifications 
   }

  notify(data :Lesson[]){
    console.log('lessonsListComponent ==> notify() received data ', data);
     this.lessons = data;
  }

  ngOnInit() {
   
  }
  

}
