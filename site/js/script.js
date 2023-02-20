import { leaguesObj } from "./Teams.js";
import { SoccerLeague } from "./SoccerLeagues.js";

let league = null;
let schedule = null;
let standings = null;
let leagueSelected = false;

let createLeague = function (socLeagueObj) {
    league = new SoccerLeague (socLeagueObj);
    leagueSelected = true;

    document.getElementById('schedule').innerHTML = "League Selected: " + socLeagueObj['country'] +
        ' (' + socLeagueObj['name'] + ')';
    document.getElementById('teams').innerHTML = "";

    schedule = league.createSchedule();
    standings = league.createStandings();
    printStandings();
}

let allLeagues = document.getElementsByClassName("create-league");

for (let currLeague of allLeagues) {
    currLeague.addEventListener("click", function() {
        createLeague(leaguesObj[currLeague.id])
    });
}


let simulateNextWeek = function() {
    if (!leagueSelected) {
        alert ("Select a league");
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
document.getElementById("sim-next-week").addEventListener("click", simulateNextWeek);

let simulateSeason = function() {
    if (!leagueSelected) {
        alert ("Select a league");
        return;
    }

    while(!league.simulated) {
        league.simulateNextWeek();
    }
    standings = league.createStandings();
    printSchedule();
    printStandings();
}
document.getElementById("sim-season").addEventListener("click", simulateSeason);

let printSchedule = function () {
    if (!leagueSelected) {
        alert ("Select a league");
        return;
    }
    let schedString = "";

    for (let week in schedule) {
        schedString += ("&emsp;&emsp;Week " + (+week + 1) + "<br>");
        for (let game of schedule[week]) {
            let gameString = game.toString();

            //If either team is <BYE>, it won't be printed
            if (!gameString.includes("<BYE>")) {
                schedString += (game.toString() + "<br>");
            }
        }
        schedString += "<br>";
        document.getElementById('schedule').innerHTML = schedString;
    }
}
document.getElementById("print-sched").addEventListener("click", printSchedule);

let printTeamSchedule = function (teamToPrint) {
    let schedString = "";
    for (let week in schedule) {
        schedString +="Week " + (+week + 1) + ": ";
        for (let game of schedule[week]) {
            let gameString = game.toString();
            teamToPrint = teamToPrint.trim();

            if (gameString.includes(teamToPrint)) {
                if (gameString.includes("<BYE>")) {
                    schedString += "Bye Week<br>";
                }
                else {
                    schedString +=  gameString + '<br>';
                }
            }
        }
        document.getElementById('schedule').innerHTML = schedString;
    }
}

let printWeek = function (weekToPrint) {
    if (!leagueSelected) {
        alert ("Select a league");
        return;
    }

    if (weekToPrint == null)
        do {
            weekToPrint = prompt (`Enter a week (between 1 and ${schedule.length})`, 1);
            if (weekToPrint == null) return;
        }
        while(weekToPrint <= 0 || weekToPrint > schedule.length)

        let weekString = "&emsp;&emsp;Week " + weekToPrint + "<br>";

        for (let game of schedule[weekToPrint - 1]) {
            let gameString = game.toString();

            //If either team is <BYE>, it won't be printed
            if (!gameString.includes("<BYE>")) {
                weekString += (gameString + "<br>");
            }
        }
        
        weekString += "<br>";
        document.getElementById('schedule').innerHTML = weekString; 
}
document.getElementById("print-week").addEventListener("click", function(event) {
    printWeek(null);
});

let printStandings = function () {
    if (!leagueSelected) {
        alert ("Select a league");
        return;
    }
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");
    
    let relegationZone = standings.length - league.numRelegations;
    for (let r = 0; r < standings.length; r++) {
        let row = document.createElement("tr");
        
        for (let c = 0; c < 10; c++) {
            let cellType = (r == 0) ? "th" : "td";
            //creates data cell or header cell
            let cell = document.createElement(cellType); 
            let teamStr = standings[r][c];
            let cellTextNode = document.createTextNode(" " + teamStr);
            
            if (c == 1 && r != 0) {
                let id = String(standings[r][1].toLowerCase()).replaceAll(" ", "-");
                cell.setAttribute("id", id);
                cell.setAttribute("class", "team-name");
                cell.addEventListener("click", function() {
                    printTeamSchedule(teamStr);
                });

                if (league.country == 'Brazil' ||
                    league.country == 'Germany' ||
                    league.country == 'Spain' ||
                    league.country == 'Mexico' || 
                    league.country == 'Italy' ||
                    league.country == 'Portugal') {
                    let teamPic = document.createElement("img");
                    teamPic.setAttribute("src", "./images/Team Logos/" + league.country + 
                    " league/" + id + ".png");
                    teamPic.setAttribute("width", "25px");
                    teamPic.setAttribute("alt", teamStr);
                    cell.appendChild(teamPic);
                }
            }
            cell.appendChild(cellTextNode);
            row.appendChild(cell);
        }

        if (r >= relegationZone)
            row.setAttribute("class", "table-danger");
        if (r == Math.trunc(relegationZone) && row.getAttribute("class") != "table-danger")
            row.setAttribute("class", "table-warning");
        if (r >= 1 && r <= league.numChampions)
            row.setAttribute("class", "table-info");
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    document.getElementById('teams').innerHTML = "";
    table.setAttribute("border", "1");
    table.setAttribute("id", "standings");
    table.setAttribute("class", "table table-dark");
    document.getElementById('teams').appendChild(table);
    printGoalAvg();
}
document.getElementById('print-stand').addEventListener("click", printStandings);

let printGoalAvg = function () {
    document.getElementById('goals-avg').innerHTML = "Goals scored: " + league.numGoals + 
     "<br>Goals per game: " + league.goalsPerGame(); 
}

let clearInfo = function () {
    document.getElementById('schedule').innerHTML = "";
    let countryLeague = league.country + ' (' + league.leagueName + ')';
    if (leagueSelected) {
        document.getElementById('schedule').innerHTML = "League Selected: " + countryLeague;
    }
    document.getElementById('teams').innerHTML = "";
    document.getElementById('goals-avg').innerHTML = "";
}
document.getElementById('clear-info').addEventListener("click", clearInfo);