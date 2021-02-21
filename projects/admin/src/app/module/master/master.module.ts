import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { JenisTugasModule } from './jenis-tugas/jenis-tugas.module';
import { KelasModule } from './kelas/kelas.module';
import { NilaiModule } from './nilai/nilai.module';
import { SilabusModule } from './silabus/silabus.module';
import { StatusTugasModule } from './status-tugas/status-tugas.module';
import { UserModule } from './user/user.module';
import { PersetujuanAbsenModule } from './persetujuan-absen/persetujuan-absen.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MasterRoutingModule,
    JenisTugasModule,
    KelasModule,
    NilaiModule,
    SilabusModule,
    StatusTugasModule,
    UserModule,
    PersetujuanAbsenModule
    // PengaturanModule
  ]
})
export class MasterModule { }
