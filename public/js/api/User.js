/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    const options = {
      data: data,
      url: this.HOST + this.URL + "/current",
      responseType: "json",
      method: "GET",
      callback: (err, response) => {
        if (response) {
          if (response.success === true && response.user) {
            this.setCurrent(response.user);
          } else {
            this.unsetCurrent();
            console.log(response.error);
          }
          callback(err, response);
        }
      }
    }

    return createRequest(options);
  }
  
  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const options = {
      data: data,
      url: this.HOST + this.URL + "/login",
      responseType: "json",
      method: "POST",
      callback: (err, response) => {
        if (response.success === true && response.user) {
          this.setCurrent(response.user);
        } else {
          console.log(`Введен неверный e-mail или пароль`);
        }
        callback(err, response);
      }
    }
    return createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const options = {
      data: data,
      url: this.HOST + this.URL + "/register",
      responseType: "json",
      method: "POST",
      callback: (err, response) => {
        if (response.success === true && response.user) {
          this.setCurrent(response.user);
        } else {
          console.log(response.error);
        }
        callback(err, response);
      }
    }
    return createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    const options = {
      data: data,
      url: this.HOST + this.URL + "/logout",
      responseType: "json",
      method: "POST",
      callback: (err, response) => {
        if (response.success === true) {
          this.unsetCurrent();
        } else {
          console.log(response.error);
        }
        callback(err, response);
      }
    }
    return createRequest(options);
  }
}

User.URL = "/user";
User.HOST = Entity.HOST;
