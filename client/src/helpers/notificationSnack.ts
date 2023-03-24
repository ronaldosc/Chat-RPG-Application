import {
  SnackbarOrigin,
  SharedProps,
  enqueueSnackbar,
  SnackbarKey,
  TransitionDuration,
} from 'notistack';

type variantOption = 'default' | 'error' | 'success' | 'warning' | 'info';

export const anchorOrigin: SharedProps & SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
  preventDuplicate: true,
};

export const transitionDurationDelayed: TransitionDuration = {
  enter: 100,
  exit: 1500,
};

export function customEnqueueSnackbar(
  info: string,
  variant?: variantOption,
  anchorOrigin?: keyof SharedProps & SnackbarOrigin,
  transition?: { enter: number; exit: number },
): SnackbarKey {
  return enqueueSnackbar(info, {
    variant: variant ?? 'warning',
    transitionDuration: {
      enter: transition?.enter ?? 100,
      exit: transition?.exit ?? 400,
    },
    anchorOrigin,
  });
}
