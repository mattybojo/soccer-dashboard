export class Match {
  id?: string;
  date: string;
  whiteTeam: Team;
  darkTeam: Team;
  motm: string;
}

export class Team {
  players: string;
  goals: string;
  penalties?: string;
}

export class MatchPlayer {
  name: string;
  goals: number;
  ownGoals: number;
  isCaptain: boolean;
  isMotm: boolean;
}

export class PenaltyTaker {
  name: string;
  scored: boolean;
}

export class AdminPlayerData {
  name: string;
  goals: number;
}
