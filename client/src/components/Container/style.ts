import styled from "styled-components";

interface ContainerProps {
    width?: string;
    height?: string;
    padding?: string;
    justify?: string;
    align?: string;
    direction?: string;
    backgroundColor?: string;
    margin?: string;
    gap?: string;
    border?: string;
    overflow?: string;
    flexWrap?: string;
}

export const ContainerStyle = styled.div<ContainerProps>`
    display: flex;
    width: ${(props: ContainerProps) => props.width || "100%"};
    height: ${(props: ContainerProps) => props.height || "100%"};
    padding: ${(props: ContainerProps) => props.padding || "0"};
    justify-content: ${(props: ContainerProps) => props.justify || "center"};
    align-items: ${(props: ContainerProps) => props.align || "center"};
    flex-direction: ${(props: ContainerProps) => props.direction || "column"};
    background-color: ${(props: ContainerProps) => props.backgroundColor || "transparent"};
    border-radius: 8px;
    gap: ${(props: ContainerProps) => props.gap || "0"};
    border: ${(props: ContainerProps) => props.border || "none"};
    overflow: ${(props: ContainerProps) => props.overflow || "auto"};
    max-width: 500px;
    flex-wrap: ${(props: ContainerProps) => props.direction === "row" ? "wrap" : "nowrap"};
`