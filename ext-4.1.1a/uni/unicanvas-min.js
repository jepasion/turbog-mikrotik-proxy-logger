/*!
 * uniGUI Library extension for Ext JS
 * by Farshad Mohajeri  
 * Copyright(c) 2009-2012 FMSoft Inc.
 * info@fmsoft.net
 * http://www.unigui.com
 !*/
Ext.define("Ext.form.Canvas",{extend:"Ext.form.field.Base",xtype:"canvasfield",_c_:null,_cc_:null,_x:0,_y:0,_drawMode:false,_penDown:false,editable:false,allowSubmit:false,ownerForm:null,paintMode:0,brushColor:"#000000",dllPath:"/",ajxS:{},ajxF:{},initComponent:function(){Ext.form.Canvas.superclass.initComponent.call(this);this.addEvents("mousedown","mouseup","mousemove")},initCanvas:function(){if(!this._cc_){var b=document.getElementById(this.nm+"_canvas");if(b&&b.getContext){this._c_=b;this._cc_=b.getContext("2d");var a="createTouch" in document;if(a){this._c_.ontouchmove=this.ev_mousemove;this._c_.ontouchstart=this.ev_mousedown;this._c_.ontouchend=this.ev_mouseup}else{this._c_.onmousemove=this.ev_mousemove;this._c_.onmousedown=this.ev_mousedown;this._c_.onmouseup=this.ev_mouseup}this._c_.owner=this}else{this._cc_={}}}this.originalValue=this.getValue()},getXY:function(a){if(a.touches){if(a.targetTouches&&a.targetTouches[0]){var b=this.getPosition();this._x=a.targetTouches[0].pageX-b[0];this._y=a.targetTouches[0].pageY-b[1]}}else{if(a.layerX||a.layerX==0){this._x=a.layerX;this._y=a.layerY}else{if(a.offsetX||a.offsetX==0){this._x=a.offsetX;this._y=a.offsetY}}}return true},setLineWidth:function(a){if(this._c_){this._cc_.lineWidth=a}},setWH:function(a,b){if(this._c_){this._c_.width=a;this._c_.height=b}},setPaintMode:function(a){this.paintMode=a},setStrokeStyle:function(a){if(this._c_){this._cc_.strokeStyle=a}},setBrushColor:function(a){this.brushColor=a},penDown:function(){this._penDown=this.editable;if(this._c_&&this._penDown){this._cc_.beginPath();this._cc_.moveTo(this._x,this._y)}},circle:function(a,c,b){if(this._c_){this._cc_.beginPath();this._cc_.arc(a,c,b,0,2*Math.PI,false);this._cc_.fillStyle=this.brushColor;this._cc_.fill();this._cc_.stroke();this._cc_.closePath()}},rect:function(a,d,b,c){if(this._c_){this._cc_.beginPath();this._cc_.rect(a,d,b,c);this._cc_.fillStyle=this.brushColor;this._cc_.fill();this._cc_.stroke();this._cc_.closePath()}},penUp:function(){if(this._penDown){this._cc_.closePath()}this._penDown=false},ev_mousemove:function(a){var b=this.owner;if(b.getXY(a)){if(b._penDown){if(b.paintMode==0){b._cc_.lineTo(b._x,b._y);b._cc_.stroke()}}b.fireEvent("mousemove",b,b._x,b._y)}},ev_mousedown:function(a){var b=this.owner;if(b.getXY(a)){if(b.paintMode==0){b.penDown()}else{if(b.paintMode==1){b.floodFill(b._x,b._y)}}b.fireEvent("mousedown",b,b._x,b._y)}},ev_mouseup:function(a){var b=this.owner;b.penUp();if(b.getXY(a)){b.fireEvent("mouseup",b,b._x,b._y)}},submitData:function(){var b=this.allowSubmit;this.allowSubmit=true;try{this.ldMask=true;this.maskMsg="Submitting Canvas...";this.targetObj=this.ownerForm;Ext.Ajax.request({url:this.dllPath+"HandleEvent",params:"Ajax=1&IsEvent=1&Obj="+this.nm+"&Evt=submit"+_gv_(this.ownerForm),success:this.ajxS,failure:this.ajxF,obj:this})}catch(c){}finally{this.ldMask=false;this.allowSubmit=b}},clear:function(f,g,i){if(this._c_){var e=this._cc_.strokeStyle;var d=this._cc_.fillStyle;try{this._cc_.beginPath();this._cc_.strokeStyle=i;this._cc_.rect(0,0,f,g);this._cc_.fillStyle=i;this._cc_.fill();this._cc_.stroke();this._cc_.closePath()}finally{this._cc_.strokeStyle=e;this._cc_.fillStyle=d}_rsov_(this,0)}},rectangle:function(a,d,b,c){if(this._c_){this._cc_.rect(a,d,b,c);this._cc_.stroke()}},fill:function(a){if(this._c_){this._cc_.fillStyle=a;this._cc_.fill();this._cc_.stroke()}},floodFill:function(c,j){function i(b){return(b.charAt(0)==="#")?b.substring(1,7):b}if(this._c_){var d=this.brushColor;var f=parseInt((i(d)).substring(0,2),16);var e=parseInt((i(d)).substring(2,4),16);var a=parseInt((i(d)).substring(4,6),16);_ff_(c,j,this._cc_,this.width,this.height,{Red:f,Green:e,Blue:a})}},moveTo:function(a,b){if(this._c_){this._cc_.moveTo(a,b);this._x=a;this._y=b}},lineTo:function(a,b){if(this._c_){this._cc_.beginPath();this._cc_.lineTo(a,b);this._cc_.lineTo(this._x,this._y);this._cc_.stroke();this._cc_.closePath();this._x=a;this._y=b}},getValue:function(){var a="";if(this._c_&&this._c_.toDataURL){a=this._c_.toDataURL()}return(a)},setValue:function(d){if(this._c_){var c=new Image();try{var a=this._cc_;c.onload=function(){a.drawImage(c,0,0)};c.src=d}catch(b){alert("Canvas: "+b)}}},isDirty:function(){if(!this.allowSubmit||this.disabled||!this.rendered){return false}var a=String(this.getValue())!==String(this.originalValue);return a},afterRender:function(){Ext.form.Field.superclass.afterRender.call(this);this.originalValue=this.getValue()}});function _ff_(q,p,f,r,b,m){var a=[[q,p]];var s=f.getImageData(0,0,r,b);var c=(q+p*r)*4;var u=s.data[c];var h=s.data[c+1];var j=s.data[c+2];function o(y){var x=s.data[y];var w=s.data[y+1];var v=s.data[y+2];return(x==u&&w==h&&v==j)}function e(v){s.data[v]=m.Red;s.data[v+1]=m.Green;s.data[v+2]=m.Blue;s.data[v+3]=255}while(a.length){var d,l,k,t,i,g;var n=0;d=a.pop();l=d[0];k=d[1];t=(k*r+l)*4;if(u==m.Red&&h==m.Green&&j==m.Blue){return}while(k-->=n&&o(t)){t-=r*4}t+=r*4;++k;i=false;g=false;while(k++<b-1&&o(t)){e(t);if(l>0){if(o(t-4)){if(!i){a.push([l-1,k]);i=true}}else{if(i){i=false}}}if(l<r-1){if(o(t+4)){if(!g){a.push([l+1,k]);g=true}}else{if(g){g=false}}}t+=r*4}f.putImageData(s,0,0)}};