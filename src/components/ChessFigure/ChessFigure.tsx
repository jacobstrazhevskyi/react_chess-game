import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChessFigureIcon } from '../../utils/getChessFigureIcon';
import { Figure } from '../../types/Figure';

type Props = {
  figure: Figure,
};

export const ChessFigure: React.FC<Props> = ({
  figure,
}) => (
  <FontAwesomeIcon
    icon={getChessFigureIcon(figure.figureType)}
    color={figure.hexColor}
    style={{
      stroke: 'black',
      strokeWidth: 30,
      strokeLinejoin: 'round',
      fontSize: '40px',
    }}
  />
);
