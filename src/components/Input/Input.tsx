import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  endAdornment?: React.ReactNode;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  value: string;
  disabled?:boolean
  style?:{}
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value,disabled,style }) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} style={style} onChange={onChange} disabled={disabled}/>
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`;

const StyledInput = styled.input`
  background: none;
  border: 0;
  // color: ${(props) => props.theme.color.grey[600]};
  color: #202020;
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  font-family: 'Lean', sans-serif;
  // font-weight: bold;
  width: 100%; 
`;

export default Input;
