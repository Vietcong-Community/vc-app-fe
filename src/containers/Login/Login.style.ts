import styled, { keyframes } from 'styled-components';

// Definice animace
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ClipPath = styled.div`
  position: relative;
  background-color: #063970;
  width: 100%;
  height: 100vh;
  clip-path: polygon(0% 0%, 100% 17%, 100% 100%, 0 100%);
  color: white;
  margin-top: -285px;
`;

export const LoginText = styled.div`
  text-align: center;
  color: #fff; /* Nastavte vhodnou barvu textu */
  margin-top: 210px;
`;

export const SlideIn = styled.h1`
  opacity: 0;
  transform: translateX(-100%);
  animation: ${slideIn} 1s ease-out forwards; /* Nastavení animace */
  margin: 10px 0;
`;
