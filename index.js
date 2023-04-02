let elements = [90, 64, 12, 80, 10];
const Items = document.getElementsByClassName("Item");
const RandomizeBtn = document.getElementById("Randomize");
const SolveBtn = document.getElementById("Solve");
const Parent = document.getElementsByClassName("parent");
const ArraySize = document.getElementById("ArraySize");
/*---------------add event listener to the slider to change the limit of array---------------- */
ArraySize.addEventListener("change", () => {
  document.getElementById("sliderValue").innerHTML =
    document.querySelector("#ArraySize").value;
});
/*-----------------------------------initialization have 5 items------------------------------------ */
Items[0].style.height = "410px";
Items[1].style.height = "306px";
Items[2].style.height = "98px";
Items[3].style.height = "370px";
Items[4].style.height = "90px";
/*---------------------------------generate array with size n that have random values----------------- */
const GenerateRandomArray=(size)=>{
    for(let i=0;i<size;i++){
        elements[i]=Math.floor(Math.random() * 100);
    }
}

/* -----------------to generate n items and generates item as div's---------------------- */
const Randomize = () => {
  const value = Number(document.querySelector("#ArraySize").value);
  for (let i = Parent[0].children.length - 2; i >= 0; i--) {
    let lastElementFirstTour = Parent[0].children[i];
    lastElementFirstTour.remove();
  }
  Items[0].style.backgroundColor = "blue";
  GenerateRandomArray(value);
  for (let i = 0; i < value; i++) { 
    document.getElementById("amount").style.fontSize = String(10 + 100.0 / value) + "px";
    document.getElementById("amount").innerHTML = elements[i];
    let temp = Items[0].cloneNode(true);
    temp.style.width = String(1300 / value) + "px";
    temp.style.height = String(elements[i] * 4 + 50) + "px";
    Parent[0].append(temp);
  }
  Parent[0].children[0].remove();
};
/*---------------------------------add event listener to randomize button-------------------------------- */
RandomizeBtn.addEventListener("click", Randomize);

/*-----------------------------change speed of animation------------------------------------------------- */
const Speed=()=>{
    let speed = document.getElementById('speed').value;
    if(speed>30) speed=30;
    if(speed<1)speed=1;
    document.getElementById('speed').value=speed;
    return speed
}

/*------------------------------------------swap two div's-------------------------------- */
const moveItem = async (Start, End) => {
  let obj1 = Parent[0].children[Start];
  let obj2 = Parent[0].children[End];

  var temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);
  
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      obj2.parentNode.insertBefore(obj1, obj2);
      temp.parentNode.insertBefore(obj2, temp);
      temp.parentNode.removeChild(temp);
      resolve("Done");
    }, 1000.0/Speed())
  );

};
/*--------------------------------some delay to show animations------------------------ */
const Wait = async () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
        resolve("Done");
    }, 1000.0/Speed())
  );
};

/*----------------change the color of on progress items------------------------------- */
const inProgress=(i,j)=>{
    Parent[0].children[i].style.backgroundColor = "green";
    Parent[0].children[j].style.backgroundColor = "green";
}
/*----------------change the color of passed items------------------------------- */
const visited=(i,j)=>{
    Parent[0].children[i].style.backgroundColor = "blue";
    Parent[0].children[j].style.backgroundColor = "blue";
}
/*----------------change the color of sorted items------------------------------- */
const Sorted=(i)=>{
    Parent[0].children[i].style.backgroundColor = "orange";
}

/*----------------------build bubble sorting algorithm------------------------------- */
const BubbleSort = async () => {
  SolveBtn.disabled = true;
  RandomizeBtn.disabled = true;
  ArraySize.disabled = true;
  for (let i = 0; i < elements.length; i++) {
    for (let j = 1; j < elements.length - i; j++) {
      inProgress(j-1,j);
      if (elements[j - 1] > elements[j]) {
        let temp = elements[j - 1];
        elements[j - 1] = elements[j];
        elements[j] = temp;
        swapped = true;
        await moveItem(j - 1, j);
      } 
        await Wait();
      
      visited(j-1,j);
      if (j == elements.length - i - 1){
        Sorted(j);
        await Wait();
      }
    }
  }
  Sorted(0);
  SolveBtn.disabled = false;
  RandomizeBtn.disabled = false;
  ArraySize.disabled = false;
};
/*-------------------------------add event listener to solve button--------------  */
SolveBtn.addEventListener("click", BubbleSort);
