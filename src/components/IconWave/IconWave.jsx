const IconWave = (props) => {
  return (
    <svg
      className="card__color-bar-wave"
      width="100%"
      height="10"
      viewBox="0 0 159 10"
      stroke={props.color}
    >
      <g fill="none" fillRule="nonzero" strokeLinecap="square" strokeWidth="5">
        <path d="M4 4l9.257 2.463L21.367 4l7.927 2.463L38.736 4l9.117 2.463L56.103 4l8.685 2.463L73.472 4l8.684 2.463L90.84 4l8.684 2.463L108.208 4l8.684 2.463L125.576 4l8.684 2.463L142.943 4M146.423 4l9.257 2.463" />
      </g>
    </svg>
  );
};

export default IconWave;
