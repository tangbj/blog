/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'shark',
            type:'rect',
            rect:['218px','185px','auto','auto','auto','auto']
         }],
         symbolInstances: [
         {
            id:'shark',
            symbolName:'shark'
         }
         ]
      },
   states: {
      "Base State": {
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '800px'],
            ["style", "height", '700px'],
            ["style", "overflow", 'hidden']
         ],
         "${_shark}": [
            ["style", "top", '185px'],
            ["transform", "scaleY", '0.9'],
            ["style", "left", '218px'],
            ["transform", "scaleX", '0.9']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 4000,
         autoPlay: true,
         labels: {
            "seq1": 0
         },
         timeline: [
            { id: "eid67", tween: [ "transform", "${_shark}", "scaleX", '2', { fromValue: '0.9'}], position: 0, duration: 2000 },
            { id: "eid76", tween: [ "transform", "${_shark}", "scaleX", '0.9', { fromValue: '2'}], position: 2000, duration: 2000 },
            { id: "eid72", tween: [ "transform", "${_shark}", "scaleY", '2', { fromValue: '0.9'}], position: 0, duration: 2000 },
            { id: "eid78", tween: [ "transform", "${_shark}", "scaleY", '0.9', { fromValue: '2'}], position: 2000, duration: 2000 }         ]
      }
   }
},
"shark": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      rect: ['-280px','-244px','800px','696px','auto','auto'],
      id: 'shark',
      transform: [[],[],[],['0.3','0.3']],
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/shark.png','0px','0px']
   },
   {
      rect: ['1332px','218px','900px','393px','auto','auto'],
      transform: [[],[],[],['0.12411','0.1']],
      id: 'cigar',
      fill: ['rgba(0,0,0,0)','images/cigar.png','0px','0px'],
      type: 'image',
      tag: 'img'
   },
   {
      rect: ['-219px','-119px','284px','400px','auto','auto'],
      id: 'smoke',
      transform: [[],[],[],['0.3','0.3']],
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/smoke.png','0px','0px']
   },
   {
      rect: ['146px','88px','11px','12px','auto','auto'],
      borderRadius: ['50%','50%','50%','50%'],
      id: 'Right_Eye',
      stroke: [0,'rgba(0,0,0,1)','none'],
      type: 'ellipse',
      fill: ['rgba(255,0,0,0.46)']
   },
   {
      rect: ['78px','89px','11px','12px','auto','auto'],
      borderRadius: ['50%','50%','50%','50%'],
      id: 'Left_Eye',
      stroke: [0,'rgba(0,0,0,1)','none'],
      type: 'ellipse',
      fill: ['rgba(255,0,0,0.46)']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Left_Eye}": [
            ["color", "background-color", 'rgba(255,0,0,0.00)'],
            ["style", "left", '78px'],
            ["style", "top", '89px']
         ],
         "${symbolSelector}": [
            ["style", "height", '209px'],
            ["style", "width", '240px']
         ],
         "${_shark}": [
            ["style", "top", '-244px'],
            ["transform", "scaleX", '0.3'],
            ["transform", "scaleY", '0.3'],
            ["style", "left", '-280px']
         ],
         "${_Right_Eye}": [
            ["color", "background-color", 'rgba(255,0,0,0.00)'],
            ["style", "left", '146px'],
            ["style", "top", '88px']
         ],
         "${_smoke}": [
            ["style", "top", '-102px'],
            ["transform", "scaleY", '0.3'],
            ["transform", "scaleX", '0.3'],
            ["style", "opacity", '1'],
            ["style", "left", '-223px']
         ],
         "${_cigar}": [
            ["style", "top", '84px'],
            ["transform", "scaleY", '0.1'],
            ["transform", "rotateZ", '0deg'],
            ["transform", "scaleX", '0.12411'],
            ["style", "left", '-803px'],
            ["style", "-webkit-transform-origin", [97.07,15.44], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [97.07,15.44],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [97.07,15.44],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [97.07,15.44],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [97.07,15.44],{valueTemplate:'@@0@@% @@1@@%'}]
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 2000,
         autoPlay: true,
         labels: {
            "puff": 0
         },
         timeline: [
            { id: "eid60", tween: [ "color", "${_Right_Eye}", "background-color", 'rgba(255,0,0,0.27)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,0,0,0.00)'}], position: 0, duration: 1000 },
            { id: "eid61", tween: [ "color", "${_Right_Eye}", "background-color", 'rgba(255,0,0,0.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,0,0,0.27)'}], position: 1000, duration: 1000 },
            { id: "eid62", tween: [ "color", "${_Left_Eye}", "background-color", 'rgba(255,0,0,0.27)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,0,0,0.00)'}], position: 0, duration: 1000 },
            { id: "eid63", tween: [ "color", "${_Left_Eye}", "background-color", 'rgba(255,0,0,0.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,0,0,0.27)'}], position: 1000, duration: 1000 },
            { id: "eid25", tween: [ "transform", "${_smoke}", "scaleY", '0.5', { fromValue: '0.3'}], position: 0, duration: 1000 },
            { id: "eid40", tween: [ "transform", "${_smoke}", "scaleY", '0.3', { fromValue: '0.5'}], position: 1000, duration: 1000 },
            { id: "eid39", tween: [ "transform", "${_smoke}", "scaleY", '0.5', { fromValue: '0.3'}], position: 2000, duration: 0 },
            { id: "eid14", tween: [ "transform", "${_cigar}", "rotateZ", '10deg', { fromValue: '0deg'}], position: 0, duration: 1000 },
            { id: "eid30", tween: [ "transform", "${_cigar}", "rotateZ", '0deg', { fromValue: '10deg'}], position: 1000, duration: 1000 },
            { id: "eid42", tween: [ "style", "${_smoke}", "opacity", '0', { fromValue: '1'}], position: 1000, duration: 1000 },
            { id: "eid21", tween: [ "style", "${_smoke}", "left", '-248px', { fromValue: '-223px'}], position: 0, duration: 1000 },
            { id: "eid34", tween: [ "style", "${_smoke}", "left", '-223px', { fromValue: '-248px'}], position: 1000, duration: 1000 },
            { id: "eid24", tween: [ "transform", "${_smoke}", "scaleX", '0.5', { fromValue: '0.3'}], position: 0, duration: 1000 },
            { id: "eid38", tween: [ "transform", "${_smoke}", "scaleX", '0.3', { fromValue: '0.5'}], position: 1000, duration: 1000 },
            { id: "eid37", tween: [ "transform", "${_smoke}", "scaleX", '0.5', { fromValue: '0.3'}], position: 2000, duration: 0 },
            { id: "eid22", tween: [ "style", "${_smoke}", "top", '-159px', { fromValue: '-102px'}], position: 0, duration: 1000 },
            { id: "eid33", tween: [ "style", "${_smoke}", "top", '-102px', { fromValue: '-159px'}], position: 1000, duration: 1000 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-69840952");
