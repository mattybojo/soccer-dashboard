import { PlayerService } from './../../shared/services/player.service';
import { TeamPicker, TeamType, TeamData } from './../../shared/models/team-picker.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ChatComponent } from './../../team-picker/shared/chat/chat.component';
import { Player } from './../../shared/models/player.model';
import { TeamPickerService } from './../../shared/services/team-picker.service';
import { faUserCheck, faUserMinus, faUser } from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-admin-team-picker',
  templateUrl: './admin-team-picker.component.html',
  styleUrls: ['./admin-team-picker.component.scss']
})
export class AdminTeamPickerComponent implements OnInit {

  @ViewChild('chat', { static: false }) chat: ChatComponent;

  TeamType: TeamType;
  pickerData: TeamPicker;
  teamsData: [TeamData, TeamData, TeamData, TeamData] = [new TeamData(), new TeamData(), new TeamData(), new TeamData()];
  team: string;
  playerCounts: [number, number, number, number];
  faUserCheck = faUserCheck;
  faUserMinus = faUserMinus;
  faUser = faUser;

  constructor(private teamPickerService: TeamPickerService, private playerService: PlayerService) {}

  ngOnInit() {
    this.processTeamPickerResponse();
  }

  processTeamPickerResponse(): void {
    const self = this;
    let playerList: string[];
    let availableCount: number;
    let myTeamCount: number;
    let oppTeamCount: number;
    let playerIndex: number;
    let playersInPool: string[];
    let remainingPlayers: Player[];

    const obsArray: Observable<any>[] = [];

    const teamData$ = this.teamPickerService.getTeamData();
    const players$ = this.playerService.getPlayers();

    obsArray.push(teamData$);
    obsArray.push(players$);

    combineLatest(obsArray).subscribe(obs => {
      self.pickerData = obs[0][0];
      remainingPlayers = cloneDeep(obs[1]);

      playerList = self.pickerData.availablePlayers.split(',');
      playerList = (playerList && playerList.length > 0 && playerList[0].length > 0) ? playerList.sort() : null;
      self.teamsData[TeamType.AVAILABLE] = { players: playerList, captain: null, label: 'Available'};
      availableCount = (playerList) ? playerList.length : 0;

      playerList = playerList == null ? [] : playerList;
      playersInPool = playerList.concat(self.pickerData.darkTeam.split(',')).concat(self.pickerData.whiteTeam.split(','));

      playersInPool.forEach((playerName: string) => {
        playerIndex = remainingPlayers.findIndex(player => player.name === playerName);
        remainingPlayers.splice(playerIndex, 1);
      });

      self.teamsData[TeamType.REMAINING] = { players: remainingPlayers.map(x => x.name).sort(), captain: null, label: 'Out'};

      playerList = self.pickerData.darkTeam.split(',');
      self.teamsData[TeamType.MY_TEAM] = { players: playerList, captain: playerList[0], label: 'Dark Team'};
      myTeamCount = playerList.length;
      playerList = self.pickerData.whiteTeam.split(',');
      self.teamsData[TeamType.OPP_TEAM] = { players: playerList, captain: playerList[0], label: 'White Team'};
      oppTeamCount = playerList.length;

      self.playerCounts = [availableCount, myTeamCount, oppTeamCount, remainingPlayers.length];
    });
  }

  addPlayerToTeam(team: string, player: string): string {
    let newTeam: string;

    if (team && team.length > 0) {
      newTeam = team.concat(`,${player}`);
    } else {
      newTeam = player;
    }

    return newTeam;
  }

  removePlayerFromTeam(team: string, player: string): string {
    let newTeam: string;

    newTeam = team.replace(`${player}`, '');
    newTeam = newTeam.replace(',,', ',');
    if (newTeam.startsWith(',')) {
      newTeam = newTeam.substr(1);
    } else if (newTeam.endsWith(',')) {
      newTeam = newTeam.substr(0, newTeam.length - 1);
    }

    return newTeam;
  }

  onClick(player: string, fromTeam: TeamType, toTeam: TeamType): void {

    // As long as they're on a "team", remove them from the appropriate place
    switch (fromTeam) {
      case TeamType.AVAILABLE:
        this.pickerData.availablePlayers = this.removePlayerFromTeam(this.pickerData.availablePlayers, player);
        break;
      case TeamType.DARK_TEAM:
        this.pickerData.darkTeam = this.removePlayerFromTeam(this.pickerData.darkTeam, player);
        break;
      case TeamType.WHITE_TEAM:
        this.pickerData.whiteTeam = this.removePlayerFromTeam(this.pickerData.whiteTeam, player);
        break;
    }

    // As long as they're still on a "team", add them to the appropriate place
    switch (toTeam) {
      case TeamType.AVAILABLE:
        this.pickerData.availablePlayers = this.addPlayerToTeam(this.pickerData.availablePlayers, player);
        break;
      case TeamType.DARK_TEAM:
        this.pickerData.darkTeam = this.addPlayerToTeam(this.pickerData.darkTeam, player);
        break;
      case TeamType.WHITE_TEAM:
        this.pickerData.whiteTeam = this.addPlayerToTeam(this.pickerData.whiteTeam, player);
        break;
    }

    // TODO: Testing local changes
    /*
    if (fromTeam === TeamType.REMAINING) {
      this.teamsData[3].players = this.removePlayerFromTeam(this.teamsData[3].players.join(','), player).split(',');
    }
    if (toTeam === TeamType.REMAINING) {
      this.teamsData[3].players = this.addPlayerToTeam(this.teamsData[3].players.join(','), player).split(',');
    }
    this.teamsData[3].players = this.teamsData[3].players && this.teamsData[3].players[0] && this.teamsData[3].players[0].length ? this.teamsData[3].players : null;

    this.teamsData[0].players = this.pickerData.availablePlayers ? this.pickerData.availablePlayers.split(',') : null;
    this.teamsData[1].players = this.pickerData.darkTeam ? this.pickerData.darkTeam.split(',') : null;
    this.teamsData[2].players = this.pickerData.whiteTeam ? this.pickerData.whiteTeam.split(',') : null;
    */

    // Save to firebase
    this.teamPickerService.saveTeamData(this.pickerData);
  }

}
