import styled from 'styled-components';

import footerBg from '../../assets/heli-footer1.webp';

export const Background = styled.footer`
  background-image: url(${footerBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 40vh;
  color: azure;
  clip-path: polygon(0 5%, 50% 0, 100% 5%, 100% 100%, 0 100%);
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
`;

export const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 40px 20px 0 20px;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.div`
  height: 35px;
  width: 35px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: azure;
  font-size: 35px;

  &:hover {
    color: gold;
    font-size: 48px;
    transition: font-size 0.3s ease;
  }
`;

export const ContactIconWrapper = styled.div`
  height: 20px;
  width: 20px;
  margin: 0 2px;
  display: flex;
  color: azure;
  font-size: 20px;

  &:hover {
    color: gold;
    font-size: 25px;
    transition: font-size 0.3s ease;
  }
`;
