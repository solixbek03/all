let elForm = document.querySelector(".site-form");
let elText = document.querySelector(".form-text");
let elResult = document.querySelector(".result");


elForm.addEventListener("submit", function(evt) {
  evt.preventDefault();

  let elTextVall = elText.value;
  // let array =[];

  // array.push(elTextVall);

  
  function getLongestString(elTextVall){
    var wordsArray =elTextVall.split(" ")

    var longestString = elTextVall[0];
    for (var i=0; i<elTextVall.length; i++){
      if (elTextVall[i].length > longestString.length){
        longestString = elTextVall[i];
      }
    }
    return longestString;
  };

  elResult.textContent=(getLongestString(elTextVall))

});

var arrayOfStrings = ["This","is","a","list","of","some","short","and","some","longer","strings"];



