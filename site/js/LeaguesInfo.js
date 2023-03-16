let englandTeams = `Arsenal_1700
Aston Villa_1700
Bournemouth_1700
Brentford_1700
Brighton & Hove Albion_1700
Chelsea_1700
Crystal Palace_1700
Everton_1700
Fulham_1700
Leeds United_1700
Leicester City_1700
Liverpool_1700
Manchester City_1700
Manchester United_1700
Newcastle United_1700
Nottingham Forest_1700
Southampton_1700
Tottenham Hotspur_1700
West Ham United_1700
Wolverhampton Wanderers_1700`;

let spainTeams = `Almería_1700
Athletic Bilbao_1700
Atlético Madrid_1700
Barcelona_1700
Cádiz_1700
Celta de Vigo_1700
Elche_1700
Espanyol_1700
Getafe_1700
Girona_1700
Mallorca_1700
Osasuna_1700
Rayo Vallecano_1700
Real Betis_1700
Real Madrid_1700
Real Sociedad_1700
Real Valladolid_1700
Sevilla_1700
Valencia_1700
Villarreal_1700`;

let italyTeams = `AC Milan_1700
AS Roma_1700
Atalanta_1700
Bologna_1700
Cremonese_1700
Empoli_1700
Fiorentina_1700
Hellas Verona_1700
Inter Milan_1700
Juventus_1700
Lazio_1700
Lecce_1700
Monza_1700
Napoli_1700
Salernitana_1700
Sampdoria_1700
Sassuolo_1700
Spezia_1700
Torino_1700
Udinese_1700`;

let germanyTeams = `1. FC Köln_1700
1899 Hoffenheim_1700
Bayer Leverkusen_1700
Bayern Munich_1700
Borussia Dortmund_1700
Borussia Mönchengladbach_1700
Eintracht Frankfurt_1700
FC Augsburg_1700
Hertha Berlin_1700
Mainz 05_1700
RasenBallsport Leipzig_1700
SC Freiburg_1700
Schalke 04_1700
Union Berlin_1700
VfB Stuttgart_1700
VfL Bochum_1700
VfL Wolfsburg_1700
Werder Bremen_1700`;

let franceTeams = `AJ Auxerre_1700
Ajaccio_1700
Angers_1700
Brest_1700
Clermont Foot_1700
Lens_1700
Lorient_1700
LOSC Lille_1700
Monaco_1700
Montpellier_1700
Nantes_1700
Nice_1700
Olympique Lyon_1700
Olympique Marseille_1700
Paris Saint-Germain_1700
Rennes_1700
Stade de Reims_1700
Strasbourg_1700
Toulouse_1700
Troyes_1700`;

let portugalTeams = `Arouca_1700
Benfica_1700
Boavista_1700
Braga_1700
Casa Pia_1700
Chaves_1700
Estoril_1700
Famalicão_1700
Gil Vicente_1700
Marítimo_1700
Paços de Ferreira_1700
Portimonense_1700
Porto_1700
Rio Ave_1700
Santa Clara_1700
Sporting CP_1700
Vitória de Guimarães_1700
Vizela_1700`;

let netherlandsTeams = `Ajax Amsterdam_1700
AZ Alkmaar_1700
Cambuur_1700
Emmen_1700
Excelsior_1700
Feyenoord_1700
Fortuna Sittard_1700
Go Ahead Eagles_1700
Groningen_1700
Heerenveen_1700
NEC Nijmegen_1700
PSV Eindhoven_1700
RKC Waalwijk_1700
Sparta Rotterdam_1700
Twente_1700
Utrecht_1700
Vitesse_1700
Volendam_1700`;

let argentinaTeams = `Argentinos Juniors_1700
Arsenal de Sarandí_1700
Atlético Tucumán_1700
Banfield_1700
Barracas Central_1700
Belgrano_1700
Boca Juniors_1700
Central Córdoba (SdE)_1700
Colón_1700
Defensa y Justicia_1700
Estudiantes La Plata_1700
Gimnasia La Plata_1700
Godoy Cruz_1700
Huracán_1700
Independiente_1700
Instituto de Córdoba_1700
Lanús_1700
Newell's Old Boys_1700
Platense_1700
Racing_1700
River Plate_1700
Rosario Central_1700
San Lorenzo_1700
Sarmiento_1700
Talleres de Córdoba_1700
Tigre_1700
Unión de Santa Fe_1700
Vélez Sarsfield_1700`;

let brazilTeams = `América Mineiro_1700
Athletico Paranaense_1700
Atlético Mineiro_1700
Bahia_1700
Botafogo_1700
Corinthians_1700
Coritiba_1700
Cruzeiro_1700
Cuiabá_1700
Flamengo_1700
Fluminense_1700
Fortaleza_1700
Goiás_1700
Grêmio_1700
Internacional_1700
Palmeiras_1700
Red Bull Bragantino_1700
Santos_1700
São Paulo_1700
Vasco da Gama_1700`;

let mexicoTeams = `América_1700
Atlas_1700
Atlético San Luis_1700
Cruz Azul_1700
Guadalajara_1700
Juárez_1700
León_1700
Mazatlán_1700
Monterrey_1700
Necaxa_1700
Pachuca_1700
Puebla_1700
Pumas UNAM_1700
Querétaro_1700
Santos Laguna_1700
Tigres UANL_1700
Tijuana_1700
Toluca_1700`;

let usaTeams = `Atlanta United_1700
Austin FC_1700
CF Montréal_1700
Charlotte FC_1700
Chicago Fire_1700
Colorado Rapids_1700
Columbus Crew_1700
DC United_1700
FC Cincinnati_1700
FC Dallas_1700
Houston Dynamo_1700
Inter Miami_1700
Los Angeles FC_1700
Los Angeles Galaxy_1700
Minnesota United_1700
Nashville SC_1700
New England Revolution_1700
New York City_1700
New York Red Bulls_1700
Orlando City_1700
Philadelphia Union_1700
Portland Timbers_1700
Real Salt Lake_1700
San Jose Earthquakes_1700
Seattle Sounders_1700
Sporting Kansas City_1700
St. Louis City_1700
Toronto FC_1700
Vancouver Whitecaps_1700`;

export let soccerLeaguesInfo = {
    //Format: [country, name, teams, roundRobin, numChampions, numSecondary, numRelegations]
    'englandLeague': ['England', 'Premier League', englandTeams, 2, 4, 4, 3],
    'spainLeague': ['Spain', 'La Liga', spainTeams, 2, 4, 4, 3],
    'italyLeague': ['Italy', 'Serie A', italyTeams, 2, 4, 4, 3],
    'germanyLeague': ['Germany', 'Bundesliga', germanyTeams, 2, 4, 3, 2.5],
    'franceLeague': ['France', 'Ligue 1', franceTeams, 2, 3, 3, 4],
    'portugalLeague': ['Portugal', 'Primeira Liga', portugalTeams, 2, 3, 3, 2.5],
    'netherlandsLeague': ['Netherlands', 'Eredivisie', netherlandsTeams, 2, 2, 3, 2.5],
    'brazilLeague': ['Brazil', 'Série A', brazilTeams, 2, 6, 6, 4],
    'argentinaLeague': ['Argentina', 'Primera División', argentinaTeams, 1, 6, 6, 3],
    'mexicoLeague': ['Mexico', 'Liga MX', mexicoTeams, 1, 4, 0, 0],
    'usaLeague': ['United States', 'Major League Soccer', usaTeams, 1, 4, 0, 0],
}