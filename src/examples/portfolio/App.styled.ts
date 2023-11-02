import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

export const StyledCanvas = styled(Canvas)`
    height: 100vh !important;
    color: white;
    overflow: hidden;

    &:before {
        pointer-events: none;
        content: '';
        position: absolute;
        width: 100%;
        height: 300px;
        z-index: 1;
        bottom: 0;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }
`;

export const SuggestMe = styled.div`
    color: black;
`;
