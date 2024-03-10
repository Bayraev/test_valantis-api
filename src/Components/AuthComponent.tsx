import React, { useState } from 'react';
import { useAppDispatch } from '../app/store';
import { asyncAuth } from '../app/features/AuthSlice';

const AuthComponent = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');

  const handleConfirm = (password: string) => {
    const credentials = {
      page: 0,
      password,
    };
    dispatch(asyncAuth(credentials));
  };

  return (
    <div className="auth_container">
      <span>
        {' '}
        Из-за ошибки SSL протокола, чтобы получить доступ к бд надо отключить google origin policy.
      </span>
      <div className="auth_block">
        <input
          type="password"
          placeholder="Пароль: Valantis"
          className="auth_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleConfirm(password)}>{'>'}</button>
      </div>
    </div>
  );
};

export default AuthComponent;
