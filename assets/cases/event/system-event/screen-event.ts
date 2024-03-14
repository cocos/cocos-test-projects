import { _decorator, Component, Label, screen, macro } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('screen_event')
export class screen_event extends Component {
    
   @property(Label)
   public labelWindow: Label = null!;

   @property(Label)
   public labelOrientation: Label = null!;

   onStart() {
        this.labelOrientation.string = "";
   }

   onLoad() {
        screen.on('window-resize', this.onWindowResize, this);
        screen.on('orientation-change', this.onOrientationChange, this);
        this.labelWindow.string = `Window width: ${window.innerWidth}, height: ${window.innerHeight}`;
    }

    onDestroy() {
        screen.off('window-resize', this.onWindowResize, this);
        screen.off('orientation-change', this.onOrientationChange, this);
    }

    onOrientationChange(orientation: number) {
        if (orientation === macro.ORIENTATION_PORTRAIT) {
            this.labelOrientation.string = 'Screen orientation: portrait';
        } else if(orientation === macro.ORIENTATION_LANDSCAPE_LEFT) {
            this.labelOrientation.string = 'Screen orientation: landscape left';
        } else if(orientation === macro.ORIENTATION_LANDSCAPE_RIGHT) {
            this.labelOrientation.string = 'Screen orientation: landscape right';
        } else {
            this.labelOrientation.string = 'Screen orientation: portrait upside down';
        }
    }

    onWindowResize(width: number, height: number) {
        this.labelWindow.string = `Window width: ${width}, height: ${height}`;
    }
}

