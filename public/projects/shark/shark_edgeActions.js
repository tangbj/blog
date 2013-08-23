/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         // insert code to be run when the composition is fully loaded here
         var randX;
         var randY;
         
         function randomNumbers() {
         	randX = Math.floor(Math.random() * 300) + 200;
         	randY = Math.floor(Math.random() * 150) + 200;
         	moveMe();
         }
         randomNumbers();
         
         function moveMe() {
         	sym.$('shark').animate({left: randX, top: randY}, 1000, randomNumbers);
         }
         
         var sound = new Audio();
         sound.src = 'sounds/shark.mp3';
         sound.play();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2000, function(sym, e) {
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4000, function(sym, e) {
         sym.play('seq1');
         // insert code here

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'shark'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2000, function(sym, e) {
         sym.play('puff');
         
         // insert code here

      });
      //Edge binding end

   })("shark");
   //Edge symbol end:'shark'

})(jQuery, AdobeEdge, "EDGE-69840952");