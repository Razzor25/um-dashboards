import '@testing-library/jest-dom';
import { TextDecoder as NodeTextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
