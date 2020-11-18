import { formatDate } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonComponent } from '../../../app.component';
import { DeviceEntity } from '../../../Models/Device/Device.Entity';
import { ProjectEntity } from '../../../Models/Project/Project.Entity';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { DeviceService } from '../../../Modules/Device.service';
import { ProjectService } from '../../../Modules/Project.service';
import { UserManagerService } from '../../../Modules/UserManager.service';

@Component({
    selector:'app-Device',
    styleUrls:['./Device.component.scss'],
    templateUrl:'./Device.component.html'
})
export class DeviceComponent extends CommonComponent<DeviceEntity> implements OnInit{
    devices:DeviceEntity[];
    projects:ProjectEntity[];
    users:UserManagerEntity[];
    date=new Date();
    constructor(
        private _deviceservice:DeviceService,
        private _projectservice:ProjectService,
        private _usermanagerservice:UserManagerService,
        private router:Router,
    ){  
        super(_deviceservice)
    }
    ngOnChanges(changes){
        this._deviceservice.GetDevice().subscribe(
            (data:any)=>{
                this.devices=data.data;
                this.count=this.devices.length;
            }
        )
    }
    Close(){
        setTimeout(() => {
            document.getElementById('notication').style.display='none';
        }, 300);
    }
    getDevice(){
        this._deviceservice.GetDevice().subscribe(
            (data:any)=>{
                this.devices=data.data;
                this.count=this.devices.length;
                // for(let i=0;i<this.devices.length;i++){
                //     var date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
                //     var date2 = formatDate(this.devices[i].device_warranty_period,'yyyy-MM-dd','en_US');
                //     if(date1>date2){
                //         console.log("Đã hết hạn");
                //         }else{
                //         console.log("Chưa hết hạn");
                //         }
                // }
            }
        )
    }
    getProject(){
        this._projectservice.GetProject().subscribe(
            (data:any)=>{
                this.projects=data.data;
            }
        )
    }
    getUser(){
        this._usermanagerservice.GetUserManager().subscribe(
            (data:any)=>{
                this.users=data.data;
            }
        )
    }
    deletebyId(data){
        this._deviceservice.DeleteById(data).subscribe(
            (data:any)=>{
                this.ngOnChanges(data);
                setTimeout(() => {
                    document.getElementById('notication').style.display='flex';
                }, 300);
            }
        )
    }
    add(){
        this.router.navigate(['/admin/devices/add']);
    }
    edit(data:DeviceEntity){
        this.router.navigate([`/admin/devices/edit/${data.device_id}`]);
    }
    ngOnInit(){
        this.getUser();
        this.getProject();
        this.Paging.Size=10;
        this.getDevice();
    }
    
}