export class TeamPicker {
  id: string;
  availablePlayers: string;
  whiteTeam: string;
  darkTeam: string;
}

export class TeamData {
  players: string[];
  label: string;
  captain: string;
}

export enum TeamType {
  AVAILABLE = 0,
  MY_TEAM = 1,
  OPP_TEAM = 2
}
