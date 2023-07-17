
import { _decorator, Component, Node, Label, sys, native } from 'cc';
import { NATIVE } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('NetworkDownload')
export class NetworkDownload extends Component {

    @property(Label)
    text: Label = null!;

    @property(Label)
    status: Label = null!;

    // For autotest, because the automation script needs to take a screenshot after the download events.
    onProgress: Function | null = null;
    onSuccess: Function | null = null;
    onError: Function | null = null;

    start() {
        this.status.string = "status: Not start"
    }

    download () {
        if (!NATIVE) return;
        const hints: native.DownloaderHints = {
            timeoutInSeconds: 200,
        };
        let downloader = new native.Downloader(hints);
        
        let task = downloader.createDownloadTask('https://www.openssl.org/source/openssl-3.1.0.tar.gz', native.fileUtils.getWritablePath() + 'zz');
        // let task = downloader.createDownloadTask('https://download.cocos.com/CocosCreator/v2.3.1/CocosCreator_v2.3.1_20200303_win.7z', jsb.fileUtils.getWritablePath() + 'zz');
        this.status.string = "status: Downloading"

        downloader.onProgress = (task, bytesReceived, totalBytesReceived, totalBytesExpected) => {
            console.log(bytesReceived, totalBytesReceived, totalBytesExpected)
            let progress = (totalBytesReceived / totalBytesExpected * 100).toFixed(1);
            this.text.string = totalBytesReceived + " ==> " + progress + "%";
            if (this.onProgress) {
                this.onProgress();
            }
        };

        downloader.onSuccess = (task) => {            
            console.log("Download success!");
            this.status.string = "status: Success"
            if (this.onSuccess) {
                this.onSuccess();
            }
        };
    
        downloader.onError = (task, errorCode, errorCodeInternal, errorStr) => {
            console.log("Task error:", errorStr);
            this.status.string = "status: Error"
            if (this.onError) {
                this.onError();
            }
        };   
    }

}
