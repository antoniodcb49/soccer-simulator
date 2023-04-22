import { SoccerLeague } from "./SoccerLeagues.js";
import { soccerLeaguesInfo } from "./LeaguesInfo.js";

let league = null;
let schedule = null;
let standings = null;
let leagueSelected = false;

function createLeague(soccerLeagueInfo) {
  //Format for soccerLeagueInfo:
  // [country, name, teams, roundRobin, numChampions, numSecondary, numRelegations]
  league = new SoccerLeague(soccerLeagueInfo);
  leagueSelected = true;

  document.getElementById("teams").innerHTML = "";
  document.getElementById("schedule").innerHTML =
    "League Selected: " +
    soccerLeagueInfo[0] +
    " (" +
    soccerLeagueInfo[1] +
    ")";

  schedule = league.createSchedule();
  standings = league.createStandings();
  printStandings();
}

let dropdownLeagues = document.querySelectorAll(".create-league");

dropdownLeagues.forEach((league) =>
  league.addEventListener("click", (event) => {
    createLeague(soccerLeaguesInfo[league.id + "League"]);
  })
);

function simulateNextWeek() {
  if (!leagueSelected) {
    alert("Select a league");
    return;
  }

  if (!league.simulated) {
    league.simulateNextWeek();
    standings = league.createStandings();
    printWeek(league.currentWeek);
    printStandings();
    printGoalAvg();
  }
}

document
  .getElementById("sim-next-week")
  .addEventListener("click", simulateNextWeek);

function simulateSeason() {
  if (!leagueSelected) {
    alert("Select a league");
    return;
  }

  while (!league.simulated) {
    league.simulateNextWeek();
  }
  standings = league.createStandings();
  printSchedule();
  printStandings();
}

document.getElementById("sim-season").addEventListener("click", simulateSeason);

function printSchedule() {
  if (!leagueSelected) {
    alert("Select a league");
    return;
  }

  let schedString = "";
  document.getElementById("schedule").innerHTML = "";

  for (let week in schedule) {
    schedString = "<span>Week " + (+week + 1) + "</span><br>";

    for (let game of schedule[week]) {
      let gameString = game.toString();

      //If either team is <BYE>, it won't be printed
      if (!gameString.includes("<BYE>")) {
        schedString += game.toString() + "<br>";
      }
    }
    schedString += "<br>";
    let weekSched = document.createElement("div");
    weekSched.innerHTML = schedString;
    weekSched.setAttribute("class", "week-sched col-sm-12 col-md-6 col-lg-4");
    document.getElementById("schedule").appendChild(weekSched);
    changeTab("standings", "schedule");
  }
}
document.getElementById("print-sched").addEventListener("click", printSchedule);

let printTeamSchedule = function (teamToPrint) {
  let schedElement = document.getElementById("schedule");
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");
  let weekCount = 0;

  for (let week of schedule) {
    let schedString = "";
    let tableRow = document.createElement("tr");
    let weekCell = document.createElement("td");
    let weekTextNode = document.createTextNode(weekCount + 1);
    weekCell.appendChild(weekTextNode);
    tableRow.appendChild(weekCell);

    for (let game of week) {
      let gameString = game.toString();
      let gameCell = document.createElement("td");

      if (gameString.includes(teamToPrint)) {
        if (gameString.includes("<BYE>")) {
          schedString += "Bye Week";
        } else {
          schedString += gameString;
        }
        let gameTextNode = document.createTextNode(schedString);
        gameCell.appendChild(gameTextNode);
        tableRow.appendChild(gameCell);
      }
    }
    tableBody.appendChild(tableRow);
    weekCount++;
  }
  schedElement.innerHTML = "<br><h4>" + teamToPrint + "</h4>";
  table.appendChild(tableBody);
  table.setAttribute("class", "table team-schedule-table");

  let scheduleDiv = document.createElement("div");
  scheduleDiv.setAttribute("class", "col-6");
  scheduleDiv.appendChild(table);
  schedElement.appendChild(scheduleDiv);

  let pictureDiv = document.createElement("div");
  pictureDiv.setAttribute("class", "col-6");

  let teamImage = getTeamImage(teamToPrint, "sched-image");
  pictureDiv.appendChild(teamImage);
  schedElement.appendChild(pictureDiv);

  changeTab("standings", "schedule");
};

let printWeek = function (weekToPrint) {
  if (!leagueSelected) {
    alert("Select a league");
    return;
  }

  if (weekToPrint == null)
    do {
      weekToPrint = prompt(
        `Enter a week (between 1 and ${schedule.length})`,
        1
      );
      if (weekToPrint == null) return;
    } while (weekToPrint <= 0 || weekToPrint > schedule.length);

  let weekString = "<span>Week " + weekToPrint + "</span>";

  for (let game of schedule[weekToPrint - 1]) {
    let gameString = game.toString();

    //If either team is <BYE>, it won't be printed
    if (!gameString.includes("<BYE>")) {
      weekString += gameString + "<br>";
    }
  }

  weekString += "<br>";

  document.getElementById("schedule").innerHTML = weekString;
  changeTab("standings", "schedule");
};

document
  .getElementById("print-week")
  .addEventListener("click", function (event) {
    printWeek(null);
  });

function printStandings() {
  if (!leagueSelected) {
    alert("Select a league");
    return;
  }
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");
  let header = ["Pos", "Team", "GP", "W", "D", "L", "GF", "GA", "GD", "PTS"];
  let headerRow = document.createElement("tr");

  for (let statName of header) {
    let headerCell = document.createElement("th");
    let cellText = document.createTextNode(statName);
    headerCell.appendChild(cellText);
    headerRow.appendChild(headerCell);
  }

  tableBody.appendChild(headerRow);

  let relegationZone = standings.length - league.numRelegations;
  for (let r = 0; r < standings.length; r++) {
    let row = document.createElement("tr");

    for (let c = 0; c < 10; c++) {
      let cell = document.createElement("td");
      let teamStr = standings[r][c];
      let cellTextNode = document.createTextNode(` ${teamStr}`);

      if (c == 1) {
        let id = String(teamStr.toLowerCase()).replaceAll(" ", "-");
        cell.setAttribute("id", id);
        cell.setAttribute("class", "team-name");

        let teamPic = getTeamImage(teamStr, "standings-image");
        cell.appendChild(teamPic);
      }
      cell.appendChild(cellTextNode);
      row.appendChild(cell);
    }

    if (r >= relegationZone) row.setAttribute("class", "table-danger");

    if (
      r == Math.trunc(relegationZone) &&
      row.getAttribute("class") != "table-danger"
    )
      row.setAttribute("class", "table-warning");

    if (r < league.numChampions) row.setAttribute("class", "table-info");
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  document.getElementById("teams").innerHTML = "";
  table.setAttribute("border", "1");
  table.setAttribute("id", "standings");
  table.setAttribute("class", "table table-dark");
  document.getElementById("teams").appendChild(table);

  delegate(table, ".team-name", "click", (teamStr) => {
    printTeamSchedule(teamStr);
  });
  printGoalAvg();
}

document
  .getElementById("print-stand")
  .addEventListener("click", printStandings);

function printGoalAvg() {
  document.getElementById("goals-avg").innerHTML =
    "Goals scored: " +
    league.numGoals +
    "<br>Goals per game: " +
    league.goalsPerGame();
}

function clearInfo() {
  document.getElementById("schedule").innerHTML = "";
  let countryLeague = league.country + " (" + league.leagueName + ")";
  if (leagueSelected) {
    document.getElementById("schedule").innerHTML =
      "League Selected: " + countryLeague;
  }
  document.getElementById("teams").innerHTML = "";
  document.getElementById("goals-avg").innerHTML = "";
}
document.getElementById("clear-info").addEventListener("click", clearInfo);

/* -- Helper Functions -- */
function changeTab(oldTab, newTab) {
  document
    .getElementById(newTab + "-pane")
    .setAttribute("class", "tab-pane fade show active");
  document
    .getElementById(newTab + "-tab")
    .setAttribute("class", "nav-link active");
  document
    .getElementById(oldTab + "-pane")
    .setAttribute("class", "tab-pane fade");
  document.getElementById(oldTab + "-tab").setAttribute("class", "nav-link");
}

function getTeamImage(teamName, imgClass) {
  let imageId = String(teamName.toLowerCase()).replaceAll(" ", "-");
  let image = document.createElement("img");
  image.setAttribute(
    "src",
    "./images/Team Logos/" + league.country + " league/" + imageId + ".png"
  );

  if (imgClass) image.setAttribute("class", imgClass);
  image.setAttribute("alt", teamName);

  return image;
}

function delegate(el, selector, eventKey, handler) {
  el.addEventListener(eventKey, (event) => {
    if (event.target.matches(selector)) {
      handler(event.target.innerText.trim());
    }
  });
}
