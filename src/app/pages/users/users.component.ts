import { Component, OnInit } from '@angular/core';
import { User, IUser } from 'src/app/models/user.model';
import { UserService, ModalUploadService, AccountService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];
  totalUsers: number;
  from = 0;
  loading: boolean;

  constructor(
    private userService: UserService,
    public modalService: ModalUploadService,
    public accountService: AccountService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.modalService.notification.subscribe(res => this.getUsers());
  }

  openModal(id: string, imgPath: string) {
    this.modalService.openModal('users', id, imgPath);
  }

  getUsers() {
    this.loading = true;
    this.userService.getAll(this.from).subscribe(res => {
      this.loading = false;
      this.users = res.data;
      this.totalUsers = res.total;
    });
  }

  paginate(value: number) {
    const sum = this.from + value;
    if (sum >= this.totalUsers || sum < 0) {
      console.log('from ', sum);
      return;
    }

    console.log('out ', sum);

    this.from += value;
    this.getUsers();
  }

  searchUser(text: string) {
    if (text.length <= 0) {
      this.getUsers();
      return;
    }

    this.loading = true;
    this.userService.searchAll(text).subscribe(res => {
      this.loading = false;
      this.users = res.data;
    });
  }

  deleteUser(id: string) {
    if (id === this.accountService.user._id) {
      Swal.fire('Invalid Operation', `You can't delete to yourself`, 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(id).subscribe(res => {
          this.getUsers();
          Swal.fire('Deleted!', res.message, 'success');
        });
      }
    });
  }

  updateUser(user: IUser) {
    this.userService.update(user).subscribe();
  }
}
