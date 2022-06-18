
import { _decorator, Component, Node, Label, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NetworkDownload')
export class NetworkDownload extends Component {

    @property(Label)
    text: Label = null!;

    @property(Label)
    status: Label = null!;

    @property(Node)
    public noSupport: Node = null!

    onLoad () {
        if (sys.isNative && (sys.platform === sys.Platform.WIN32 ||
            sys.platform === sys.Platform.MACOS ||
            sys.platform === sys.Platform.ANDROID ||
            sys.platform === sys.Platform.IOS)) {
            this.noSupport.active = false;
        } else {
            this.noSupport.active = true;
            return;
        }
    }

    start() {
        this.status.string = "status: Not start"
    }

    download () {
        let downloader = new jsb.Downloader();
        downloader.setOnTaskProgress((task, bytesReceived, totalBytesReceived, totalBytesExpected)=>{
            console.log(bytesReceived, totalBytesReceived, totalBytesExpected)
            let progress = (totalBytesReceived / totalBytesExpected * 100).toFixed(1);
            this.text.string = totalBytesReceived + " ==> " + progress + "%";
        });
        downloader.setOnFileTaskSuccess((task)=>{
            console.log("Download success!");
            this.status.string = "status: Success"
        });
        downloader.setOnTaskError((task, errorCode, errorCodeInternal, errorStr)=>{
            console.log("Task error:", errorStr);
            this.status.string = "status: Error"
        });
        let task = downloader.createDownloadFileTask('https://all.res-gamebox.cocos.com/res/Cocos_Game_Tools_v1.0.15.apk', jsb.fileUtils.getWritablePath() + 'zz');
        // let task = down.createDownloadFileTask('https://download.cocos.com/CocosCreator/v2.3.1/CocosCreator_v2.3.1_20200303_win.7z', jsb.fileUtils.getWritablePath() + 'zz');
        this.status.string = "status: Downloading"
        
    }

}
