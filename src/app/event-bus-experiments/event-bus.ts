import {Lesson } from "../shared/model/lesson";
import { Observer, Observable, Subject, BehaviorSubject } from "rxjs";


// on factorise toutes les variables dans un seul endroit , c'est le pattern factory
class DataStore {
      
    // private    on utilise BehaviorSubject  au lieu de subjet pour resourdre le probleme de chargement
    private  lessonsListSubject = new BehaviorSubject([]);

    // c'est Rxjs qui implemente les methodes subscribe unsubscribe
    public lessonListObservable: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

    public initializeLessonsList(newList:Lesson[]){
        this.lessonsListSubject.next(this.cloneObject(newList));        
        console.log('initializeLessonsList ==> ' , newList)
    }

    public addLesson(newLesson: Lesson): any {
        // le changement c'est qu on a suprimé la propriété lessons de la class
        // et on clonne des objet pour eviter le passage des references de l objet
        const lessons = this.cloneLessons();
        lessons.push(this.cloneObject(newLesson));
        // et on a sumpriser this.broadcast();  remplacer pas la fonction next de l'observable
        this.lessonsListSubject.next(lessons);        
    }

    toggleLessonView(toggele: Lesson){
        console.log('toggleLessonView ...' , toggele);
        const lessons = this.cloneLessons();
        let lessonToggle :Lesson;
        for(let i: number =0 ; i< lessons.length ; i++){
            if(lessons[i].id === toggele.id){
                lessonToggle = lessons[i];
                break;
            }
        }
        lessonToggle.completed = !lessonToggle.completed;
        this.lessonsListSubject.next(lessons);
    }
    
    deleteLesson(lesson: Lesson){        
        const lessons = this.cloneLessons();
        const index = lessons.indexOf(lesson);
        lessons.splice(index,1);
        this.lessonsListSubject.next(lessons);
    }

    private cloneObject(objet:any): any{
        console.log(JSON.parse(JSON.stringify(objet)));
        return JSON.parse(JSON.stringify(objet));
    }

    private cloneLessons(){
        return this.cloneObject(this.lessonsListSubject.getValue());
    }
}

// toutes le varibles sont private a part store avec l observable
export const store = new DataStore();
