// definier deux type d'evenement
export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_EVENT';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

// implementation du pattern oberver
export interface Observer{
    notify(data: any);
}


// interface Subject{
//     resisterObserver(obs: Observer);
//     unregisterObserver(obs: Observer);
//     notifyObservers(data: any);
// }

// on va creer un observable pour diffents evenements 
interface Subject{
    resisterObserver(eventType: string ,obs: Observer);
    unregisterObserver(eventType: string ,obs: Observer);
    notifyObservers(eventType: string ,data: any);
}

class EvenBus implements Subject{

    // on n utiliste plus un simple tableau 
    //private observers: Observer[] = [];
    // creation d'une map avec key = type devenement et value = list des observer
    private observers: {[key:string]:Observer[]} = {} ;

    resisterObserver(eventType:string , obs: Observer) {
        //this.observers.push(obs);
        // recuperer dans la map observers la liste des observer 
        // un retour soit un tableau vide pour un nouveau type ou une liste
        this.observerPerEventType(eventType).push(obs);
    }

    unregisterObserver(eventType:string , obs: Observer) {
        //const index = this.observers.indexOf(obs);
        //this.observers.splice(index ,1);
        const index = this.observerPerEventType(eventType).indexOf(obs);
        this.observerPerEventType(eventType).splice(index, 1);
    }
    notifyObservers(eventType:string , data: any) {
        // pour chaque type d'evenement notifier les observers 
        this.observerPerEventType(eventType).forEach(obs =>{
            obs.notify(data);
        })
    }

    private observerPerEventType(eventType:string) : Observer[]{
        const observersPerEvenType = this.observers[eventType];
        if(!observersPerEvenType){
            this.observers[eventType] = [];
        }
        return this.observers[eventType] ;
    }

}

// la class EvenBus n'est visible que dans le ce fichier car on l'exporte pas 
// on va creer une seule intance globalEventBus de EvenBus avec l'operateur ===> const  
export const globalEventBus = new EvenBus();