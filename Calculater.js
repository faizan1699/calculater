(function myCalculator() {
    /*Hook up buttons*/
    //Save the buttons that make up the calculator keys as an array
    const keys = document.getElementsByTagName("button");
    //Loop through them and assign a click handler so something happens when they are clicked. Using ECMA6 "for...of" instead of older indexed loop.
    for (const key of keys) {
        key.onclick = handleClick;
    }
    //Declare and initialize variables
    //Save the output paragraph as a variable because I'm going to use it constantly
    const output = document.getElementById("output");
    let numOut = "", //number input before operator
        numOutNew = "", //number input after operator
        op = "", //operator
        int = 0; //calculation result;

    //Click function for the buttons
    function handleClick() {
        let num = this.innerText; //when a button is pressed we get its value, which could be a number, a math operator or the "C" key, which clears the calculator
        if (this.classList.contains("number")) {//Input is a number or the decimal point
            numOut += num; //as long as user is not pressing an operation key we concatenate the input to keep building the number with each digit entered
            output.value = numOut; //then send it to the output screen
        } else {
            //The user has chosen a calculation, so we do run the calculation function
            doCalc(num);//"num" here is an operator, like "*" or "C"
        }
    }
    //When the calculation is finished or if the math breaks from bad key input we have to clear the calculator
    function doClear() {
        output.value = "";
        numOut = "";
        numOutNew = "";
        op = "";
        int = 0;
    }

    //Calculation function
    function doCalc(calc) {
        //pass in an operator This was the "num" value from the handleClick function
        if (calc === "C") {//clear calculator
            doClear();
        }
        // numOutNew is assigned the value of the first number the user inputs AFTER an operator key is pressed and this function runs. If it is empty, then this is the first time we're getting an operator and we don't have enough numbers to do math. If it is not empty we are have received the second number and a second operator has been clicked, "=" for example.
        else if (numOutNew !== "") {
            numOut = parseFloat(numOut); //convert input from string to number
            switch (op) {
                case "/":
                    if (numOut !== 0) {
                        int = numOutNew / numOut;//divide
                    } else {
                        int = "error";//division by zero is not allowed
                    }
                    break;
                case "*":
                    int = numOutNew * numOut;//multiply
                    break;
                case "-":
                    int = numOutNew - numOut;//subtract
                    break;
                case "+":
                    int = numOutNew + numOut;//add
                    break;
                case "=":
                    int = parseFloat(output.value);//When "=" is clicked the previous operator's calculation is done and we just have to save that result for next time, in case the user continues to do more operations to their total. The result of the previous operation was put in the output field, so we get it from there.
                    break;
            }
            if (isNaN(int)) {//if we tried to do an operation without two numbers, for example ". / 3"
                output.value = "error";//show the user "error" instead of garbage output
                setTimeout(function () {
                    doClear();
                }, 2000);//does doClear after 2 seconds and the error message disappears
            } else {
                output.value = int; //Show the result
                numOutNew = int; //Save the result as the first number for the next calculation if the user chains calculations
            }
        } else if (numOut !== "") {
            //If I didn't have to doClear for a NaN result I will have a numeric value
            numOutNew = parseFloat(numOut); //The user has used an operator for the first time and we need to store the first number input until we get the second one and can use the operator
        }
        op = calc; //We store the operator that was passed into this function to use after the we get the second number
        numOut = ""; //Clear the input variable to reuse for the next number
    }

})();