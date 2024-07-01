import {useState} from 'react';
import {SketchPicker} from 'react-color';
import tinyColor from 'tinycolor2';
import PropTypes from 'prop-types';

const ColorPicker = ({value, onChange, ...props}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleChange = (color) => {
    onChange && onChange(tinyColor(color.rgb)[color.rgb.a === 1 ? 'toHexString' : 'toHex8String']());
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const isTransparent = !value || tinyColor(value).getAlpha() === 0;

  const styles = {
    color: {
      height: '22px',
      borderRadius: '2px',
      background: isTransparent ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)' : value,
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
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color}/>
      </div>
      {displayColorPicker ? <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose}/>
        <SketchPicker
          width={260}
          {...props}
          color={value}
          onChange={handleChange}
        />
      </div> : null}
    </div>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ColorPicker;
