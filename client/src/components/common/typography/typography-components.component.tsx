import styled from 'styled-components';
import {
  FontFamily,
  FontSizeDesktop,
  FontSizeMobile,
  FontWeight,
  Color,
  Breakpoints,
} from '../constants';

interface TypographyProps {
  light?: boolean;
  medium?: boolean;
}

export const BodyText = styled.p<TypographyProps>`
  color: ${({ light }) => (light ? Color.White.base : Color.Black.base)};
  font-family: ${FontFamily.Primary};
  font-weight: ${({medium}) => medium ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSizeMobile.Medium};

  @media all and (min-width: ${Breakpoints.Mobile}) {
    font-size: ${FontSizeDesktop.Medium};
  }
`;

export const Label = styled.label<TypographyProps>`
  color: ${({ light }) => (light ? Color.White.base : Color.Black.base)};
  font-family: ${FontFamily.Primary};
  font-weight: ${({medium}) => medium ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSizeMobile.Medium  };

  @media all and (min-width: ${Breakpoints.Mobile}) {
    font-size: ${FontSizeDesktop.Small};
  }
`;

export const H1 = styled.h1<TypographyProps>`
  color: ${({ light }) => (light ? Color.White.base : Color.Black.base)};
  font-family: ${FontFamily.Primary};
  font-weight: ${({medium}) => medium ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSizeMobile.XLarge};

  @media all and (min-width: ${Breakpoints.Mobile}) {
    font-size: ${FontSizeDesktop.XLarge};
  }
`;

export const H2 = styled.h2<TypographyProps>`
  color: ${({ light }) => (light ? Color.White.base : Color.Black.base)};
  font-family: ${FontFamily.Primary};
  font-weight: ${({medium}) => medium ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSizeMobile.Large};

  @media all and (min-width: ${Breakpoints.Mobile}) {
    font-size: ${FontSizeDesktop.Large};
  }
`;

export const MiniLabel = styled.label<TypographyProps>`
  color: ${({ light }) => (light ? Color.White.base : Color.Black.base)};
  font-family: ${FontFamily.Primary};
  font-weight: ${({medium}) => medium ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSizeMobile.XSmall};

  @media all and (min-width: ${Breakpoints.Mobile}) {
    font-size: ${FontSizeDesktop.XSmall};
  }
`;
