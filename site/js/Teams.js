let englandTeams = `Arsenal
Manchester City
Tottenham Hotspur
Newcastle United
Manchester United
Liverpool
Brighton and Hove Albion
Chelsea
Fulham
Brentford
Crystal Palace
Aston Villa
Leicester City
Bournemouth
Leeds United
West Ham United
Everton
Nottingham Forest
Southampton
Wolverhampton Wanderers`;

let spainTeams = `Barcelona
Real Madrid
Real Sociedad
Athletic Bilbao
Atlético Madrid
Real Betis
Osasuna
Rayo Vallecano
Villarreal
Valencia
Mallorca
Real Valladolid
Girona
Almería
Getafe
Espanyol
Celta de Vigo
Sevilla
Cádiz
Elche`;

let italyTeams = `Napoli
AC Milan
Juventus
Lazio
Inter Milan
Atalanta
AS Roma
Udinese
Torino
Fiorentina
Bologna
Salernitana
Empoli
Monza
Sassuolo
Lecce
Spezia
Cremonese
Sampdoria
Hellas Verona`;

let germanyTeams = `Bayern Munich
SC Freiburg
RasenBallsport Leipzig
Union Berlin
Eintracht Frankfurt
Borussia Dortmund
VfL Wolfsburg
Borussia Mönchengladbach
Werder Bremen
Mainz 05
1. FC Köln
1899 Hoffenheim
Bayer Leverkusen
FC Augsburg
Hertha Berlin
VfB Stuttgart
VfL Bochum
Schalke 04`;

let franceTeams = `Paris Saint-Germain
Lens
Rennes
Olympique Marseille
Lorient
Monaco
LOSC Lille
Olympique Lyon
Nice
Clermont Foot
Stade de Reims
Toulouse
Troyes
Montpellier
Nantes
Brest
AJ Auxerre
Ajaccio
Strasbourg
Angers`;

let portugalTeams = `Benfica
Porto
Braga
Sporting CP
Casa Pia
Arouca
Vizela
Estoril
Chaves
Boavista
Santa Clara
Marítimo
Famalicão
Vitória de Guimarães
Portimonense
Paços de Ferreira
Rio Ave
Gil Vicente`;

let netherlandsTeams = `Feyenoord
Ajax Amsterdam
PSV Eindhoven
AZ Alkmaar
Twente
Sparta Rotterdam
Utrecht
Heerenveen
NEC Nijmegen
RKC Waalwijk
Go Ahead Eagles
Fortuna Sittard
Vitesse
Excelsior
Groningen
Emmen
Cambuur
Volendam`;

let mexicoTeams = `América
Atlas
Atlético San Luis
Cruz Azul
Guadalajara
Juárez
León
Mazatlán
Monterrey
Necaxa
Pachuca
Puebla
Pumas UNAM
Querétaro
Santos Laguna
Tigres UANL
Tijuana
Toluca`; 

let brazilTeams = `América Mineiro
Athletico Paranaense
Atlético Mineiro
Bahia
Botafogo
Corinthians
Coritiba
Cruzeiro
Cuiabá
Flamengo
Fluminense
Fortaleza
Goiás
Grêmio
Internacional
Palmeiras
Red Bull Bragantino
Santos
São Paulo
Vasco da Gama`; 

let argentinaTeams = `Argentinos Juniors
Arsenal de Sarandí
Atlético Tucumán
Banfield
Barracas Central
Belgrano
Boca Juniors
Central Córdoba (SdE)
Colón
Defensa y Justicia
Estudiantes La Plata
Gimnasia La Plata
Godoy Cruz
Huracán
Independiente
Instituto de Córdoba
Lanús
Newell's Old Boys
Platense
Racing
River Plate
Rosario Central
San Lorenzo
Sarmiento
Talleres de Córdoba
Tigre
Unión de Santa Fe
Vélez Sarsfield`;

let united_statesTeams = `Atlanta United
Austin FC
Charlotte FC
Chicago Fire
FC Cincinnati
Colorado Rapids
Columbus Crew
FC Dallas
DC United
Houston Dynamo
Los Angeles Galaxy
Los Angeles FC
Minnesota United
Inter Miami
CF Montréal
Nashville SC
New England Revolution
New York City
New York Red Bulls
Orlando City
Philadelphia Union
Portland Timbers
Real Salt Lake
San Jose Earthquakes
Seattle Sounders
Sporting Kansas City
St. Louis City
Toronto FC
Vancouver Whitecaps`;

function SoccerLeagueObj (country, name, teams, rRobin, numChamp, numSecond, numRel) {
    this.country = country;
    this.name = name;
    this.teams = teams,
    this.roundRobin = rRobin;
    this.numChampions = numChamp;
    this.numSecondary = numSecond;
    this.numRelegations = numRel;
}

export let leaguesObj = {
    england:new SoccerLeagueObj("England", "Premier League", englandTeams, 2, 4, 3, 3),
    spain:new SoccerLeagueObj("Spain", "La Liga", spainTeams, 2, 4, 3, 3),
    italy:new SoccerLeagueObj("Italy", "Serie A", italyTeams, 2, 4, 3, 3),
    germany:new SoccerLeagueObj("Germany", "Bundesliga", germanyTeams, 2, 4, 3, 2.5),
    france:new SoccerLeagueObj("France", "Ligue 1", franceTeams, 2, 3, 3, 4),
    portugal:new SoccerLeagueObj("Portugal", "Primeira Liga", portugalTeams, 2, 2, 3, 2.5),
    netherlands:new SoccerLeagueObj("Netherlands", "Eredivisie", netherlandsTeams, 2, 2, 3, 2.5),
    mexico:new SoccerLeagueObj("Mexico", "Liga MX", mexicoTeams, 1, 4, 0, 0),
    brazil:new SoccerLeagueObj("Brazil", "Série A", brazilTeams, 2, 6, 6, 4),
    argentina:new SoccerLeagueObj("Argentina", "Primera División", argentinaTeams, 1, 6, 6, 3),
    united_states:new SoccerLeagueObj("United States", "Major League Soccer", united_statesTeams, 1, 4, 0, 0),
}