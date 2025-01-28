import { ISeasonTeamItem } from '../../api/hooks/league/interfaces';
import { IMeTeams } from '../../api/hooks/teams/interfaces';
import { TeamRole } from '../../constants/enums';

export const canUserManageMatch = (userTeams: IMeTeams[], seasonTeams: ISeasonTeamItem[]) => {
  const myTeamInSeason = seasonTeams.find((item) => item.userIsMemberOfTeam);

  if (!myTeamInSeason) {
    return false;
  }

  const userTeamInSeason = userTeams.find((item) => {
    return item.team.id === myTeamInSeason?.team.team.id;
  });

  if (!userTeamInSeason) {
    return false;
  }

  return (
    userTeamInSeason.userInTeam.role === TeamRole.MATCH_ORGANIZER || userTeamInSeason.userInTeam.role === TeamRole.OWNER
  );
};
