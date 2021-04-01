import React from 'react';
import {SketchPicker} from 'react-color';
import tinyColor from 'tinycolor2';
import PropTypes from 'prop-types';

class ColorPicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  };

  handleClose = () => {
    this.setState({displayColorPicker: false});
  };

  handleChange = (color) => {
    this.props.onChange
    && this.props.onChange(tinyColor(color.rgb)[color.rgb.a === 1 ? 'toHexString' : 'toHex8String']());
  };

  render() {
    const {value, onChange, ...props} = this.props;

    const styles = {
      color: {
        height: '22px',
        borderRadius: '2px',
        background: value,
        boxShadow: value === '#ffffff' ? '0 0 0 1px rgba(0,0,0,.1)' : null,
      },
      swatch: {
        width: '60px',
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    };

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color}/>
        </div>
        {this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose}/>
          <SketchPicker
            width={260}
            {...props}
            color={value}
            onChange={this.handleChange}
          />
        </div> : null}
      </div>
    );
  }
}

export default ColorPicker;
