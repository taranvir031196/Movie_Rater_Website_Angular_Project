import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
  
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  
  faTrash = faTrash;
  faEdit = faEdit;
  @Input() movies = [];
  @Output() selectMovie = new EventEmitter();
  @Output() editedMovie = new EventEmitter();
  @Output() createNewMovie = new EventEmitter();
  @Output() deletedMovie = new EventEmitter();
  constructor(){}

  ngOnInit(){
    
  }

  movieClicked(movie){
    this.selectMovie.emit(movie);
  }

  editMovie(movie){
    this.editedMovie.emit(movie);
  }

  newMovie(){
    this.createNewMovie.emit();
  }

  delete(movie){
    this.deletedMovie.emit(movie);
  }

}
