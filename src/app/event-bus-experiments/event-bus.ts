import {Lesson } from "../shared/model/lesson";


// definier deux type d'evenement
export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_EVENT';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

// implementation du pattern oberver
export interface Observer{
    next(data: any);
}

// 1-ere version de Observable
// interface Subject{
//     resisterObserver(obs: Observer);
//     unregisterObserver(obs: Observer);
//     notifyObservers(data: any);
// }

// on va creer un observable pour diffents evenements 
// interface Subject{
//     resisterObserver(eventType: string ,obs: Observer);
//     unregisterObserver(eventType: string ,obs: Observer);
//     notifyObservers(eventType: string ,data: any);
// }

// refactoriser les methode de Subject dans l'observable 
interface Observable {
    subscribe(obs: Observer);
    unsubscribe(obs: Observer);
}
// 2-eme version de Observable
// subject a la meme methode next que l Observer donc on herite de next de Observer
interface Subject extends Observer ,Observable{
        
}

// il faut que la classe SubjectImplementation soit privée pour ne pas instancié plusieurs fois
// on ne met pas export apres la classe 
class SubjectImplementation implements Subject{

    private observers :Observer[] = [];
    next(data: any) {
        //on broadcast les data sur tous les observers  
        this.observers.forEach(obs =>{ obs.next(data)});        
    }

    subscribe(obs: Observer) {
        this.observers.push(obs);        
    }
    unsubscribe(obs: Observer) {
        const index = this.observers.indexOf(obs);
        this.observers.splice(index,1);
    }
}

// private
const lessonsListSubject = new SubjectImplementation();

// public export
// je cree mon Observable , t j'ulise l implemenation de subject pour subscribe et unsubscribe
// lessonsListSubject contient tous les observer 
export let lessonListObservable: Observable ={
    subscribe: obs => {
        lessonsListSubject.subscribe(obs);
        // si un observer est inscrit on lui envoie des notifications avec les lessons
        // pour que sa liste ne soit pas vide, il resoit qu'il y a comme information deja pousser par les autres observers        
        // lessons c'est notre liste partagé par les observer
        obs.next(lessons); 
        console.log('lessonListObservable subscribe()' , lessons);
    } ,
    unsubscribe: obs => lessonsListSubject.unsubscribe(obs)

} ;

// on centralise les données des lessons  et on les suprime des autres classes 
let lessons: Lesson[] = [];

export function initializeLessonsList(newLessons:Lesson[]){
    // pour ne pas passer des reference à la liste lessons et modifier par des mutateur 
    // on cree une copie et en set avec les lessons par newLessons 
    lessons = newLessons.slice(0);
    // notifier tous les observer 
    lessonsListSubject.next(lessons);
    console.log('initializeLessonsList ==> ' , newLessons)
}
