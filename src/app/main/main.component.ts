import { Component, OnInit, Type } from '@angular/core';
import {ApiService } from '../api.service';
import { Movie } from '../models/Movie';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
  movies:any =[];
  selectedMovie=null;
  editedMovie=null;
  
  constructor(private apiService: ApiService, private cookieService:CookieService, private router: Router) { }

  ngOnInit() {

    const usertoken = this.cookieService.get('user-token');
    if(!usertoken){
      this.router.navigate(['/auth']);
    }else{
    this.apiService.getMovies().subscribe(
      data => {
        this.movies=data;
      },
      error => console.log(error)
    );
   }
  }

  logout(){
    this.cookieService.delete('user-token');
    this.router.navigate(['/auth']);
  }

  selectMovie(movie){
    this.selectedMovie=movie;
    console.log('selectedMovie', this.selectedMovie);
    this.editedMovie= null;
  }

  editMovie(movie){
    this.editedMovie= movie;
    this.selectedMovie= null;
  }

  createNewMovie(){
    this.editedMovie = {title: '', description:''};
    this.selectedMovie = null;
  }

  deletedMovie(movie){
    // removed movie using api 
    console.log('delete', movie.title);
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        console.log(data);
        this.movies = this.movies.filter(mov=>mov.id !== movie.id);
      },
      error => console.log(error)
    );
  }

  movieCreated(movie){
    this.movies.push(movie);
    this.editedMovie = null;
  }
  movieUpdated(movie){
    const index = this.movies.filterIndex(mov => movie.id === movie.id);
    if(index>0){
      this.movies[index]=movie;
      this.editedMovie=null;
    }
  }
}
