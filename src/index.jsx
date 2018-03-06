import React from 'react';
import PropTypes from 'prop-types';

const transition = 'all .4s ease';

const styles = {
  line: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
  },
  bar: {
    transition,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
  },
};

export default class Barz extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.any),
    width: PropTypes.number,
    scale: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.array])),
    unit: PropTypes.string,
    bars: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.array, PropTypes.number)),
    lineStyle: PropTypes.objectOf(PropTypes.any),
    barStyle: PropTypes.objectOf(PropTypes.any),
    textStyle: PropTypes.objectOf(PropTypes.any),
  };
  static defaultProps = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    width: 300,
    scale: { min: 0, max: 100 },
    unit: '',
    bars: [],
    lineStyle: {},
    barStyle: {},
    textStyle: {},
  };

  renderBar(value, index) {
    const { width, unit, scale, lineStyle, barStyle, textStyle, labels } = this.props;
    /* eslint-disable no-param-reassign */
    let label = labels[index];
    if (Array.isArray(value)) {
      label = value[0];
      value = value[1];
    }
    /* eslint-enable no-param-reassign */
    const length = width / (scale.max - scale.min) * (value - scale.min);
    const rgb = scale.minColor.map((c, i) =>
      Math.floor(c + (scale.maxColor[i] - c) * length / width),
    );
    const color = `rgb(${rgb.join(',')})`;
    const bgColor = `rgb(${scale.bgColor.join(',')})`;
    return (
      <div key={index} style={{ ...lineStyle, position: 'relative', backgroundColor: bgColor }}>
        <div style={{ ...textStyle }}>&nbsp;</div>
        <div style={{ ...styles.bar, ...barStyle, width: length, backgroundColor: color }} />
        <div style={{ ...styles.line, ...lineStyle }}>
          <div style={{}}>
            <div style={{ float: 'left', ...textStyle }}>{label}</div>
            <div style={{ float: 'right', ...textStyle }}>
              {value}
              {unit}
            </div>
            <div style={{ clear: 'both' }} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { bars, width } = this.props;
    return (
      <div style={{ width, transition }}>{bars.map((value, ix) => this.renderBar(value, ix))}</div>
    );
  }
}
