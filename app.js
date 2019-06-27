let budgetController = (function() {


})();

let uiController = (function (){

})();

let dataController = (function (budgetCtrl, uiCtrl){

    let ctrlAddItem = function() {
        // copy input 

        // add item to budget controller 

        //add the item to the ui 

        //calculate budget

        //display the budget 
        console.log('jihuu')
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem); 

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which ===13) {
            ctrlAddItem();

        }
    })
})(budgetController, uiController);