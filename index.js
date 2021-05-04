// Your code here

function createEmployeeRecord(arrayEmployee) {
    let employeeRecord = {
        firstName: arrayEmployee[0],
        familyName: arrayEmployee[1],
        title: arrayEmployee[2],
        payPerHour: arrayEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayRecord) {
    let newRecord = arrayRecord.map(function(arrayEmployee){
      return createEmployeeRecord(arrayEmployee);
    })
    return newRecord;
}

function createTimeInEvent(employeeObj, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateStamp) {
    let dayIn = employeeObj.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let dayOut = employeeObj.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })

    let hoursWorked = (dayOut.hour - dayIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObj, dateStamp) {
    let payOwed = employeeObj.payPerHour * hoursWorkedOnDate(employeeObj,dateStamp);
    return payOwed;
}

function allWagesFor(employeeObj) {
    let employeeDates = employeeObj.timeInEvents.map(e => {
                        return e.date
                        })
    let payOwedAllDates = employeeDates.reduce((count, pay) => count + wagesEarnedOnDate(employeeObj,pay), 0);
    return payOwedAllDates;
}

function findEmployeeByFirstName(srcArray,firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}

function calculatePayroll(employeeObj) {
    let payRoll = employeeObj.reduce((count, pay) => count + allWagesFor(pay), 0);
    return payRoll;
}
