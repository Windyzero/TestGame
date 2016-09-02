cc.Class({
    extends: cc.Component,

    properties: {
        // canvas: {
        //     default: null,
        //     type: cc.Canvas
        // },
        maxSize: cc.size(1136, 768),
    },

    // use this for initialization
    onLoad: function () {
        // if(!this.canvas){
        //     return;
        // }

        var size = cc.view.getFrameSize();
        var ratio = size.width / size.height;
        var designSize = {};
//        this.minSize = this.canvas.designResolution;
        this.minSize = cc.view.getDesignResolutionSize();
        cc.log(this.minSize)
        if(ratio > this.maxSize.width / this.minSize.height){
            //宽高比已经超出最大宽度配最小高度，则高度取最小，宽度拉伸
            designSize.height = this.minSize.height;
            designSize.width = this.maxSize.width;
        }else if(ratio > this.minSize.width / this.minSize.height){
            designSize.height = this.minSize.height;
            designSize.width = designSize.height * ratio;
        }else if(ratio > this.minSize.width / this.maxSize.height){
            designSize.width = this.minSize.width;
            designSize.height = designSize.width / ratio;
        }else{
            designSize.width = this.minSize.width;
            designSize.height = this.maxSize.height;
        }
        cc.log("width = " + designSize.width + ", height = " + designSize.height);
        cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.EXACT_FIT);
    },
});
