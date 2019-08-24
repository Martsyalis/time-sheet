let firebaseConfig = {
  apiKey: "AIzaSyAyeT4ymoUzzGz7gI16AZ66PRWsYp3zLo0",
  authDomain: "time-sheet-class-35d3b.firebaseapp.com",
  databaseURL: "https://time-sheet-class-35d3b.firebaseio.com",
  projectId: "time-sheet-class-35d3b"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

$("#worker-form").submit(function(event) {
  event.preventDefault();
  let name = $("#input-name")
    .val()
    .trim();
  let role = $("#input-role")
    .val()
    .trim();
  let rate = $("#input-rate")
    .val()
    .trim();
  let date = $("#input-date")
    .val()
    .trim();
  let months = $("#input-months")
    .val()
    .trim();
  let momentedDate = moment(date).format("YYYY MM DD");
  let formObject = {
      name,
      role,
      rate,
      momentedDate,
      months,
  };
  database.ref().push(formObject);
});

database.ref().on('value', handleSnapshot)

function handleSnapshot(snapshot){
    console.log('snapshot', snapshot.val())
    $("#table-body").empty()
    let workers = snapshot.val();
    for(worker in workers){
        let workerObject = workers[worker];
        console.log(workerObject);
        let tr = $('<tr>');
        tr.append($('<td>').text(workerObject.name))
        tr.append($('<td>').text(workerObject.role))
        tr.append($('<td>').text(workerObject.momentedDate))
        tr.append($('<td>').text(workerObject.months))
        tr.append($('<td>').text(workerObject.rate))
        tr.append($('<td>').text(workerObject.rate * workerObject.months))

        $("#table-body").append(tr);
        
    }
}
