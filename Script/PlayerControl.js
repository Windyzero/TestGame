cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        moveSpeed: 32,

        map: {
            type: cc.Node,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.isMoving = false;
        this.dir = cc.p(0,0);

        this.dirUp = cc.p(0, 1);
        this.dirDown = cc.p(0, -1);
        this.dirLeft = cc.p(-1, 0);
        this.dirRight = cc.p(1, 0);

        this.upBtnDown = false;
        this.downBtnDown = false;
        this.leftBtnDown = false;
        this.rightBtnDown = false;
        
        this.setInputControl();
        cc.director.setDisplayStats(true);
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(!this.isMoving && cc.pLengthSQ(this.dir) > 0){
            var self = this;
            self.isMoving = true;
            this.node.runAction(cc.sequence(cc.moveBy(16 / this.moveSpeed, 16 * this.dir.x, 16 * this.dir.y),
            cc.callFunc(function(){
                self.isMoving = false;
            })));
            if(this.map){
                this.map.runAction(cc.moveBy(16 / this.moveSpeed, -16 * this.dir.x, -16 * this.dir.y));
            }
        }
    },

    setInputControl:function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, event){
                switch(keyCode){
                    case cc.KEY.a:
                        self.dir = self.dirLeft;
                        self.curDirKey = keyCode;
                        self.leftBtnDown = true;
                        break;
                    case cc.KEY.d:
                        self.dir = self.dirRight;
                        self.curDirKey = keyCode;
                        self.rightBtnDown = true;
                        break;
                    case cc.KEY.w:
                        self.dir = self.dirUp;
                        self.curDirKey = keyCode;
                        self.upBtnDown = true;
                        break;
                    case cc.KEY.s:
                        self.dir = self.dirDown;
                        self.curDirKey = keyCode;
                        self.downBtnDown = true;
                        break;
                }
            },
            onKeyReleased:function(keyCode, event) {
                switch(keyCode){
                    case cc.KEY.a:
                        self.leftBtnDown = false;
                        break;
                    case cc.KEY.d:
                        self.rightBtnDown = false;
                        break;
                    case cc.KEY.w:
                        self.upBtnDown = false;
                        break;
                    case cc.KEY.s:
                        self.downBtnDown = false;
                        break;
                }
                if(self.curDirKey == keyCode){
                    self.dir = cc.Vec2.ZERO;
                    if(self.upBtnDown){
                        self.dir = self.dirUp;
                        self.curDirKey = cc.KEY.w;
                    }else if(self.downBtnDown){
                        self.dir = self.dirDown;
                        self.curDirKey = cc.KEY.s;
                    }else if(self.leftBtnDown){
                        self.dir = self.dirLeft;
                        self.curDirKey = cc.KEY.a;
                    }else if(self.rightBtnDown){
                        self.dir = self.dirRight;
                        self.curDirKey = cc.KEY.d;
                    }
                }
            }
        },self.node);
    },
});
