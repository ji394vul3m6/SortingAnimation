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
  var animations=[]
  //algorithm
  for(var i=1; i<10; i++){
    for(var j=1; j<10-i+1; j++){
	  var ani=[];
	  ani.push(["c", readValueFromBox(bubbleList[j]), "blue"]);
	  ani.push(["c", readValueFromBox(bubbleList[j-1]), "blue"]);
	  if(readValueFromBox(bubbleList[j])<readValueFromBox(bubbleList[j-1])){
		ani.push(["x", readValueFromBox(bubbleList[j]), j-1]);
		ani.push(["x", readValueFromBox(bubbleList[j-1]), j]);
	    swap(bubbleList, j, j-1);
	  }
	  bubbleSortAnimate.push(ani);
	  ani=[];
	  ani.push(["c", readValueFromBox(bubbleList[j]), "green"]);
	  ani.push(["c", readValueFromBox(bubbleList[j-1]), "green"]);
	  bubbleSortAnimate.push(ani);
	}
  }
  bubbleSortAnimate.reverse();
  bubbleAnimateStep();
}
function bubbleAnimateStep(){
  if(bubbleSortAnimate.length != 0 && bubbleReset != true){
	var ani = bubbleSortAnimate.pop();
	for(var i=0; i<ani.length; i++){
	  handleAnimate("bubble_", ani[i]);
	}
	//boxMoveTo("bubble_"+ani[0], ani[2]);
	//boxMoveTo("bubble_"+ani[1], ani[2]-1);
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
  bubbleSortAnimate=[];
  for(var i=0; i<10; i++){
    var name="bubble_" + bubbleNums[i];
	boxMoveTo(name, i);
	bubbleList[i] = document.getElementById(name);
	bubbleList[i].style.background = "green";
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
	animations.push(["c", readValueFromBox(key), "blue"]);
	insertionAnimate.push(animations);
	//insert key to 0 ~ i-1
	var insertIndex;
	for(insertIndex=i; insertIndex>0; insertIndex--){
	  if(readValueFromBox(insertionList[insertIndex-1])<readValueFromBox(key)){
	    break;
	  }
	}
	
	var animations=[];
	for(var j=i; insertIndex<j; j--){
	  animations.push(["x",readValueFromBox(insertionList[j-1]),j]);
	  insertionList[j]=insertionList[j-1];
	}
	
	animations.push(["x",readValueFromBox(key), insertIndex]);
	insertionList[insertIndex]=key;
	
	console.log("key:"+readValueFromBox(key)+","+"insertIndex:"+insertIndex);
	insertionAnimate.push(animations);
	animations=[]
	animations.push(["c", readValueFromBox(key), "green"]);
	insertionAnimate.push(animations);
  }
  insertionAnimate.reverse();
  insertionAnimateStep();
}
function insertionAnimateStep(){
  if(insertionAnimate.length !=0 && insertionReset != true){
    var animations = insertionAnimate.pop();
	for(var i=0; i<animations.length; i++){
	  //boxMoveTo("insertion_"+animations[i][0], animations[i][1]);
	  handleAnimate("insertion_", animations[i]);
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

function handleAnimate(algo, arr){
  var name = algo + arr[1].toString();
  switch(arr[0]){
    case "x":
	  boxMoveTo(name, arr[2]);
	  break;
    case "y":
	  break;
    case "xy":
	  break;
    case "r_x":
	  break;
    case "r_y":
	  break;
    case "c":
	  boxColorTo(name, arr[2]);
	  break;
  };
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

function boxColorTo(id, color){
  $('#'+id).css({background:color});
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