import { Component, OnInit } from '@angular/core';
import { store } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import { Observer } from 'rxjs';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {
 

  lessons: Lesson[] = [];


   ngOnInit(): void {
     // par rapport à l encienne methode on peut s'inscrire dans la methode ngOnInit sans passer par le construtor
     // car au debut on avait le probleme de scyncronisation on s'inscrit avant de finir la contrcution dans la page
     // et on perd les notifications de l'observable
     // Donc subscribe se fait soit dans le ngOnInit ou dans le constructor 
     console.log('lessonsListComponent ==> onInit observer is registered as an observer...');
     store.lessonListObservable.subscribe(this);  
      // cette nouvelle aproche permert d'etre notifier pas l'observable avec la methode next 
     // les observables partage la meme source de données ici le table data en parametre  
  }


  next(data :Lesson[]){
    console.log('lessonsListComponent ==> notify() received data ', data);
    // on utilise data.slice(0)  pour recupere une copie de table apres la notification 
    // si on set lessons par date , lessons aurra une reference directe sur le tableau
    // chaque modifications dans un observer va impacter les données d'autres observer pour le meme listner 
    // on recupere dans notre cas une copie de data pas besoin de faire un slice 
    console.log("lessons-list => next --> data" , data)
     this.lessons = data;
  }

  error(error){
    console.log("browser event error ", error);
  }

  complete(){
    console.log("browser event complet ");
  }

  toggleLessonView(lesson: Lesson){
    store.toggleLessonView(lesson);    
  }

  delete(lesson: Lesson){
    store.deleteLesson(lesson);
  }

}
