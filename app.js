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

    let calcTotal = function(type) {
        let sum = 0; 

        data.allItems[type].forEach(function(current) {
            sum += current.value; 
        });

        data.totals[type] = sum; 
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp:0,
            inc :0
        }, 
        budget: 0, 
        percentage: -1

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


        }, calculateBudget: function() {

            // calculate total income and expensens

            calcTotal('exp');
            calcTotal('inc');

            // calculate the budget: income - expenses

            data.budget = data.totals.inc - data.totals.exp;

            //calculate % of income spent 
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
            } else {
                data.percentage = -1;  
            }
            }, getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        testing: function() {
            console.log(data);
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
        expenseContainer: ' .expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

    return {
        getinput: function() {
            return {   
            type: document.querySelector(DOMStrings.inputType).value,
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
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
                
        }, emptyFields: function() {
            let fields = document.querySelectorAll(DOMStrings.inputDescription +', ' + DOMStrings.inputValue);
            let fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, i, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        }, displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
            
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

    let updateBudget = function() { 

        //calculate budget

        budgetCtrl.calculateBudget();

        //return budget 

        let budget = budgetCtrl.getBudget();

        //display the budget 

        uiCtrl.displayBudget(budget);
        
    }
    
    let ctrlAddItem = function() {
        let input, newItem; 
        // copy input 
        
        input = uiCtrl.getinput();   
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            
            // add item to budget controller 
            
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            
            //add the item to the ui & clear the fields
            
            uiCtrl.getListItem(newItem,input.type);
            uiCtrl.emptyFields(); 
            
            //calculate & update budget
            updateBudget();
        }
            
    }

   return {
        init: function() {
            console.log('hugyy!')
            setUpEventlisteners();
            updateBudget();
       }
   }
   
})(budgetController, uiController);

dataController.init();