import {Component, OnInit} from '@angular/core';
import {User} from "../../../../model/user";
import {FriendRelationService} from "../../../../service/friend-relation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  currentUser: string = "";
  idUser: string | undefined;
  listFriendRequest!: User[];

  constructor(private friendRelationService: FriendRelationService,
              private router: Router) {
    // @ts-ignore
    this.currentUser = localStorage.getItem("currentUser")
    console.log(this.currentUser);
    this.idUser = JSON.parse(this.currentUser).id;
    console.log(this.idUser);
  }

  ngOnInit(): void {
    this.friendRelationService.findRequestById(this.idUser + "").subscribe(result => {
      this.listFriendRequest = result;
      console.log(result);
    }, error => {
      console.log(error)
    })
  }

  acceptFriend(idUserRequest: string | undefined) {
    console.log(idUserRequest);
    // @ts-ignore
    this.friendRelationService.acceptFriend(this.idUser, idUserRequest).subscribe(() => {
      alert('Kết bạn thành công');
      this.ngOnInit();
      this.router.navigate(['user/requests']);
    });
  }

  deleteRequest(idUserRequest: string | undefined) {
    console.log(idUserRequest);
    // @ts-ignore
    this.friendRelationService.deleteRequest(this.idUser, idUserRequest).subscribe(() => {
      alert('Hủy kết bạn thành công');
      this.ngOnInit();
      this.router.navigate(['user/requests']);
    });
  }
}
