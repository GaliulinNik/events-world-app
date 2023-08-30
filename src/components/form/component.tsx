import React, { useState, useEffect } from "react";
import "./styles.css";
import { InputText } from "../input-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceKiss,
  faFaceDizzy,
  faFaceGrin,
} from "@fortawesome/free-solid-svg-icons";
import { SocialContainer } from "../social-container/component";

export const Form = ({
  action = "#",
  type = "login",
}: {
  action: string;
  type: string;
}) => {
  const handleClickSignIn = (event: any) => {
    //обработка кнопки Войти
    console.log("handleClickSignIn", event);
  };
  const handleClickSignUp = (event: any) => {
    //обработка кнопки Зарегистрироваться
    console.log("handleClickSignUp", event);
  };

  //забираем данные
  const [userEmail, setUserEmail] = useState<string>("");
  //обработка изменений
  const handleChangeEmail = (event: any) => {
    setUserEmail(event.target.value);
    localStorage.setItem("userEmail", event.target.value); //записываем
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || ""; //забираем
    setUserEmail(userEmail); //теперь при обновлении страницы запись остается
  }, []);

  let content: JSX.Element;
  switch (type) {
    case "login":
      content = (
        <form action={action}>
          <h1>Вход</h1>
          <SocialContainer />
          <span>или зарегистрируйте свой аккаунт</span>
          <InputText
            type="email"
            placeholder="Почта"
            onChange={(event: any) => handleChangeEmail(event)}
            value={userEmail}
          />
          <InputText
            type="password"
            placeholder="Пароль"
            onChange={(event: any) => console.log(event)}
          />
          <a href="#">Забыли пароль</a>
          <button onClick={handleClickSignIn}>Войти</button>
        </form>
      );
      break;
    case "signup":
      content = (
        <form action={action}>
          <h1>Создайте пользователя</h1>
          <SocialContainer />
          <span>или используйте свою почту для входа</span>
          <InputText
            type="text"
            placeholder="Имя пользователя"
            onChange={(event: any) => console.log(event)}
          />
          <InputText
            type="email"
            placeholder="Почта"
            onChange={(event: any) => console.log(event)}
          />
          <InputText
            type="password"
            placeholder="Пароль"
            onChange={(event: any) => console.log(event)}
          />
          <InputText
            type="password"
            placeholder="Повтор пароля"
            onChange={(event: any) => console.log(event)}
          />
          <button onClick={handleClickSignUp}>Зарегистрироваться</button>
        </form>
      );
      break;
  }
  return content!;
};
