export enum Events {
  SCREEN_VIEW = 'screen_view',
}

export const gaPushEvent = (event: Events, additionalParams?: object) => {
  // @ts-expect-error It is defined but it's not
  const { dataLayer } = window;
  console.log(dataLayer);
  if (dataLayer) {
    dataLayer.push({ event, ...additionalParams });
  } else {
    // TODO ERROR LOG
  }
};
