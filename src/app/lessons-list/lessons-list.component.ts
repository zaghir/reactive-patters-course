import { Component, OnInit } from '@angular/core';
import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from '../event-bus-experiments/event-bus';
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
     globalEventBus.resisterObserver(ADD_NEW_LESSON , {
       notify : lessonText =>{
         this.lessons.push({
           id:Math.random(),
           description: lessonText
         });
       }
     });

   }

  notify(data :Lesson[]){
    console.log('lessonsListComponent ==> notify() received data ', data);
    // on utilise data.slice(0)  pour recupere une copie de table apres la notification 
    // si on set lessons par date , lessons aurra une reference directe sur le tableau
    // chaque modifications dans un observer va impacter les données d'autres observer pour le meme listner 
     this.lessons = data.slice(0);
  }

  toggleLessonView(lesson: Lesson){
    console.log('toggleLessonView ...' , lesson);
    lesson.completed = !lesson.completed;
  }

  delete(lesson: Lesson){
    const index = this.lessons.indexOf(lesson);
    this.lessons.splice(index,1);
  }

  ngOnInit() {
   
  }
  

}
