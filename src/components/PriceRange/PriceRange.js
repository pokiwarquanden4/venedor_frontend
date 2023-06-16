import styles from './PriceRange.module.scss';
import { useEffect, useState } from 'react';

function PriceRange({ min, max, value, step, onChange }) {
  const [minValue, setMinValue] = useState(value ? value.min : min);
  const [maxValue, setMaxValue] = useState(value ? value.max : max);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  return (
    <div className={styles.price_wrapper}>
      <div className={styles.price_header}>I Price</div>
      <div className={styles.price}>
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            type="range"
            value={minValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMinChange}
          />
          <input
            className={styles.input}
            type="range"
            value={maxValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMaxChange}
          />
        </div>
        <div className={styles.control_wrapper}>
          <div className={styles.control} style={{ left: `${minPos}%` }}>
            <div className={styles.control_value}>${minValue}</div>
          </div>
          <div className={styles.rail}>
            <div
              className={styles.inner_rail}
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            />
          </div>
          <div className={styles.control} style={{ left: `${maxPos}%` }}>
            <div className={styles.control_value}>${maxValue}</div>
          </div>
        </div>
      </div>
      <div className={styles.price_picture}></div>
    </div>
  );
}

export default PriceRange;
