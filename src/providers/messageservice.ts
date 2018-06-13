import { ToastController } from 'ionic-angular';
//消息服务
export class MessageService
{
    //显示消息
    static showInfo(toastCtrl: ToastController,msg:string){
        let toast = toastCtrl.create({
            message: msg, //提示消息
            duration: 2000,//自动消失
            position: 'middle',//位置top,bottom,middle
            showCloseButton:true, //是否显示关闭按钮
            closeButtonText:' ' //关闭按钮字段
        });
        //显示toast
        toast.present();//符合触发条件后立即执行显示。
    }
    //显示异常
    static showWebApiError(toastCtrl: ToastController,error)
    {
        console.log(error);
        let msg="网络异常";
        if(error!=null)
        {
            switch(error.status)
            {
                case 400:{msg=error.error;break;}
                case 404:{msg="找不到服务";break;}
                case 500:{msg="请求无效";break;}
                default:{break;}
            }
        }
        let toast = toastCtrl.create({
            message: msg, //提示消息
            duration: 2000,//自动消失
            position: 'middle',//位置top,bottom,middle
            showCloseButton:true, //是否显示关闭按钮
            closeButtonText:' ' //关闭按钮字段
        });
        //显示toast
        toast.present();//符合触发条件后立即执行显示。
    }
}