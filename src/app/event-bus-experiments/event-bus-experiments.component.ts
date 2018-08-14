import { Component, OnInit } from '@angular/core';
import { globalEventBus, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from './event-bus';
import { testLessons } from '../shared/model/test-lessons';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  lessons:Lesson[] = [];
  constructor() { }

  ngOnInit() {
    console.log('EventBusExperimentsComponent onInit()  broadcasted all lessons ')
    // au chargement de la page chaque observer sera notifié par la liste des lessons
    // notifier tous les observer qui ecoute l'evenement ==> LESSONS_LIST_AVAILABLE
    this.lessons = testLessons.slice(0);
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE ,this.lessons);

    //simulation d' un appel ascyncrone 
    setTimeout(()=>{
      this.lessons.push({
        id:Math.random(),
        description:'My lesson from a Rest service !'
      });
      // on va notifier tous les observer qui ecoute sur LESSONS_LIST_AVAILABLE
      globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE ,this.lessons);
      // si on continue a faire les tests chaque observer modifie le tableau des lessons dans son coin
      // apres 5s tous les oberver vont etre notifier par le tableau de données qui existe danns even-bus-experiments
      // les changements local dans les observer vont etre suprimer par la notification 
      // probleme 1 ==> Il a un autre probleme dans le pattern obervable sa methode notifyObservers est public , donc n'impote qui peut faire l'appel à ctte methode
      // et notifier les observer inscire par  n'impote quoi 
      // probleme 2 ==> le pattern observable ne peut pas definir l'habilité d'un objet pour s enregistrer ou faire des notificatons 
      // par ce que tout le monde peut avoir access au Subjet et ces methodes public 
      // il faut fait une separation entre l'habilite d'enregister un observer et l'habilite a envoyé les données

    },5000)
  }

  addLesson(lessonText: string ){
    globalEventBus.notifyObservers(ADD_NEW_LESSON ,lessonText) ;
  }

}
