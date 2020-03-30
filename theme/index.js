import { createGlobalStyle } from 'styled-components';
import { Style } from './style';

export const AddGlobals = createGlobalStyle`
    ${Style};
`;

export { Theme } from './Theme';