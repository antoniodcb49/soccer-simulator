class SoccerTeam {
  constructor(name, rating) {
    this.teamName = name;
    this.teamRating = rating;
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalDifference = 0;
    this.gamesPlayed = 0;
    this.points = 0;
  }

  //Takes the score of a game and updates the team's stats
  updateStats(goalsFor, goalsAgainst) {
    if (goalsFor > goalsAgainst) this.wins++;
    else if (goalsFor < goalsAgainst) this.losses++;
    else this.draws++;

    this.goalsFor += goalsFor;
    this.goalsAgainst += goalsAgainst;

    this.goalDifference = this.goalsFor - this.goalsAgainst;
    this.points = 3 * this.wins + this.draws;
    this.gamesPlayed = this.wins + this.losses + this.draws;
  }

  getStats() {
    return [
      this.gamesPlayed,
      this.wins,
      this.draws,
      this.losses,
      this.goalsFor,
      this.goalsAgainst,
      this.goalDifference,
      this.points,
    ];
  }
}

class SoccerMatch {
  constructor(home, away) {
    this.homeTeam = home;
    this.awayTeam = away;
    this.homeGoals = 0;
    this.awayGoals = 0;
    this.played = false;
  }

  simulateMatch() {
    if (this.homeTeam.teamName == "<BYE>" || this.awayTeam.teamName == "<BYE>")
      return;
    let diff = this.homeTeam.rating - this.homeTeam.rating;
    let expectedRes = 1 / (Math.pow(10, (-1 * diff) / 400) + 1);
    for (let p = 0; p < 20; p++) {
      let randH1 = Math.floor(Math.random() * 105 + 1);
      let randH2 = Math.floor(Math.random() * 105 + 1);
      if (randH1 <= 40 && randH2 <= 20) {
        this.homeGoals++;
      }

      let randA1 = Math.floor(Math.random() * 105 + 1);
      let randA2 = Math.floor(Math.random() * 105 + 1);
      if (randA1 <= 40 && randA2 <= 20) {
        this.awayGoals++;
      }
    }

    this.played = true;
    console.log(this.toString());
    this.homeTeam.updateStats(this.homeGoals, this.awayGoals);
    this.awayTeam.updateStats(this.awayGoals, this.homeGoals);
  }

  toString() {
    if (this.played) {
      return (
        this.homeTeam.teamName +
        " " +
        this.homeGoals +
        " - " +
        this.awayGoals +
        " " +
        this.awayTeam.teamName
      );
    } else return this.homeTeam.teamName + " - " + this.awayTeam.teamName;
  }
}

export class SoccerLeague {
  constructor(soccerLeagueInfo) {
    //Format for soccerLeagueInfo:
    // [country, name, teams, roundRobin, numChampions, numSecondary, numRelegations]
    this.country = soccerLeagueInfo[0];
    this.leagueName = soccerLeagueInfo[1];
    this.leagueTeams = getLeagueTeams(soccerLeagueInfo[2]);
    this.roundRobin = soccerLeagueInfo[3];
    this.numChampions = soccerLeagueInfo[4];
    this.numSecondary = soccerLeagueInfo[5];
    this.numRelegations = soccerLeagueInfo[6];
    this.schedule = [];
    this.standings = [];
    this.currentWeek = 0;
    this.numWeeks = this.roundRobin * (this.leagueTeams.length - 1);
    this.simulated = false;
    this.numGoals = 0;
    this.gamesPlayed = 0;
  }

  simulateNextWeek() {
    if (this.schedule.length == 0) return;

    for (let match of this.schedule[this.currentWeek]) {
      match.simulateMatch();
      this.gamesPlayed++;
      this.numGoals += match.homeGoals + match.awayGoals;
    }
    this.currentWeek++;
    if (this.currentWeek == this.numWeeks) this.simulated = true;
  }

  createSchedule() {
    let numTeams = this.leagueTeams.length;
    let numRounds = numTeams - 1;
    let gamesPerRd = numTeams / 2;
    randomizeTeams(this.leagueTeams);

    //Create Table 1
    let table1 = [];
    let count = 0;
    for (let r1 = 0; r1 < numRounds; r1++) {
      let round = [];
      for (let g1 = 0; g1 < gamesPerRd; g1++) {
        round.push(this.leagueTeams[count % (numTeams - 1)]);
        count++;
      }
      table1.push(round);
    }

    //Create Table 2, based on table 1
    let table2 = [];
    for (let r1 = 1; r1 < numRounds; r1++) {
      let round2 = [];
      for (let g1 = gamesPerRd - 1; g1 >= 0; g1--) {
        round2.push(table1[r1][g1]);
      }
      table2.push(round2);
    }

    //Push the first row of table1 into the last row of table2
    let round2 = [];
    for (let g1 = gamesPerRd - 1; g1 >= 0; g1--) {
      round2.push(table1[0][g1]);
    }
    table2.push(round2);
    //Table 2 finished

    //Create final schedule, by combining Tables 1 and 2
    this.schedule = [];
    //Create first cycle of Round Robin (every team plays numRounds games)
    for (let r = 0; r < numRounds; r++) {
      let round = [];
      for (let g = 0; g < gamesPerRd; g++) {
        if (g == 0) {
          if (r % 2 == 0) {
            round.push(
              new SoccerMatch(this.leagueTeams[numRounds], table2[r][g])
            );
          } else {
            round.push(
              new SoccerMatch(table1[r][g], this.leagueTeams[numRounds])
            );
          }
        } else {
          round.push(new SoccerMatch(table1[r][g], table2[r][g]));
        }
      }

      randomizeRound(round);
      this.schedule.push(round);
    }

    //If this is a double round robin (or triple, quadruple, etc...)
    //This portion creates the next cycles
    let cyclesCreated = 1; //A single round robin so far
    let prevCycle = Object.assign({}, this.schedule); //structuredClone(this.schedule);

    while (cyclesCreated < this.roundRobin) {
      let nextCycle = this.createNextCycle(prevCycle);
      for (let r = 0; r < numRounds; r++) {
        this.schedule.push(nextCycle[r]);
      }
      cyclesCreated++;
      prevCycle = Object.assign({}, nextCycle);
    }

    return this.schedule;
  }

  //prevCycle and newCycle are 2D SoccerMatch arrays, just like this.schedule
  //row 0 of newCycle will be row 1 of prevCycle with home and away teams flipped
  //last row of newCycle will be row 0 of prevCycle
  createNextCycle(prevCycle) {
    let newCycle = [];
    let numTeams = this.leagueTeams.length;
    let numRounds = numTeams - 1;
    let gamesPerRd = numTeams / 2;

    //round r in prevRound is round r - 1 in newCycle
    //round 0 in prevRound isn't copied yet
    for (let r = 1; r < numRounds; r++) {
      let round = [];
      for (let g = 0; g < gamesPerRd; g++) {
        let game = prevCycle[r][g];
        round.push(new SoccerMatch(game.awayTeam, game.homeTeam));
      }

      randomizeRound(round);
      newCycle.push(round);
    }

    //Copy round 0 in prevRound as the last round in newCycle
    let round = [];
    for (let g = 0; g < gamesPerRd; g++) {
      let game = prevCycle[0][g];
      round.push(new SoccerMatch(game.awayTeam, game.homeTeam));
    }

    randomizeRound(round);
    newCycle.push(round);

    return newCycle;
  }

  //Rounded to 2 decimal places
  goalsPerGame() {
    let gamesPlayed = this.gamesPlayed || 1;

    let average = this.numGoals / gamesPlayed;
    return average.toFixed(2); //this is a string
  }

  createStandings() {
    sortTeams(this.leagueTeams);
    this.standings = [];

    let teamStats = [];
    let pos = 1;
    this.leagueTeams.forEach((team) => {
      if (team.teamName != "<BYE>") {
        let stats = team.getStats();
        teamStats = [pos, team.teamName, ...stats];

        pos++;
        this.standings.push(teamStats);
      }
    });

    return this.standings;
  }
}

function getLeagueTeams(teams) {
  let teamStrArray = teams.split("\n");

  let teamArray = [];
  for (let teamStr of teamStrArray) {
    let nameAndRating = teamStr.split("_"); //creates array [teamName, teamRating]
    let teamCreated = new SoccerTeam(nameAndRating[0], nameAndRating[1]);
    teamArray.push(teamCreated);
  }

  //Create dummy <BYE> team if the number of teams is odd
  if (teamArray.length % 2 == 1) {
    teamArray.push(new SoccerTeam("<BYE>", 0));
  }

  return teamArray;
}

//Sort descending by points, goal diff, goals for, then alphabetically
function sortTeams(teamArray) {
  teamArray.sort((a, b) => {
    if (a.points != b.points) return b.points - a.points;
    else if (a.goalDifference != b.goalDifference)
      return b.goalDifference - a.goalDifference;
    else if (a.goalsFor != b.goalsFor) return b.goalsFor - a.goalsFor;
    else return a.teamName.localeCompare(b.teamName);
  });
}

function randomizeTeams(teamArray) {
  for (let i = 0; i < teamArray.length; i++) {
    let a = Math.floor(Math.random() * teamArray.length);

    [teamArray[a], teamArray[i]] = [teamArray[i], teamArray[a]];
  }
}

function randomizeRound(round) {
  for (let g = 0; g < round.length; g++) {
    let rand = Math.floor(Math.random() * round.length);
    [round[rand], round[g]] = [round[g], round[rand]];
  }
}
