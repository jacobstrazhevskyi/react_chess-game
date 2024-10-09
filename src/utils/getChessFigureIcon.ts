import { aux } from '../auх/chessFiguresIcons';
import { Figure } from '../types/Figure';

const { figuresIcons } = aux;

export const getChessFigureIcon = (figureType: Figure['figureType']) => figuresIcons[figureType];
