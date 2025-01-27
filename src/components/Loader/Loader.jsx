import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';
const LoaderComponent = ({ width, height, label }) => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loaderOverlay}>
        <ColorRing
          visible={true}
          height={height}
          width={width}
          ariaLabel="color-ring-loading"
          colors={['#9be1a0', '#f0eff4', '#ffffffea', '#87d28d', '#323f47']}
        />
      </div>

      <p className={css.loaderText}>{label}</p>
    </div>
  );
};

export default LoaderComponent;
