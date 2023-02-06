import {leagues} from './Teams.js';

export class SoccerTeam {
    constructor (name, rating) {
        this.teamName = name;
        this.teamRating = rating;
        this.wins = 0; this.draws = 0;
        this.losses = 0;
        this.goalsFor = 0; this.goalsAgainst = 0;
    }
    goalDifference = function () {
        return this.goalsFor - this.goalsAgainst;
    }

    points = function () {
        return 3*this.wins + this.draws;
    }

    gamesPlayed = function () {
        return this.wins + this.losses + this.draws;
    }
}

export class SoccerMatch {
    constructor (home, away) {
        this.homeTeam = home;
        this.awayTeam = away;
        this.homeGoals = 0; this.awayGoals = 0;
        this.played = false;
    }

    simulateMatch = function() {
        if (this.homeTeam.teamName == "<BYE>" || this.awayTeam.teamName == "<BYE>")
            return;
        let diff = this.homeTeam.rating - this.homeTeam.rating;
        let expectedRes = 1 / (Math.pow(10, -1*diff/400) + 1);
        for (let p = 0; p < 20; p++) {
            let randH1 = Math.floor(Math.random()*105 + 1);
            let randH2 = Math.floor(Math.random()*105 + 1);
            if (randH1 <= 40 && randH2 <= 20) {
                this.homeGoals++;
            }

            let randA1 = Math.floor(Math.random()*105 + 1);
            let randA2 = Math.floor(Math.random()*105 + 1);
            if (randA1 <= 40 && randA2 <= 20){
                this.awayGoals++;
            }
        }

        this.played = true;

        if (this.homeGoals > this.awayGoals) {
            this.homeTeam.wins++;
            this.awayTeam.losses++;
        }
        else if (this.homeGoals < this.awayGoals) {
            this.homeTeam.losses++;
            this.awayTeam.wins++;
        }
        else {
            this.homeTeam.draws++;
            this.awayTeam.draws++;
        }

        this.homeTeam.goalsFor += this.homeGoals;
        this.homeTeam.goalsAgainst += this.awayGoals;

        this.awayTeam.goalsFor += this.awayGoals;
        this.awayTeam.goalsAgainst += this.homeGoals;

        return this.homeGoals + this.awayGoals;
    }

    //positive if home team won, negative if away team won, 0 if tie/draw
    getResult = function() {
        if (this.played)
            return this.homeGoals - this.awayGoals;
        return null;
    }

    toString() {  
        if (this.played) {
            return this.homeTeam.teamName + " " + this.homeGoals + " - " + this.awayGoals + " " + this.awayTeam.teamName;
        }
        else return this.homeTeam.teamName + " - " + this.awayTeam.teamName;
    }
}

export class SoccerLeague {
    constructor (country, name, rRobin, numChamp, numSecondary, numRel) {
        this.country = country;
        this.leagueTeams = getLeagueTeams(country);
        this.leagueName = name;
        this.roundRobin = rRobin;
        this.numChampions = numChamp;
        this.numSecondary = numSecondary;
        this.numRelegations = numRel;
        this.schedule = [];
        this.standings = [];
        this.currentWeek = 0;
        this.numWeeks = this.roundRobin*(this.leagueTeams.length - 1);
        this.simulated = false;
    }

    simulateNextWeek = function() {
        if (this.schedule.length == 0)
            return;

        for (let match in this.schedule[this.currentWeek]) {
            this.schedule[this.currentWeek][match].simulateMatch();
        }
        this.currentWeek++;
        //this.createStandings();
        if (this.currentWeek == this.numWeeks)
            this.simulated = true;
    }

    createSchedule = function() {
        let numWeeks = this.roundRobin*(this.leagueTeams.length - 1);
        let gamesPerWk = this.leagueTeams.length / 2;
        randomizeTeams(this.leagueTeams);

        for (let week = 0; week < numWeeks; week++) {
            //Array of SoccerMatch
            let currWeek = [];
            for (let game = 0, team1 = 0, team2 = this.leagueTeams.length - 1; game < gamesPerWk; game++, team1++, team2--) {
                let match = createSoccerMatch(week, numWeeks, team1, team2, this.leagueTeams);
                currWeek.push(match);
            }
            //Randomize the matches in current week
            for (let g = 0; g < gamesPerWk; g++){
                let a = Math.floor(Math.random() * currWeek.length);
                [currWeek[a], currWeek[g]] = [currWeek[g], currWeek[a]];
            }
            rotateTeams(this.leagueTeams);
            this.schedule.push(currWeek);
        }
        return this.schedule;
    }

    createStandings = function () {
        sortTeams(this.leagueTeams);
        this.standings = [];
        let header = ['Pos', 'Team', 'GP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'PTS'];
        this.standings.push(header);  

        let teamStats = [];
        let pos = 1;
        for (let t = 0; t < this.leagueTeams.length; t++) {
            if (this.leagueTeams[t].teamName != "<BYE>") {
                teamStats = [pos, this.leagueTeams[t].teamName, this.leagueTeams[t].gamesPlayed(), 
                    this.leagueTeams[t].wins, this.leagueTeams[t].draws, this.leagueTeams[t].losses, 
                    this.leagueTeams[t].goalsFor, this.leagueTeams[t].goalsAgainst, 
                    this.leagueTeams[t].goalDifference(), this.leagueTeams[t].points()];
                pos++;
                this.standings.push(teamStats);
            }
        }
    
        return this.standings;   
    }
}

export function getLeagueTeams (country) {
    let teamStrArray = leagues[country].split('\n');

    let teamArray = [];
    for (let team in teamStrArray) {
        let teamCreated = new SoccerTeam(teamStrArray[team], 1500);
        teamArray.push(teamCreated);
    }

    //Create dummy <BYE> team if the number of teams is odd
    if (teamArray.length % 2 == 1) {
        teamArray.push(new SoccerTeam("<BYE>", 0));
    }

    return teamArray;
}

//Sort descending by points, goal diff, goals for, then alphabetically
function sortTeams (teamArray) {
    teamArray.sort((a, b) => {
        if (a.points() != b.points())
            return (b.points() - a.points());
        else if (a.goalDifference() != b.goalDifference())
            return b.goalDifference() - a.goalDifference();
        else if (a.goalsFor != b.goalsFor)
            return b.goalsFor - a.goalsFor;
        else
            return a.teamName.localeCompare(b.teamName);
    })
}

function randomizeTeams (teamArray) {
    for (let i = 0; i < teamArray.length; i++) {
        let a = Math.floor(Math.random() * teamArray.length);

        [teamArray[a], teamArray[i]] = [teamArray[i], teamArray[a]];
    }
}

function rotateTeams (teamArray) {
    let last = teamArray.pop();
    teamArray.splice(1, 0, last);
}

//Will determine who is the home team and who is the away team
//based on the week, the total number of weeks, and the teams' positions within teamArray
function createSoccerMatch (week, numWeeks, team1Pos, team2Pos, teamArray) {
    let match = null;
    if (week < numWeeks / 2){
        if(team1Pos == 0){
            if (week % 2 == 0) {
                match = new SoccerMatch(teamArray[team1Pos], teamArray[team2Pos]); 
            }
            else {
                match = new SoccerMatch(teamArray[team2Pos], teamArray[team1Pos]); 
            }
        }
        else {
            if (team1Pos % 2 == 0) {
                match = new SoccerMatch(teamArray[team1Pos], teamArray[team2Pos]);
            }
            else {
                match = new SoccerMatch(teamArray[team2Pos], teamArray[team1Pos]); 
            }
        }
    }
    else {
        if(team1Pos == 0){
            if (week % 2 == 1) {
                match = new SoccerMatch(teamArray[team2Pos], teamArray[team1Pos]); 
            }
            else {
                match = new SoccerMatch(teamArray[team1Pos], teamArray[team2Pos]);
            }
        }
        else {
            if (team1Pos % 2 == 0) {
                match = new SoccerMatch(teamArray[team2Pos], teamArray[team1Pos]); 
            }
            else {
                match = new SoccerMatch(teamArray[team1Pos], teamArray[team2Pos]);
            }
        }
    }
    return match;
}