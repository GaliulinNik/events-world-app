import React from "react";
import "./styles.css";

interface OverlayProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const { active, setActive } = props;
  const handleClickSign = () => {
    setActive(!active);
  };
  return (
    <div className="overlay">
      <div className="overlay-panel overlay-left">
        <h1>Добро пожаловать!</h1>
        <p>Чтобы оставаться на связи с нами, пожалуйста, войдите</p>
        <button className="ghost" id="signIn" onClick={handleClickSign}>
          Войти
        </button>
      </div>
      <div className="overlay-panel overlay-right">
        <h1>Привет, друг!</h1>
        <p>Введите свои личные данные и начните путешествие вместе с нами</p>
        <button className="ghost" id="signUp" onClick={handleClickSign}>
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default Overlay;
