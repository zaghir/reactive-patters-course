import { Component, OnInit } from '@angular/core';
import { store, Observer } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer, OnInit {
 

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

}
