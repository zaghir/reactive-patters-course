import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.css']
})
export class BrowserEventExperimentsComponent implements OnInit {

  hoverSection: HTMLElement;
  constructor() { }

  ngOnInit() {
    // recuperer l element hover 
    this.hoverSection = document.getElementById("hover");
    
    //sur l'element hover on ajoute un listner avec l evenement 'mousemove' 
    this.hoverSection.addEventListener('mousemove', onMouseMove);

    // ajouter la listener de type click sur le button hover
    this.hoverSection.addEventListener('click' , onMouseMove) ;
  }

  unsubscribe(){
    // suprimer listner de type mousemove sur le buton hover
    console.log("Called unsubscribe() ");    
    this.hoverSection.removeEventListener('mousemove',onMouseMove);
  }

}

// la fonction callback utilisée sur comme fonction dans les listener
function onMouseMove(ev: MouseEvent){
  console.log(ev)
}
