import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Baja',
  2: 'Media baja',
  3: 'Media',
  4: 'Media alta',
  5: 'Alta',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ value, name, onChange, readOnly }) {
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name={name}
        value={parseInt(value)}
        readOnly={readOnly}
        precision={1}
        getLabelText={getLabelText}
        onChange={onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
