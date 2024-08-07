import { Component, Input, Output, EventEmitter, OnInit, SimpleChange } from "@angular/core";
import { UserService } from "../../services/user.service";
import { LandaService } from "src/app/core/services/landa.service";
import { ProgressServiceService } from "src/app/core/services/progress-service.service";

@Component({
  selector: "app-form-user",
  templateUrl: "./form-user.component.html",
  styleUrls: ["./form-user.component.scss"],
})
export class FormUserComponent implements OnInit {
  cities = ["Malang", "Surabaya", "Mojokerto"];
  name: string;

  @Input() userId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = "add";
  readonly MODE_UPDATE = "update";

  constructor(
    private userService: UserService,
    private landaService: LandaService,
    private progressService: ProgressServiceService
  ) { }
  ngOnInit(): void {
    this.getRoles();
    this.resetForm();
  }

  activeMode: string;
  formModel: {
    id: number;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    user_roles_id: string;
  };
  isDisabledForm: boolean = false;

  getUser(userId) {
    this.userService.getUserById(userId).subscribe(
      (res: any) => {
        console.log(res.data);
        this.formModel = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  roles: [];
  getRoles() {
    this.userService.getRoles().subscribe((res: any) => {
      this.roles = res.data.list;
      console.log("Roles:", this.roles);
    }, err => {
      console.log(err);
    });
  }

  resetForm() {
    this.formModel = {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone_number: '',
      user_roles_id: '',
    }

    if (this.userId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getUser(this.userId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        console.log('data:', this.formModel)
        this.update();
        break;
    }
  }

  insert() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.userService.createUser(this.formModel).subscribe(
      (res: any) => {
        this.landaService.alertSuccess("Berhasil", res.message);
        this.afterSave.emit();
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      },
      (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      }
    );
  }

  update() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.userService.updateUser(this.formModel).subscribe(
      (res: any) => {
        this.landaService.alertSuccess("Berhasil", res.message);
        this.afterSave.emit();
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      },
      (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      }
    );
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  
}
