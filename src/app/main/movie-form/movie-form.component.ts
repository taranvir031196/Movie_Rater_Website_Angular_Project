import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm;
  id=null;

  @Output() movieCreated = new EventEmitter();
  @Output() movieUpdated = new EventEmitter();



  @Input() set movie(val){
  this.id= val.id;
  console.log(this.id);
  this.movieForm = new FormGroup({
    title: new FormControl(val.title),
    description: new FormControl(val.description)
  });
}

  constructor(
    private apiService: ApiService){
   }

  ngOnInit(): void {
  }

formDisabled(){
    if(this.movieForm.value.title.length && this.movieForm.value.description.length){
          return false;
    }else{
      return true;
    }
}

  saveForm(){
    console.log(this.movieForm.value);
    if(this.id){
    this.apiService.updateMovie(this.id, this.movieForm.value.title, this.movieForm.value.description).subscribe(
      result=> this.movieUpdated.emit(result),
      error=> console.log(error)
      );
  }
else{
   
    this.apiService.createMovie(this.movieForm.value.title, this.movieForm.value.description).subscribe(
    result=> this.movieCreated.emit(result),
    error=> console.log(error)
    );
   }
  }
}
