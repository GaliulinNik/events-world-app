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
  interface IFormValues {
    userName: string;
    userEmail: string;
    userPassword: string;
    userConfirmpassword: string;
  }

  const [values, setValues] = useState<IFormValues>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmpassword: "",
  });

  interface IErrors extends Partial<IFormValues> {}
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = (values: IFormValues) => {
    //функция для различных проверок полей формы
    const errors: Partial<IFormValues> = {};
    if (!values.userEmail) {
      errors.userEmail = "Не указана почта";
    }
    if (!values.userPassword) {
      errors.userPassword = "Не указан пароль";
    }
    if (!values.userName && type === "signup") {
      errors.userName = "Не указано имя";
    }
    if (
      values.userPassword !== values.userConfirmpassword &&
      type === "signup"
    ) {
      errors.userConfirmpassword = "Пароли не совпадают";
    }
    if (
      errors.userEmail == null &&
      !values.userEmail.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.userEmail = "Указана некорректная почта";
    }
    if (
      errors.userPassword == null &&
      !values.userPassword.match(/^(?=.*[a-z]).{1,8}$/)
    ) {
      errors.userPassword = "Некорректный пароль [a-z от 4 до 8]";
    }
    return errors;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // провести валидацию значений полей
    const errors = validate(values);

    if (Object.keys(errors).length === 0) {
      // форма валидна, можно отправлять данные на сервер
      setErrors({});

      //отправка
      fetch("http://localhost:4040/api/login", {
        mode: "no-cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.userEmail,
          password: values.userPassword,
        }),
      }).then((response) => {
        console.log("send data user");
      });
    } else {
      // форма невалидна, отобразить сообщения об ошибках
      console.log(errors);
      return setErrors(errors);
    }
  };

  // const handleChangePassword = (event: any) => {
  //   setUserPassword(event.target.value);
  //   localStorage.setItem("userEmail", event.target.value); //записываем
  // };

  // useEffect(() => {
  //   const userEmail = localStorage.getItem("userEmail") || ""; //забираем
  //   setUserEmail(userEmail); //теперь при обновлении страницы запись остается
  // }, []);

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
            name="userEmail"
            placeholder="Почта"
            onChange={handleChange}
            value={values.userEmail}
          />
          <h3>{errors.userEmail}</h3>
          <InputText
            type="password"
            name="userPassword"
            placeholder="Пароль"
            onChange={handleChange}
            value={values.userPassword}
          />
          <h3>{errors.userPassword}</h3>
          <a href="#">Забыли пароль</a>
          <button onClick={handleSubmit}>Войти</button>
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
            name="userName"
            placeholder="Имя пользователя"
            onChange={handleChange}
            value={values.userName}
          />
          <h3>{errors.userName}</h3>
          <InputText
            type="email"
            name="userEmail"
            placeholder="Почта"
            onChange={handleChange}
            value={values.userEmail}
          />
          <h3>{errors.userEmail}</h3>
          <InputText
            type="password"
            name="userPassword"
            placeholder="Пароль"
            onChange={handleChange}
            value={values.userPassword}
          />
          <h3>{errors.userPassword}</h3>
          <InputText
            type="password"
            name="userConfirmpassword"
            placeholder="Повтор пароля"
            onChange={handleChange}
            value={values.userConfirmpassword}
          />
          <h3>{errors.userConfirmpassword}</h3>
          <button onClick={handleSubmit}>Зарегистрироваться</button>
        </form>
      );
      break;
  }
  return content!;
};
