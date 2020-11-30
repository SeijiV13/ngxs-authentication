import { Login } from './../../states/actions/login.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private store: Store,
              private fb: FormBuilder,
              private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.initForm();
  }

  // tslint:disable-next-line: typedef
  initForm() {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  // tslint:disable-next-line: typedef
  login() {
     this.store.dispatch(new Login(this.form.getRawValue())).subscribe((data) => {
        this.router.navigate(['/admin']);
     });
  }

}
