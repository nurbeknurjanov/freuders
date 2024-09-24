import { common } from 'store';

export const setServerWait = (waitForServer: boolean) =>
  common.hydrate.actions.setServerWait(waitForServer);

export const hydratedToClient = (hydratedToClient: boolean) =>
  common.hydrate.actions.hydratedToClient(hydratedToClient);

export const ignoreServerData = () => hydratedToClient(true);
