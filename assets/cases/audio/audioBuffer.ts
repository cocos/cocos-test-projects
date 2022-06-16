import { _decorator, Component, Node, AudioSource, Graphics, view, UITransform, input, Input, EventMouse, clamp, v3, Size, EventTouch, Slider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioBuffer')
export class audioBuffer extends Component {
    @property(AudioSource)
    audioSource: AudioSource = null!;

    @property(Graphics)
    graphics1: Graphics = null!;
    @property(Graphics)
    graphics2: Graphics = null!;

    @property(Slider)
    slider: Slider = null!;

    @property(Node)
    noSupported: Node = null!;

    private _buffer1?: Float32Array;
    private _buffer2?: Float32Array;

    private _originalWidth1 = 0;
    private _originalWidth2 = 0;

    private _sampleRate = 0;
    private _bitDepth = 1;

    private _uiTrans1: UITransform = null!;
    private _uiTrans2: UITransform = null!;

    private _currentScaleX = 1;
    private _maxScaleX = 10;
    private _visibleSize!: Size;

    async onEnable () {
        this._buffer1 = await this.audioSource.getPCMBuffer(0);
        this._buffer2 = await this.audioSource.getPCMBuffer(1);
        if (!this._buffer1 && !this._buffer2) {
            this.noSupported.active = true;
            return;
        }
        this._sampleRate = await this.audioSource.getSampleRate();
        this._bitDepth = await this.audioSource.getBitDepth();
        this._originalWidth1 = this.graphics1.getComponent(UITransform)!.contentSize.width;
        this._originalWidth2 = this.graphics2.getComponent(UITransform)!.contentSize.width;
        this._uiTrans1 = this.graphics1.getComponent(UITransform)!;
        this._uiTrans2 = this.graphics2.getComponent(UITransform)!;
        this._visibleSize = view.getVisibleSize();

        await this.drawAudioBuffer();

        input.on(Input.EventType.TOUCH_MOVE, this.onDragMove, this);
        this.slider.node.on('slide', this.onSliderChange, this);
    }
    
    onDisabled () {
        input.off(Input.EventType.TOUCH_MOVE, this.onDragMove, this);
        this.slider.node.off('slide', this.onSliderChange, this);
    }

    async drawBufferFromChannel (graphics: Graphics, buffer?: Float32Array) {
        if (!buffer) {
            return;
        }
        // sample from 42 seconds
        const startSamplePoint = 42 * this._sampleRate;
        const maxSampleLength = 15000;
        const sampleLength = Math.min(buffer.length-startSamplePoint, maxSampleLength);
        const contentSize = graphics.node.getComponent(UITransform)!.contentSize;

        const startDrawingPoint = 0;
        const drawingStep = contentSize.width/maxSampleLength;
        graphics.moveTo(startDrawingPoint, 0);
        const endSamplePoint = startSamplePoint + sampleLength;
        for (let i = startSamplePoint; i < endSamplePoint; i++) {
            const data = buffer[i] / this._bitDepth;  // Normalize data
            const y = data * contentSize.height/2;
            graphics.lineTo(startDrawingPoint + (i-startSamplePoint)*drawingStep, y);
        }
        graphics.stroke();
    }

    async drawAudioBuffer () {
        this.graphics1.clear();
        this.graphics2.clear();
        
        this.drawBufferFromChannel(this.graphics1, this._buffer1);
        this.drawBufferFromChannel(this.graphics2, this._buffer2);
    }

    async onDragMove (event: EventTouch) {
        let deltaX = event.getDeltaX();
        let pos1 = this.graphics1.node.position;
        let pos2 = this.graphics2.node.position;
        let posX1 = pos1.x;
        let posX2 = pos2.x;
        posX1 += deltaX;
        posX2 += deltaX;
        posX1 = clamp(posX1, this._visibleSize.width - this._uiTrans1.width, 0);
        posX2 = clamp(posX2, this._visibleSize.width - this._uiTrans2.width, 0);
        this.graphics1.node.setPosition(v3(posX1, pos1.y, pos1.z));
        this.graphics2.node.setPosition(v3(posX2, pos2.y, pos2.z));
    }

    async onSliderChange (slider: Slider) {
        const progress = slider.progress;
        this._currentScaleX = progress * this._maxScaleX;
        this._currentScaleX = clamp(this._currentScaleX, 1, this._maxScaleX);
        this._uiTrans1.width = this._originalWidth1 * this._currentScaleX;
        this._uiTrans2.width = this._originalWidth2 * this._currentScaleX;

        this._correctPosition();
        await this.drawAudioBuffer();
    }

    private _correctPosition () {
        let pos1 = this.graphics1.node.position;
        let pos2 = this.graphics2.node.position;
        let posX1 = pos1.x;
        let posX2 = pos2.x;
        posX1 = clamp(posX1, this._visibleSize.width - this._uiTrans1.width, 0);
        posX2 = clamp(posX2, this._visibleSize.width - this._uiTrans2.width, 0);
        this.graphics1.node.setPosition(v3(posX1, pos1.y, pos1.z));
        this.graphics2.node.setPosition(v3(posX2, pos2.y, pos2.z));
    }
}

