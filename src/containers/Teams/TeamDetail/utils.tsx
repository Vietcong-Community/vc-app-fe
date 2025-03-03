import { ITeamPlayers } from '../../../api/hooks/teams/interfaces';
import { TeamMemberStatus, TeamRole } from '../../../constants/enums';

export const isUserOnlyOwner = (currentUserId?: string, players?: ITeamPlayers[]) => {
  const owners = players?.filter(
    (player) => player.status === TeamMemberStatus.ACTIVE && player.role === TeamRole.OWNER,
  );

  return !!(owners?.length === 1 && owners?.find((item) => item.user.id === currentUserId));
};

export const showRemovePlayerIcon = (
  userIsAdmin: boolean,
  userIsOwner: boolean,
  currentUserId?: string,
  userId?: string,
  players?: ITeamPlayers[],
): boolean => {
  if (!currentUserId && !userIsAdmin && !userIsOwner) {
    return false;
  }
  const currentUserInTeam = players?.find((player) => player.id === currentUserId);

  if (
    !!currentUserInTeam &&
    (currentUserInTeam.role !== TeamRole.OWNER ||
      (currentUserInTeam.role === TeamRole.OWNER && !isUserOnlyOwner(currentUserId, players)))
  ) {
    return true;
  }

  if (userIsAdmin && !isUserOnlyOwner(userId, players)) {
    return true;
  }

  return false;
};
