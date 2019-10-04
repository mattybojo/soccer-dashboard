import { TeamPickerService } from './../../shared/team-picker.service';
import { TeamPicker, TeamData, FormattedTeamPicker } from './../../shared/models/team-picker.model';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.scss']
})
export class TeamPickerComponent implements OnInit {

  pickerData: TeamPicker;
  teamsData: [TeamData, TeamData] = [new TeamData(), new TeamData()];
  availablePlayers: string[];
  selectedPlayer: string;
  isConfirmDisabled: boolean = false;
  currentTeamData: Partial<TeamPicker>;
  team: string;
  teamData$: Observable<FormattedTeamPicker>;

  constructor(private teamPickerService: TeamPickerService) {}

  ngOnInit() {
    const url: string = window.location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      this.team = httpParams.get('team');
    }
    this.processTeamPickerResponse();
  }

  processTeamPickerResponse(): void {
    let picker: FormattedTeamPicker;

    this.teamData$ = this.teamPickerService.getTeamData()
      .pipe(
        mergeMap((teamPicker: TeamPicker[]) => {
          picker = teamPicker[0];
          if (this.team === 'white' || !this.team) {
            picker.myTeam = picker.whiteTeam;
            picker.myTeamLabel = 'White Team';
            picker.opposingTeam = picker.darkTeam;
            picker.opposingTeamLabel = 'Dark Team';
          } else if (this.team === 'dark') {
            picker.myTeam = picker.darkTeam;
            picker.myTeamLabel = 'Dark Team';
            picker.opposingTeam = picker.whiteTeam;
            picker.opposingTeamLabel = 'White Team';
          }
          this.availablePlayers = picker.availablePlayers.split(',');
          return of(picker);
        })
      );
  }

  parsePlayerList(playerList: string, isMyTeam: boolean): string[] {
    const playerArray = playerList.split(',');
    if (this.selectedPlayer && isMyTeam) {
      (playerArray[0].length) ? playerArray.push(this.selectedPlayer) : playerArray[0] = this.selectedPlayer;
    }
    return (playerArray[0].length) ? playerArray : null;
  }

  parseAvailablePlayers(): string[] {
    const availablePlayers: string[] = this.availablePlayers;
    let index: number;
    if (this.selectedPlayer) {
      index = this.availablePlayers.findIndex(x => x === this.selectedPlayer);
      if (index >= 0) {
        availablePlayers.splice(index, 1);
      } else {
        this.availablePlayers.push(this.selectedPlayer);
      }
    }

    return availablePlayers;
  }

  drop(event: CdkDragDrop<string[]>, isReorderList: boolean): void {
    if (event.previousContainer !== event.container) {
      if (isReorderList) {
        this.selectedPlayer = event.previousContainer.data[event.previousIndex];
      } else {
        this.selectedPlayer = null;
      }
    }
  }

  isAvailablePlayerDisabled(myTeam: string, opposingTeam: string): boolean {
    // Dark team picks first -- dark will always have the same or more players
    let isDisabled: boolean = false;

    let myTeamNumPlayers = (myTeam.match(/,/g) || []).length;
    let oppTeamNumPlayers = (opposingTeam.match(/,/g) || []).length;

    myTeamNumPlayers = (myTeamNumPlayers > 0 || myTeam.length > 0) ? myTeamNumPlayers + 1 : myTeamNumPlayers;
    oppTeamNumPlayers = (oppTeamNumPlayers > 0  || opposingTeam.length > 0) ? oppTeamNumPlayers + 1 : oppTeamNumPlayers;

    if (this.selectedPlayer) {
      isDisabled = true;
    }
    if (!this.team) {
      isDisabled = true;
    }
    if (this.team === 'white' && myTeamNumPlayers === oppTeamNumPlayers) {
      isDisabled = true;
    }
    if (this.team === 'dark' && myTeamNumPlayers > oppTeamNumPlayers) {
      isDisabled = true;
    }
    return isDisabled;
  }

  isTeamPlayerDisabled(player: string): boolean {
    let isDisabled: boolean = true;
    if (this.selectedPlayer && this.selectedPlayer === player) {
      isDisabled = false;
    }
    return isDisabled;
  }

  noReturnPredicate(): boolean {
    return false;
  }

  private processPlayerPick(myTeam: string): void {
    let playerIndex: number;

    playerIndex = this.availablePlayers.findIndex(x => x === this.selectedPlayer);
    this.availablePlayers.splice(playerIndex, 1);
    this.currentTeamData.availablePlayers = this.availablePlayers.join(',');

    if (myTeam.length) {
      myTeam = myTeam.concat(',');
    }

    if (this.team === 'white') {
      this.currentTeamData.whiteTeam = myTeam.concat(this.selectedPlayer);
    } else if (this.team === 'dark') {
      this.currentTeamData.darkTeam = myTeam.concat(this.selectedPlayer);
    }
  }

  onSubmit(collectionId: string, myTeam: string): void {
    // Disable button
    this.isConfirmDisabled = true;

    this.currentTeamData = new TeamPicker();

    this.currentTeamData.id = collectionId;

    this.processPlayerPick(myTeam);

    // Set selected player to null
    this.selectedPlayer = null;

    // Save to firebase
    this.teamPickerService.saveTeamData(this.currentTeamData).subscribe(() => this.isConfirmDisabled = false);
  }
}
