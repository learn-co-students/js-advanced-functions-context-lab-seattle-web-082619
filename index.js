/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 let createEmployeeRecord = function(array) {
  const record = new Object();
  record.firstName = array[0];
  record.familyName = array[1];
  record.title = array[2];
  record.payPerHour = array[3];
  record.timeInEvents = [];
  record.timeOutEvents = [];
  return record;
}

let createEmployeeRecords = function(arrayOfArrays) {
  const recordsArray = [];
  for (const array of arrayOfArrays) {
    recordsArray.push(createEmployeeRecord(array))
  };
  return recordsArray
}

// add an Object with keys to the timeInEvents Array on the record Object:
// type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument
// date stamp ("YYYY-MM-DD HHMM")

let createTimeInEvent = function(dateTimeString) {
  let [date, hour] = dateTimeString.split(" ")

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })

  return this;
}


let createTimeOutEvent = function(dateTimeString) {
  let [date, hour] = dateTimeString.split(" ")

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })

  return this;
}

let hoursWorkedOnDate = function(dateString) {
  const dateHourIn = this.timeInEvents.find( timeInObj => {
    return timeInObj.date === dateString;
  }).hour;
  const dateHourOut = this.timeOutEvents.find( timeOutObj => {
    return timeOutObj.date === dateString;
  }).hour;
  return (dateHourOut - dateHourIn) / 100
}

let wagesEarnedOnDate = function(dateString) {
  const hours = hoursWorkedOnDate.call(this, dateString);
  return hours * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function(arrayOfRecords) {
  const allWages = []
  for (const record of arrayOfRecords) {
    allWages.push(allWagesFor.call(record))
  };
  const totalPayroll = allWages.reduce((sum, wagesTotal) => {
    return sum + wagesTotal;
  });
  return totalPayroll;
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(record) {
    return record.firstName === firstName;
  })
    }
