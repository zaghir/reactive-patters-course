import {Lesson } from "../shared/model/lesson";
import { JsonPipe } from "../../../node_modules/@angular/common";


// definier deux type d'evenement
// export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_EVENT';
// export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

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


// on factorise tous les variables dans un seul endroit , c'est le pattern factory
class DataStore implements Observable {
    
      // on centralise les données des lessons  et on les suprime des autres classes 
    private lessons: Lesson[] = [];
    // private
    private  lessonsListSubject = new SubjectImplementation();

    subscribe(obs: Observer) {
        this.lessonsListSubject.subscribe(obs);
        // si un observer est inscrit on lui envoie des notifications avec les lessons
        // pour que sa liste ne soit pas vide, il resoit qu'il y a comme information deja pousser par les autres observers        
        // lessons c'est notre liste partagé par les observer
        obs.next(this.lessons); 
        console.log('lessonListObservable subscribe()' , this.lessons);
        
    }
    unsubscribe(obs: Observer) {
        this.lessonsListSubject.unsubscribe(obs);
    }
    
    public initializeLessonsList(newLessons:Lesson[]){
        // pour ne pas passer des reference à la liste lessons et modifier par des mutateur 
        // on cree une copie et en set avec les lessons par newLessons 
        this.lessons = newLessons.slice(0);
        // notifier tous les observer 
        this.broadcast();  
        console.log('initializeLessonsList ==> ' , newLessons)
    }

    public addLesson(newLesson: Lesson): any {
        // on clone l'objet puis en l'ajout à la table
        // si on clone pas l'objet d'autre observer peuvent modifier les objet ajouter 
        // car le tableau a toujour la reference d aubjet passé

        this.lessons.push(this.cloneObject(newLesson));              
        this.broadcast();        
    }

    toggleLessonView(toggele: Lesson){
        console.log('toggleLessonView ...' , toggele);
        let lessonToggle :Lesson;
        for(let i: number =0 ; i< this.lessons.length ; i++){
            if(this.lessons[i].id === toggele.id){
                lessonToggle = this.lessons[i];
                break;
            }
        }
        lessonToggle.completed = !lessonToggle.completed;
        this.broadcast();
    }
    
    deleteLesson(lesson: Lesson){        
        const index = this.lessons.indexOf(lesson);
        this.lessons.splice(index,1);
        this.broadcast();
    }

    public broadcast(){
         // la methode next envoie la referece de la liste lessons , qui cause problemes d'affichages avec le binding Angular
        // si un oberver affiche la list il applique les changement fait localement sur les object de la liste recuprere 
        //this.lessonsListSubject.next(this.lessons);
        // on envoie un clone ou une copie de la liste car il ne faut pas quelle soit mutable  
        this.lessonsListSubject.next(this.cloneObject(this.lessons));        
    }

    private cloneObject(objet:any): any{
        console.log(JSON.parse(JSON.stringify(objet)));
        return JSON.parse(JSON.stringify(objet));
    }
}

// toutes le varibles sont private a part store avec l observable
export const store = new DataStore();
