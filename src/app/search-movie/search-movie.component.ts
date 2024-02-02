import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent implements  OnInit {

  movieForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit () {
    this.movieForm = this.fb.group({
      search: this.fb.group({
        identifier: [''],
        title:['']
      }, {validator: this.isRequiredValidator('title', 'identifier')}),
      type: ['series'],
      releaseYear: ['',[Validators.required, this.rangeDateValidator(1900, new Date().getFullYear())]],
      recordDetail: ''
    });

    this.movieForm.get('recordDetails')?.patchValue('short');



    // souscrire au changement
    this.movieForm.valueChanges.subscribe(value => console.log(value));
  }

  isRequiredValidator(titleKey: string, identifierKey: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      let title = group.controls[titleKey];
      let identifier = group.controls[identifierKey];
      if (title.value || identifier.value) {
        return null;
      } else {
        return {'isRequired': true };
      }
    };
  }

  rangeDateValidator(minYear: number, maxYear: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value < minYear || control.value > maxYear) {
        return { 'min': {min: minYear, max: maxYear} };
      } else {
        return null;
      }
    };
  }

  onSubmit() {
    if (this.movieForm.valid) {
      console.log(this.movieForm.value);
    } else {
      console.log('formulaire non valide');
    }
  }

}
