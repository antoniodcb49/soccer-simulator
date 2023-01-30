let eng = `Arsenal
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

let spa = `Barcelona
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

let ita = `Napoli
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

let ger = `Bayern Munich
SC Freiburg
RasenBallsport Leipzig
Union Berlin
Entracht Frankfurt
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

let fra = `Paris Saint-Germain
Lens
Rennes
Olympique Marseille
Lorient
Monaco
LOSC Lille
Olympique Lyon
Nice
Clermont
Stade de Reims
Toulouse
Troyes
Montpelier
Nantes
Brest
AJ Auxerre
Ajaccio
Strasbourg
Angers`;

let por = `Benfica
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

let ned = `Feyenoord
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

let mex = `América
Guadalajara
Cruz Azul
Pumas UNAM
Tigres UANL
Monterrey
Tijuana
Juárez
Atlético San Luis
Querétaro
León
Toluca
Mazatlán
Puebla
Pachuca
Atlas
Santos Laguna
Necaxa`;

let bra = `América Mineiro
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
Fontaleza
Goiás
Grêmio
Internacional
Palmeiras
Red Bull Bragantino
Santos
São Paulo
Vasco da Gama`;

let arg = `Argentinos Juniors
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

let usa = `Atlanta United
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

export let leagues = {
    england:eng,
    spain:spa,
    italy:ita,
    germany:ger,
    france:fra,
    portugal:por,
    netherlands:ned,
    mexico:mex,
    brazil:bra,
    argentina:arg,
    unitedStates:usa,
};

export let relegations = {
    england:3,
    spain:3,
    italy:3,
    germany:2.5,
    france:4,
    portugal:2.5,
    netherlands:2.5,
    mexico:2,
    brazil:4,
    argentina:0,
    unitedStates:0,
};