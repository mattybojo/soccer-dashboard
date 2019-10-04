export class TeamPicker {
  id: string;
  availablePlayers: string;
  whiteTeam: string;
  darkTeam: string;
}

export class FormattedTeamPicker extends TeamPicker {
  myTeam?: string;
  myTeamLabel?: string;
  opposingTeam?: string;
  opposingTeamLabel?: string;
}

export class TeamData {
  players: string[];
  label: string;
}
