import { Slider } from "@mui/material";
import { styled } from "@mui/system";

export const StyledSlider = styled(Slider)`
  color: #1976d2;  
  
  & .MuiSlider-thumb {
    background-color: #fff;
    border: 2px solid currentColor;
  }
  
  & .MuiSlider-track {
    border: none;
  }
`;
