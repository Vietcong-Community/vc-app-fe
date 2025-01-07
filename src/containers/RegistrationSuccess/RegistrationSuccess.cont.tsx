import React from 'react';

import { Routes } from '../../routes/enums';

export const RegistrationSuccessCont: React.FC = () => {
  return (
    <>
      <h1>Registrace byla úspěšná</h1>
      <p>Jménem tvůrců webu Trappera, Bascciho, M.Polcara a celé Vietcong komunity Vám děkujeme za registraci.</p>
      <p>
        Nyní se stačí přihlásit do MIX ligy a začít hrát. Více informací o fungování ligy najdete{' '}
        <a href={Routes.LEAGUES_OVERVIEW}>ZDE</a>
      </p>
    </>
  );
};
