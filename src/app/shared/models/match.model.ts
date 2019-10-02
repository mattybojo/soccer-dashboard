export class Match {
  date: string;
  whiteTeam: Team;
  darkTeam: Team;
  motm: string;
}

export class Team {
  players: string;
  goals: string;
}

export class MatchPlayer {
  name: string;
  goals: number;
  ownGoals: number;
  isCaptain: boolean;
  isMotm: boolean;
}