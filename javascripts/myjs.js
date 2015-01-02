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

var mergeNums;
var mergeList=[];
var mergeAnimate=[];
var mergeReset = false;
var mergeSorting = false;

function initialize(){
  shuffle(nums);
  initialBubble();
  initialInsertion();
  initialMerge();
}

function initialBubble(){
  bubbleNums = nums.slice();
  for(i=0; i<10; i++){
    box = createBox("bubble",bubbleNums[i]);
	
    $('#bubble')[0].appendChild(box);
	boxXMoveTo(box.id,i);
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
    boxXMoveTo(name, i);
    bubbleList[i] = document.getElementById(name);
    bubbleList[i].style.background = "green";
  }
}

function initialInsertion(){
  insertionNums = nums.slice();
  for(i=0; i<10; i++){
    box = createBox("insertion",insertionNums[i]);
	
    $('#insertion')[0].appendChild(box);
	boxXMoveTo(box.id,i);
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
    var animations=[];
    var insertIndex;
    for(insertIndex=i; insertIndex>0; insertIndex--){
      animations.push(["c", readValueFromBox(insertionList[insertIndex-1]), "brown"]);
      if(readValueFromBox(insertionList[insertIndex-1])<readValueFromBox(key)){
        animations.push(["c", readValueFromBox(insertionList[insertIndex-1]), "green"]);
        break;
      } 
      insertionAnimate.push(animations);
      animations=[];
      animations.push(["c", readValueFromBox(insertionList[insertIndex-1]), "green"]);
    }
    insertionAnimate.push(animations);
  
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
    boxXMoveTo(name, i);
    insertionList[i] = document.getElementById(name);
    insertionList[i].style.background = "green";
  }
}

function initialMerge(){
  mergeNums = nums.slice();
  for(i=0; i<10; i++){
    box = createBox("merge",insertionNums[i]);
	
    $('#merge')[0].appendChild(box);
	boxXMoveTo(box.id,i);
	mergeList.push(box);
  }
}
function mergeSortStart(){
  if(mergeSorting)
	return;
  mergeSorting=true;
  mergeReset=false;
  mergeAnimate=[];
  //algorithm
  mergeSort(0, mergeList.length-1);  
  
  mergeAnimate.reverse();
  mergeAnimateStep();
}
function mergeSort(start, end){
    //console.log("mergeSort: "+start+ ',' +end);
  if(start<end){
    var mid = Math.floor((start+end)/2);
	mergeSort(start, mid);
	mergeSort(mid+1, end);
    //console.log("mergeSort: "+start+ "," + mid + ',' +end);
	//console.log("before merge:");
	//console.log(mergeList);
	merge(start, mid+1, end);
	//console.log("after merge:");
	//console.log(mergeList);
  }
}
function merge(start, mid, end){
  var left = mergeList.slice(start, mid);
  var right = mergeList.slice(mid, end+1);
  var animations = [];
  for(i=0; i<left.length; i++){
    animations.push(["c", readValueFromBox(left[i]), "blue"]);
    animations.push(["y", readValueFromBox(left[i]), 1]);
  }
  for(i=0; i<right.length; i++){
    animations.push(["c", readValueFromBox(right[i]), "Brown"]);
    animations.push(["y", readValueFromBox(right[i]), 1]);
  }
  mergeAnimate.push(animations);
  animations=[];
  /*
  console.log("merge:" + start + "," + mid + "," + end);
  console.log("left:");
  console.log(left);
  console.log("right:");
  console.log(right);
  */
  left.reverse();
  right.reverse();
  for(var i=start; i<end+1; i++){
    if(left.length==0){
      mergeList[i] = right.pop();
    }else if(right.length==0){
      mergeList[i] = left.pop();
    }else{
      if(readValueFromBox(left[left.length-1])<readValueFromBox(right[right.length-1])){
        mergeList[i] = left.pop();
      }else {
        mergeList[i] = right.pop();
      }
    }
    animations.push(['xy', readValueFromBox(mergeList[i]), [i,2]]);
    mergeAnimate.push(animations);
    animations=[];
  }
  
  animations=[];
  for(i=start; i<=end; i++){
    animations.push(["c", readValueFromBox(mergeList[i]), "green"]);
    animations.push(["y", readValueFromBox(mergeList[i]), 0]);
  }
  mergeAnimate.push(animations);
  /*
  console.log("after:");
  console.log(mergeList.slice(start, end+1));
  
  while(left.length!=0 || right.length!=0){
	var l,r;
	if(left.length!=0)
	  l=left.pop();
	if(right.length!=0)
	  r=right.pop();
  }
  */
}

function mergeAnimateStep(){
  if(mergeAnimate.length !=0 && mergeReset != true){
    var animations = mergeAnimate.pop();
	for(var i=0; i<animations.length; i++){
	  handleAnimate("merge_", animations[i]);
	}
    setTimeout(function(){ mergeAnimateStep();}, 500);
  }
}
function mergeShuffle(){
  mergeReset=true;
  mergeSorting=false;
  shuffle(mergeNums);
  resetMergeBox();
}
function resetMergeBox(){
  mergeReset=true;
  mergeSorting=false;
  for(var i=0; i<10; i++){
    var name="merge_" + mergeNums[i];
    boxXMoveTo(name, i);
    boxYMoveTo(name, 0);
    mergeList[i] = document.getElementById(name);
    mergeList[i].style.background = "green";
  }
}

function handleAnimate(algo, arr){
  var name = algo + arr[1].toString();
  switch(arr[0]){
    case "x":
      boxXMoveTo(name, arr[2]);
      break;
    case "y":
      boxYMoveTo(name, arr[2]);
      break;
    case "xy":
      boxXYMoveTo(name, arr[2][0], arr[2][1]);
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

function boxXMoveTo(id,index){
  var offset = 70*index;
  $('#'+id).transition({x:offset.toString()+'px'});
}

function boxYMoveTo(id, index){
  var offset = 60*index;
  $('#'+id).transition({y:offset.toString()+'px'});
}

function boxXYMoveTo(id, index_x, index_y){
  var offset_x = 70*index_x;
  var offset_y = 60*index_y;
  $('#'+id).transition({x:offset_x.toString()+'px', y:offset_y.toString()+'px'});
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