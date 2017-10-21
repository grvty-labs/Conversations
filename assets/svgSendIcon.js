// @flow
import * as React from 'react';
import { Svg } from 'expo';

type SvgType = {
  // The fill prop refers to the color inside the shape.
  fill?: string,
  // This prop specifies the opacity of the color or the content the current object is filled with.
  fillOpacity?: number,
  //  'none' The stroke prop controls how the outline of a shape appears.
  stroke?: string,
  // The strokeWidth prop specifies the width of the outline on the current object.
  strokeWidth?: number,
  // 1 The strokeOpacity prop specifies the opacity of the outline on the current object.
  strokeOpacity?: number,
  // 'square' The strokeLinecap prop specifies the shape to be used at the end of open
  // subpaths when they are stroked. Can be either 'butt', 'square' or 'round'.
  strokeLinecap?: string,
  //  'miter' The strokeLinejoin prop specifies the shape to be used at the corners of
  // paths or basic shapes when they are stroked. Can be either 'miter', 'bevel' or 'round'.
  strokeLinejoin?: string,
  //  [] The strokeDasharray prop controls the pattern of dashes and gaps used to stroke paths.
  strokeDasharray?: Array<number>,
  //  null The strokeDashoffset prop specifies the distance into the dash pattern to start
  // the dash.
  strokeDashoffset?: number,
  x?: number, //  0 Translate distance on x-axis.
  y?: number, //  0 Translate distance on y-axis.
  rotate?: number, //  0 Rotation degree value on the current object.
  scale?: number, //  1 Scale value on the current object.
  origin?: number, //  0, 0 Transform origin coordinates for the current object.
  originX?: number, //  0 Transform originX coordinates for the current object.
  originY?: number, //  0 Transform originY coordinates for the current object.
}

type Default = {
  fill: string,
};

export default class ArrowRight extends React.Component<Default, SvgType, void> {
  static defaultProps = {
    fill: '#4A4A4A',
  };

  render() {
    const { fill } = this.props;
    return (
      <Svg
        width='16'
        height='16'
        {...this.props}
      >
        <Svg.G
          stroke='none'
          strokeWidth={1.0}
          fill='none'
          fillRule='evenodd'
        >
          <Svg.G
            x='-385.000000'
            y='-123.000000'
            fillRule='nonzero'
            fill={fill}
          >
            <Svg.G
              x='385.000000'
              y='123.000000'
            >
              <Svg.Polygon
                id='Shape'
                points='0,7 0,9 12,9 6.5,14.5 7.92,15.92 15.84,8 7.92,0.08 6.5,1.5 12,7'
              />
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}
