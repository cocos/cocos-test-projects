
import { _decorator, Component, Node, Label, sys, native } from 'cc';
import { NATIVE } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('NetworkDownload')
export class NetworkDownload extends Component {

    @property(Label)
    text: Label = null!;

    @property(Label)
    status: Label = null!;

    start() {
        this.status.string = "status: Not start"
    }

    download () {
        if (!NATIVE) return;
        const hints: native.DownloaderHints = {
            timeoutInSeconds: 200,
        };
        let downloader = new native.Downloader(hints);
        
        let task = downloader.createDownloadTask('https://all.res-gamebox.cocos.com/res/Cocos_Game_Tools_v1.0.15.apk', native.fileUtils.getWritablePath() + 'zz');
        // let task = downloader.createDownloadTask('https://download.cocos.com/CocosCreator/v2.3.1/CocosCreator_v2.3.1_20200303_win.7z', jsb.fileUtils.getWritablePath() + 'zz');
        this.status.string = "status: Downloading"

        downloader.onProgress = (task, bytesReceived, totalBytesReceived, totalBytesExpected) => {
            console.log(bytesReceived, totalBytesReceived, totalBytesExpected)
            let progress = (totalBytesReceived / totalBytesExpected * 100).toFixed(1);
            this.text.string = totalBytesReceived + " ==> " + progress + "%";
        };

        downloader.onSuccess = (task) => {            
            console.log("Download success!");
            this.status.string = "status: Success"
        };
    
        downloader.onError = (task, errorCode, errorCodeInternal, errorStr) => {
            console.log("Task error:", errorStr);
            this.status.string = "status: Error"
        };   
    }

}
