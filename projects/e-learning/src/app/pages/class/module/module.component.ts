import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '@bootcamp-elearning/services/class.service';
import { ROLE } from '@bootcamp-homepage/constants/roles';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { VIEW_TYPE } from '../../../constants/view-type';
import * as moment from 'moment';
import { PresenceService } from '@bootcamp-elearning/services/presence.service';
import { ConfirmationService } from 'primeng/api';
import { MaterialService } from '@bootcamp-elearning/services/material.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {
  idDetailClass: string;
  roleCode: string;

  roles = ROLE;
  viewType = VIEW_TYPE;
  selectedView = VIEW_TYPE.VIEW_ONLY;

  modules: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private classService: ClassService,
    private materialService: MaterialService,
    private presenceService: PresenceService) { }

  ngOnInit(): void {
    this.roleCode = this.authService.getRole();

    this.route.params.subscribe(params => {
      this.idDetailClass = params['idDetailClass'];
      // setTimeout(() => {

      // }, 20000)
      this.getDetail(this.idDetailClass);
    })
  }

  getDetail(idDtlClass: string): void {
    let idUser = this.authService.getUserId();
    let params = {
      idUser,
      idDtlClass
    }

    this.classService.getDetailModule(params).subscribe(
      res => {
        this.modules = res.data;
        console.log(res);
        this.checkPresent();
      },
      err => { console.log(err) }
    )
  }

  checkPresent(): void {
    let startTime = this.modules.detailClass.startTime;
    let endTime = this.modules.detailClass.endTime;
    this.modules.modulesAndMaterials.forEach(val => {
      val.learningMaterials.forEach(learningMaterial => {
        if (this.roleCode === ROLE.PARTICIPANT) {
          console.log('Role anda adalah Participant');
          // if (true) {
          if (!learningMaterial.doesParticipantPresent) {
            if (learningMaterial.isUserOnTime) {
              if (learningMaterial.doesTutorPresent) {
                // Button Absen
                learningMaterial.statusPresent = {
                  type: 'btn',
                  style: 'success',
                  msg: 'Hadir',
                  status: 400
                }
                console.log('Bisa Absen');
              } else {
                // Tutor belum menghadiri kelas
                learningMaterial.statusPresent = {
                  type: 'badge',
                  style: 'info',
                  msg: 'Tutor Belum Menghadiri Kelas',
                  status: 400
                }
                console.log('Tutor Belum Menghadiri Kelas');
              }
            } else {
              let scheduleDate = learningMaterial.learningMaterial.scheduleDate;
              let scheduleStarDateTime = moment(`${scheduleDate} ${startTime}`, "YYYY-MM-DD HH:mm");
              let scheduleEndDateTime = moment(`${scheduleDate} ${endTime}`, "YYYY-MM-DD HH:mm");
              let dateTimeNow = moment(new Date());
              console.log('Waktu Sekarang');
              // console.log(dateTimeNow.add(7, 'hours'));

              if (dateTimeNow.diff(scheduleStarDateTime, 'seconds') >= 0) {
                if (dateTimeNow.diff(scheduleEndDateTime, 'seconds') > 0) {
                  // Kelas Kadaluarsa
                  learningMaterial.statusPresent = {
                    type: 'badge',
                    style: 'danger',
                    msg: 'Anda Terlambat Menghadiri Kelas',
                    status: 400
                  }
                  console.log('Anda Terlambat');
                }
              } else {
                // Kelas belum dimulai
                learningMaterial.statusPresent = {
                  type: 'badge',
                  style: 'warning',
                  msg: 'Kelas Belum Dimulai',
                  status: 400
                }
                console.log('Kelas belum dimulai');
              }
            }
          } else {
            if (learningMaterial.isParticipantConfirmed) {
              if (learningMaterial.isParticipantAccepted) {
                // Telah menghadiri kelas
                learningMaterial.statusPresent = {
                  type: 'badge',
                  style: 'success',
                  msg: 'Telah Menghadiri Kelas',
                  status: 200
                }
                console.log('Telah menghadiri kelas');
              } else {
                learningMaterial.statusPresent = {
                  type: 'badge',
                  style: 'danger',
                  msg: 'Tutor menolak kehadiran anda',
                  status: 400
                }
                console.log('Tutor menolak kehadiran anda');
              }
            } else {
              learningMaterial.statusPresent = {
                type: 'badge',
                style: 'info',
                msg: 'Menunggu Konfirmasi Tutor',
                status: 400
              }
              console.log('Menunggu konfirmasi tutor');
            }
          }
        } else {
          console.log('Role anda adalah Tutor');
          if (!learningMaterial.doesTutorPresent) {
            console.log('Role anda adalah Tutor: doesTutorPresent');
            if (learningMaterial.isUserOnTime) {
              console.log('Role anda adalah Tutor: isUserOntime');
              // Button Absen
              learningMaterial.statusPresent = {
                type: 'btn',
                style: 'success',
                msg: 'Hadir',
                status: 400
              }
              console.log('Bisa Absen');
            } else {
              console.log('Role anda adalah Tutor: NOT isUserOntime');
              let scheduleDate = learningMaterial.learningMaterial.scheduleDate;
              let scheduleStarDateTime = moment(`${scheduleDate} ${startTime}`, "YYYY-MM-DD HH:mm");
              let scheduleEndDateTime = moment(`${scheduleDate} ${endTime}`, "YYYY-MM-DD HH:mm");
              let dateTimeNow = moment(new Date());
              // dateTimeNow.add(7, 'hours')
              if (dateTimeNow.diff(scheduleStarDateTime, 'seconds') >= 0) {
                console.log('Role anda adalah Tutor: dateTimeNow.diff(scheduleStarDateTime, seconds) >= 0)');
                if (dateTimeNow.diff(scheduleEndDateTime, 'seconds') > 0) {
                  console.log('Role anda adalah Tutor: dateTimeNow.diff(scheduleEndDateTime, seconds) > 0');
                  // Kelas Kadaluarsa
                  learningMaterial.statusPresent = {
                    type: 'badge',
                    style: 'danger',
                    msg: 'Anda Terlambat',
                    status: 400
                  }
                  console.log('Anda terlambat');
                }
              } else {
                // Kelas belum dimulai
                learningMaterial.statusPresent = {
                  type: 'badge',
                  style: 'warning',
                  msg: 'Kelas Belum Dimulai',
                  status: 400
                }
                console.log('Kelas belum dimulai');
              }
            }
          } else {
            // Telah menghadiri kelas
            learningMaterial.statusPresent = {
              type: 'badge',
              style: 'success',
              msg: 'Telah Menghadiri Kelas',
              status: 200
            }
            console.log('Telah menghadiri kelas');
          }
        }
      });
    });
    this.isLoading = false;
  }

  present(idDetailModuleRegistration: string): void {
    let data = {
      idDetailModuleRegistration: {
        id: idDetailModuleRegistration
      },
      idUser: {
        id: this.authService.getUserId()
      }
    }

    this.presenceService.presence(data).subscribe(
      res => {
        this.refresh();
      },
      err => {
        console.log(err);
      }
    )
  }

  onChangeOperation(e): void {
    this.selectedView = e;
  }

  deleteMaterial(idLearningMaterial: string) {
    this.confirmationService.confirm({
      message: 'Apakah anda yakin menghapus materi ini?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.materialService.removeMaterial(idLearningMaterial, this.authService.getUserId()).subscribe(
          res => {
            console.log(res);
            this.refresh();
          },
          err => {
            console.log(err);
          }
        )
      },
      reject: (type) => {
        // switch(type) {
        //     case ConfirmEventType.REJECT:
        //         this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        //     break;
        //     case ConfirmEventType.CANCEL:
        //         this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
        //     break;
        // }
      }
    });



  }

  refresh(): void {
    this.isLoading = true;
    this.getDetail(this.idDetailClass);
  }

}
