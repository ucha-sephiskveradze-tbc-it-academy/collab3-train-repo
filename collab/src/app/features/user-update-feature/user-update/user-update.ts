import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService} from '../services/user-update.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.html',
  styleUrls: ['./user-update.scss'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class UserUpdate implements OnInit {
  userForm!: FormGroup;
  loading = false;
  userId!:number;
  private route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder, private userService: UserService) {}



  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id) {
        this.userId = +id;
        this.loadUser()
      }
    })
  }


  loadUser() {
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user: IUser) => {
        this.userForm.patchValue(user);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: (updatedUser) => {
        alert('Profile updated!');
        this.userForm.patchValue(updatedUser);
      },
      error: (err) => console.error(err)
    });
  }
}
