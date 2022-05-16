import { Component, OnInit } from '@angular/core';
import {EventDriverService} from "../../services/event.driver.service";
import {ActionEvent} from "../../state/product.state";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter:number=0;
  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      ++this.counter;
    });
  }

}
