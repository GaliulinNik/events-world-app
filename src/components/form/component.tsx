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
  const handleClickSignIn = () => {
    //обработка кнопки Войти
    fetch("http://localhost:3000", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userEmail,
        password: userPassword,
      }),
    }).then((response) => {
      console.log("send data user");
    });
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
  //забираем данные
  const [userPassword, setUserPassword] = useState<string>("");
  //обработка изменений
  const handleChangePassword = (event: any) => {
    setUserPassword(event.target.value);
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
            onChange={(event: any) => handleChangePassword(event)}
            value={userPassword}
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
