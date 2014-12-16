var nums=[1,2,3,4,5,6,7,8,9,10];

var bubbleNums;
var bubbleList=[];
var bubbleSortAnimate=[];
var bubbleReset = false;
var bubbleSorting = false;

var insertionNums;
var insertionList=[];
var insertionAnimate=[];
var insertionReset = false;
var insertionSorting = false;

function initialize(){
  shuffle(nums);
  initialBubble();
  initialInsertion();
}

function initialBubble(){
  bubbleNums = nums.slice();
  for(i=0; i<10; i++){
    box = createBox("bubble",bubbleNums[i]);
	
    $('#bubble')[0].appendChild(box);
	boxMoveTo(box.id,i);
	bubbleList.push(box);
  }
}
function bubbleSort(){
  if(bubbleSorting)
	return;
  bubbleSorting=true;
  bubbleReset=false;
  bubbleSortAnimate=[];
  //algorithm
  for(var i=1; i<10; i++){
    for(var j=1; j<10-i+1; j++){
	  if(readValueFromBox(bubbleList[j])<readValueFromBox(bubbleList[j-1])){
	    swap(bubbleList, j, j-1);
		bubbleSortAnimate.push([readValueFromBox(bubbleList[j]),readValueFromBox(bubbleList[j-1]),j]);
	  }
	}
  }
  bubbleSortAnimate.reverse();
  bubbleAnimateStep();
}
function bubbleAnimateStep(){
  if(bubbleSortAnimate.length != 0 && bubbleReset != true){
	var ani = bubbleSortAnimate.pop();
	boxMoveTo("bubble_"+ani[0], ani[2]);
	boxMoveTo("bubble_"+ani[1], ani[2]-1);
    setTimeout(function(){ bubbleAnimateStep();}, 500);
  }else if(bubbleSortAnimate.length == 0){
    bubbleSorting = false;
  }
}
function bubbleShuffle(){
  bubbleReset=true;
  bubbleSorting=false;
  shuffle(bubbleNums);
  resetBubbleBox();
}
function resetBubbleBox(){
  bubbleReset=true;
  bubbleSorting=false;
  for(var i=0; i<10; i++){
    var name="bubble_" + bubbleNums[i];
	boxMoveTo(name, i);
	bubbleList[i] = document.getElementById(name);
  }
}

function initialInsertion(){
  insertionNums = nums.slice();
  for(i=0; i<10; i++){
    box = createBox("insertion",insertionNums[i]);
	
    $('#insertion')[0].appendChild(box);
	boxMoveTo(box.id,i);
	insertionList.push(box);
  }
}
function insertionSort(){
  if(insertionSorting)
	return;
  insertionSorting=true;
  insertionReset=false;
  insertionAnimate=[];
  //algorithm
  for(var i=1; i<10; i++){
    var key=insertionList[i];
	var animations=[];
	//insert key to 0 ~ i-1
	var insertIndex;
	for(insertIndex=i; insertIndex>0; insertIndex--){
	  if(readValueFromBox(insertionList[insertIndex-1])<readValueFromBox(key)){
	    break;
	  }
	}
	
	for(var j=i; insertIndex<j; j--){
	  animations.push([readValueFromBox(insertionList[j-1]),j]);
	  insertionList[j]=insertionList[j-1];
	}
	
	animations .push([readValueFromBox(key), insertIndex]);
	insertionList[insertIndex]=key;
	
	console.log("key:"+readValueFromBox(key)+","+"insertIndex:"+insertIndex);
	insertionAnimate.push(animations);
  }
  insertionAnimate.reverse();
  insertionAnimateStep();
}
function insertionAnimateStep(){
  if(insertionAnimate.length !=0 && insertionReset != true){
    var animations = insertionAnimate.pop();
	for(var i=0; i<animations.length; i++){
	  boxMoveTo("insertion_"+animations[i][0], animations[i][1]);
	}
    setTimeout(function(){ insertionAnimateStep();}, 500);
  }
}
function insertionShuffle(){
  insertionReset=true;
  insertionSorting=false;
  shuffle(insertionNums);
  resetInsertionBox();
}
function resetInsertionBox(){
  insertionReset=true;
  insertionSorting=false;
  for(var i=0; i<10; i++){
    var name="insertion_" + insertionNums[i];
	boxMoveTo(name, i);
	insertionList[i] = document.getElementById(name);
  }
}

function readValueFromBox(div){
  return parseInt(div.innerHTML);
}

function createBox(algo, text){
  var box=document.createElement("div");
  box.className="box";
  box.id=algo+"_"+text.toString();
  box.innerText=text;
  return box;
}

function boxMoveTo(id,index){
  var offset = 70*index;
  $('#'+id).transition({x:offset.toString()+'px'});
}

function shuffle(arr){
  for (i=0; i<10; i++)
	arr.sort(function(){return 0.5-Math.random();});
}

function swap(arr, i, j){
  var temp=arr[i];
  arr[i]=arr[j];
  arr[j]=temp;
}