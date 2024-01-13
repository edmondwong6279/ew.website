/**
 * pause code execution by awaiting a call of this
 * @param ms millisconds you wish to sleep for
 * @returns a promise that resolves when the timer is finished
 */
export const sleep = (ms: number): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, ms));
