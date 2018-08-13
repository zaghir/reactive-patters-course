import { Component, OnInit } from '@angular/core';
import { globalEventBus, LESSONS_LIST_AVAILABLE } from './event-bus';
import { testLessons } from '../shared/model/test-lessons';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('EventBusExperimentsComponent onInit()  broadcasted all lessons ')
    // au chargement de la page chaque observer sera notifié par la liste des lessons
    // notifier tous les observer qui ecoute l'evenement ==> LESSONS_LIST_AVAILABLE
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE ,testLessons);
  }

}
