import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { AuthenticationService } from '../../../Modules/AuthenticationService.service';
import { UserManagerService } from '../../../Modules/UserManager.service';

@Component({
    selector:'app-login',
    styleUrls:['./Login.component.scss'],
    templateUrl:'./Login.component.html'
})
export class LoginComponent implements OnInit{
    Login:UserManagerEntity=new UserManagerEntity();
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: UserManagerService
    ) {
    }
    ngOnInit(){
        this.Login.user_manager_username='TuanVn';
        this.Login.user_manager_password='123';
    }


    CheckLogin(){
        this.submitted = true;

        this.loading = true;
        this.authenticationService.GetUserManager()
            .pipe(first())
            .subscribe(
                (data:UserManagerEntity[])=>
                {
                    for(let i=0;i<data.length;i++)
                    {
                        if(this.Login.user_manager_username==data[i].user_manager_username&&this.Login.user_manager_password==data[i].user_manager_password){
                            this.router.navigate(['/admin']);
                        }
                        else{
                            alert('false')
                        }
                    }   
                }
            );
    }
    
}