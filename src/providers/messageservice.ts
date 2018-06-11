import { ToastController } from 'ionic-angular';
//消息服务
export class MessageService
{
    constructor() {}
    //显示消息
    static showInfo(toastCtrl: ToastController,msg:string){
        let toast = toastCtrl.create({
            message: msg, //提示消息
            duration: 2000,//自动消失
            position: 'middle',//位置top,bottom,middle
            showCloseButton:true, //是否显示关闭按钮
            closeButtonText:"X" //关闭按钮字段
        });
        //显示toast
        toast.present();//符合触发条件后立即执行显示。
    }
}