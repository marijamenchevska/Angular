import { Action } from '../types/action.enum';
import { CurrentUser } from '../types/current-user.interface';

export default function generateMetadata(
  currentUser: CurrentUser,
  action: Action = Action.Create,
) {
  switch (action) {
    case Action.Create:
      return {
        createdBy: currentUser.email,
        updatedBy: currentUser.email,
      };
    case Action.Update:
      return {
        updatedBy: currentUser.email,
      };
    case Action.Delete:
      return {
        updatedBy: currentUser.email,
        deletedBy: currentUser.email,
      };
    default:
      return {
        createdBy: currentUser.email,
      };
  }
}
