import * as firebase from 'firebase';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

console.log('Uploading data to the database with the following config:\n');

console.log(JSON.stringify(config));

console.log('\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n');

firebase.initializeApp(config);

const db = firebase.firestore();

async function uploadData() {
  uploadPlayers();
  uploadStats();
  uploadMatches();
  uploadTeamPicker();
}

async function uploadPlayers() {
  const players = db.collection('players');

  const playerList: string[] = ['Akachi', 'Anson', 'Ashan', 'Christian', 'Daniel', 'Eric', 'Fernando', 'Goce',
    'Igor', 'Jason', 'Jeff', 'JM', 'Joe', 'Johan', 'John', 'Kenneth', 'Matt Bojo', 'Matt Brunson', 'Matt Weaver',
    'Mike', 'Nawid', 'Sab', 'Shane', 'Sina', 'Sundev', 'Uffe', 'Vishnu', 'Vlad', 'Walt', 'Zoran'];

  playerList.forEach((player: string) => {
    players.add({ name: player });
  });
}

async function uploadStats() {
  const season1 = db.collection('season1');

  season1.add({
    name: 'Akachi',
    wins: 0,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0
  });

  season1.add({
    name: 'Anson',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0
  });

  season1.add({
    name: 'Ashan',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 1
  });

  season1.add({
    name: 'Christian',
    wins: 3,
    captainWins: 0,
    goals: 5,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 0
  });

  season1.add({
    name: 'Daniel',
    wins: 3,
    captainWins: 1,
    goals: 5,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 1
  });

  season1.add({
    name: 'Eric',
    wins: 3,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 0
  });

  season1.add({
    name: 'Fernando',
    wins: 3,
    captainWins: 0,
    goals: 1,
    ownGoals: 1,
    gamesPlayed: 8,
    cleanSheets: 1
  });

  season1.add({
    name: 'Goce',
    wins: 2,
    captainWins: 0,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 1
  });

  season1.add({
    name: 'Igor',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Jason',
    wins: 2,
    captainWins: 0,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1
  });

  season1.add({
    name: 'Jeff',
    wins: 5,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 1
  });

  season1.add({
    name: 'JM',
    wins: 6,
    captainWins: 0,
    goals: 10,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 1
  });

  season1.add({
    name: 'Joe',
    wins: 4,
    captainWins: 0,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 1
  });

  season1.add({
    name: 'Johan',
    wins: 6,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 2
  });

  season1.add({
    name: 'John',
    wins: 4,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 9,
    cleanSheets: 2
  });

  season1.add({
    name: 'Kenneth',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 0
  });

  season1.add({
    name: 'Matt Bojo',
    wins: 2,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1
  });

  season1.add({
    name: 'Matt Brunson',
    wins: 1,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0
  });

  season1.add({
    name: 'Matt Weaver',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Mike',
    wins: 4,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 0
  });

  season1.add({
    name: 'Nawid',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0
  });

  season1.add({
    name: 'Sab',
    wins: 5,
    captainWins: 1,
    goals: 1,
    ownGoals: 1,
    gamesPlayed: 10,
    cleanSheets: 2
  });


  season1.add({
    name: 'Shane',
    wins: 8,
    captainWins: 1,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 2
  });

  season1.add({
    name: 'Sina',
    wins: 0,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 1,
    cleanSheets: 0
  });

  season1.add({
    name: 'Sundev',
    wins: 5,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 0
  });

  season1.add({
    name: 'Uffe',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0
  });

  season1.add({
    name: 'Vishnu',
    wins: 0,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Vlad',
    wins: 5,
    captainWins: 1,
    goals: 8,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 1
  });

  season1.add({
    name: 'Walt',
    wins: 2,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Zoran',
    wins: 6,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 9,
    cleanSheets: 1
  });
}

async function uploadMatches() {
  const matches = db.collection('matches');


  matches.add({
    date: '09-28-2019',
    whiteTeam: {
      players: 'Matt Bojo,Zoran,Shane,Johan,John,Sab,Daniel,Joe,Goce,Ashan',
      goals: 'Joe,Sab,Daniel,Shane'
    },
    darkTeam: {
      players: 'Fernando,Igor,Christian,JM,Kenneth,Sundev,Nawid,Visnhu,Mike,Jeff',
      goals: ''
    },
    motm: ''
  });

  matches.add({
    date: '09-21-2019',
    whiteTeam: {
      players: 'Akachi,Zoran,Christian,Vlad,Matt Bojo,John,Jason,Anson,Goce,Daniel,Kenneth,Walt',
      goals: 'Vlad,Goce'
    },
    darkTeam: {
      players: 'Sab,Igor,JM,Johan,Shane,Fernando,Sundev,Mike,Joe,Nawid,Jack,Eric',
      goals: 'Fernando,JM,Joe'
    },
    motm: ''
  });

  matches.add({
    date: '09-14-2019',
    whiteTeam: {
      players: 'Daniel,Igor,Christian,Kenneth,Shane,Nawid,Jeff,Ashan,Joe',
      goals: 'Joe,Christian',
      penalties: 'Daniel:N,Kenneth:Y,Shane:Y,Nawid:Y,Christian:Y,Joe:Y,Jeff:Y'
    },
    darkTeam: {
      players: 'Anson,Zoka,JM,Jason,Sab,Mike,John,Matt Brunson,Akachi',
      goals: 'Jason,JM',
      penalties: 'Zoka:Y,Jason:Y,Akachi:Y,Sab:Y,JM:Y,Anson:N,Mike:N'
    },
    motm: ''
  });

  matches.add({
    date: '09-07-2019',
    whiteTeam: {
      players: 'Mike,Shane,Vlad,JM,Johan,Sab,Jeff,Zoran,Joe',
      goals: 'JM,Vlad,JM'
    },
    darkTeam: {
      players: 'Walt,Christian,Kenneth,Jason,Sundev,Uffe,Daniel,Akachi,Anson',
      goals: 'Jason'
    },
    motm: ''
  });

  matches.add({
    date: '08-31-2019',
    whiteTeam: {
      players: 'Matt Brunson,Zoran,Christian,Vlad,Eric,Sab,Sundev,Goce,John,Fernando',
      goals: 'Vlad,Vlad'
    },
    darkTeam: {
      players: 'Kenneth,Mike,JM,Johan,Daniel,Matt Weaver,Manbir,Matt Bojo,Joe,Akachi',
      goals: 'Joe'
    },
    motm: ''
  });

  matches.add({
    date: '08-24-2019',
    whiteTeam: {
      players: 'JM,Mike,Sab,Goce,Kenneth,Fernando,Ashan,Matt Bojo,John',
      goals: 'Goce'
    },
    darkTeam: {
      players: 'Sundev,Zoran,Christian,Shane,Vlad,Walt,Manbir,Matt Weaver,Eric',
      goals: 'Christian,Walt'
    },
    motm: ''
  });

  matches.add({
    date: '08-17-2019',
    whiteTeam: {
      players: 'Shane,Zoran,JM,Vlad,Eric,Kenneth,Sundev,Walt,Kyle',
      goals: 'Vlad,Fernando (OG),Vlad,Eric,Shane'
    },
    darkTeam: {
      players: 'Christian,Mike,Johan,Jeff,Sam,Fernando,Sab,Daniel,John',
      goals: 'Christian,Sam'
    },
    motm: ''
  });

  matches.add({
    date: '08-10-2019',
    whiteTeam: {
      players: 'Vlad,JM,Shane,Fernando,Johan,Jeff,Jason,Sab,John',
      goals: 'Vlad,JM,Vlad,JM'
    },
    darkTeam: {
      players: 'Vishnu,Christian,Daniel,Kenneth,Goce,Mike,Sam,Joe,David',
      goals: ''
    },
    motm: ''
  });

  matches.add({
    date: '08-03-2019',
    whiteTeam: {
      players: 'John,Zoran,Christian,Matt Weaver,JM,Johan,Jeff,Sundev,Nawid,Uffe',
      goals: 'JM,Christian,JM'
    },
    darkTeam: {
      players: 'Sam,Mike,Shane,Kenneth,Fernando,Daniel,Sab,Anson,Matt Brunson,Goce',
      goals: 'Daniel,Daniel'
    },
    motm: ''
  });

  matches.add({
    date: '07-27-2019',
    whiteTeam: {
      players: 'Eric,Zoran,Christian,Kenneth,Sab,Vlad,Goce,Sina,Vishnu,Joe',
      goals: 'Christian,Sina'
    },
    darkTeam: {
      players: 'Johan,Daniel,Fernando,Jason,Jeff,JM,John,Matt Bojo,Mike,Shane',
      goals: 'JM,Daniel,Sab (OG),JM,Daniel'
    },
    motm: ''
  });
}

async function uploadTeamPicker() {
  const teamPicker = db.collection('teamPicker');

  teamPicker.add({
    availablePlayers: 'Kenneth,Zoran,Shane,Igor,Goce,Sundev,Matt Bojo,Daniel',
    darkTeam: '',
    whiteTeam: ''
  });
}


uploadData()
  .then(() => {
    console.log('Writing data, exiting in 10 seconds ...\n\n');

    setTimeout(() => {

      console.log('\n\n\nData Upload Completed.\n\n\n');
      process.exit(0);

    }, 10000);

  })
  .catch(err => {
    console.log('Data upload failed, reason:', err, '\n\n\n');
    process.exit(-1);
  });


