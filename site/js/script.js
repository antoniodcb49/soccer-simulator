let league = null;
let schedule = null;
let standings = null;
let leagueSelected = false;

createLeague = function (country, name, roundRobin, numChamp, numSecondary, numRel) {
    league = new SoccerLeague (country, name, roundRobin, numChamp, numSecondary, numRel);
    leagueSelected = true;
    let leagueName = document.getElementById(String(country)).innerText.trim();

    document.getElementById('schedule').innerHTML = "League Selected: " + leagueName;
    document.getElementById('teams').innerHTML = "";

    schedule = league.createSchedule();
    standings = league.createStandings();
    printStandings();
} 

simulateNextWeek = function() {
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
        document.getElementById('standings-pane').setAttribute("class", "tab-pane fade");    
        document.getElementById('schedule-pane').setAttribute("class", "tab-pane fade show active"); 
    }
}
document.getElementById("sim-next-week").addEventListener("click", simulateNextWeek);

simulateSeason = function() {
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

printSchedule = function () {
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

printTeamSchedule = function (teamToPrint) {
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

printWeek = function (weekToPrint) {
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

    if (weekToPrint != null) {
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
}
document.getElementById("print-week").addEventListener("click", function() {printWeek(null)});

printStandings = function () {
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
            // let linkToTab = document.createElement("a");
            // linkToTab.setAttribute("href", "#schedule-pane");
            // linkToTab.appendChild(cellTextNode);
            
            if (c == 1 && r != 0) {
                let id = String(standings[r][1].toLowerCase()).replaceAll(" ", "-");
                cell.setAttribute("id", id);
                cell.setAttribute("class", "team-name");
                cell.addEventListener("click", function() {
                    printTeamSchedule(teamStr);
                });

                if (league.country == 'brazil' ||
                    league.country == 'germany' ||
                    league.country == 'spain' ||
                    league.country == 'mexico') {
                    let teamPic = document.createElement("img");
                    teamPic.setAttribute("src", "./images/Team Logos/" + league.country + 
                    " league/" + id + ".png");
                    teamPic.setAttribute("width", "25px");
                    teamPic.setAttribute("alt", teamStr);
                    cell.appendChild(teamPic);
                }
                //console.log(cell);
            }

            cell.appendChild(cellTextNode);
            row.appendChild(cell);

            if (r >= relegationZone)
                row.setAttribute("class", "table-danger");
            if (r == Math.trunc(relegationZone) && row.getAttribute("class") != "table-danger")
                row.setAttribute("class", "table-warning");
            if (r >= 1 && r <= league.numChampions)
                row.setAttribute("class", "table-info");
        }
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

printGoalAvg = function () {
    document.getElementById('goals-avg').innerHTML = "Goals scored: " + league.numGoals + 
     "<br>Goals per game: " + league.goalsPerGame(); 
}

clearInfo = function () {
    document.getElementById('schedule').innerHTML = "";
    let leagueName = document.getElementById(String(league.country)).innerText.trim();
    if (leagueSelected) {
        document.getElementById('schedule').innerHTML = "League Selected: " + leagueName;
    }
    document.getElementById('teams').innerHTML = "";
    document.getElementById('goals-avg').innerHTML = "";
}
document.getElementById('clear-info').addEventListener("click", clearInfo);