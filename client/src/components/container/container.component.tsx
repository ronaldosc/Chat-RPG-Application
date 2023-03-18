import { ContainerStyle } from './container.styled';

interface ContainerProps {
  width?: string;
  height?: string;
  padding?: string;
  justify?: string;
  align?: string;
  direction?: string;
  backgroundColor?: string;
  // backgroundGradient?: string;
  margin?: string;
  children?: JSX.Element | JSX.Element[];
  gap?: string;
  border?: string;
  overflow?: string;
  flexWrap?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Container = ({
  width,
  height,
  padding,
  justify,
  align,
  direction,
  backgroundColor,
  margin,
  gap,
  border,
  overflow,
  flexWrap,
  children,
}: ContainerProps) => {
  return (
    <ContainerStyle
      width={width}
      height={height}
      flexWrap={flexWrap}
      padding={padding}
      justify={justify}
      align={align}
      direction={direction}
      backgroundColor={backgroundColor}
      margin={margin}
      gap={gap}
      border={border}
      overflow={overflow}
    >
      {children}
    </ContainerStyle>
  );
};
