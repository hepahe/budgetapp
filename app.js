let budgetController = (function() {

    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            expenses:0,
            incomes:0
        }

    };  

    return {

        addItem: function(type, des, val) {
            let newItem, id; 

            //create new id
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length -1].id + 1; 
            } else {
                id = 0; 
            }

            //create new item based on type 
            if (type === 'exp') {
                newItem =  new Expense (id,des,val);
            } else if (type === 'inc') {
                newItem = new Income(id, des,val);
            }

            //add created item to the array
            data.allItems[type].push(newItem);

            //return the new element
            return newItem; 


        },
        testing: function() {
            //console.log(data);
        }
    };

})();


let uiController = (function (){
    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: ' .expenses__list'
    }

    return {
        getinput: function() {
            return {   
            type: document.querySelector(DOMStrings.inputType).value,
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: document.querySelector(DOMStrings.inputValue).value
            };
        }, getDOMStrings: function() {
            return DOMStrings; 
        }, getListItem: function(obj, type) {
                //create HTML string with placeholder text
                let html, newHTML, element;
                if (type === 'inc') {
                    element = DOMStrings.incomeContainer; 
                    html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                } else if (type === 'exp') {
                    element = DOMStrings.expenseContainer; 
                    html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                }
                    //replace placeholder text with data 
                newHTML = html.replace('%id%',obj.id);
                newHTML = newHTML.replace('%description%',obj.description);
                newHTML = newHTML.replace('%value%', obj.value); 
                 
                //insert html into the dom 
                document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
                
        }, emptyFields() {
            let fields = document.querySelectorAll(DOMStrings.inputDescription +', ' + DOMStrings.inputValue);
            let fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, i, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        }
    }

})();

let dataController = (function (budgetCtrl, uiCtrl){

    let setUpEventlisteners = function() {
        let DOMStrings = uiCtrl.getDOMStrings();       
        document.querySelector(DOMStrings.addButton).addEventListener('click', ctrlAddItem); 

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which ===13) {
                ctrlAddItem();
    
            }
        });
    }
    
    let ctrlAddItem = function() {
        let input, newItem; 
        
        // copy input 

        input = uiCtrl.getinput();   

        // add item to budget controller 

        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //add the item to the ui & clear the fields

        uiCtrl.getListItem(newItem,input.type);
        uiCtrl.emptyFields(); 

        //calculate budget

        //display the budget 
        console.log(input);
    }

   return {
        init: function() {
            console.log('hugyy!')
            setUpEventlisteners();
       }
   }
   
})(budgetController, uiController);

dataController.init();