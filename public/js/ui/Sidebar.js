/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector(".sidebar-mini");
    const burger = body.querySelector(".sidebar-toggle");

    burger.addEventListener("click", () => {
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const regist = document.querySelector(".menu-item_register");
    const registStr = "register";
    const entry = document.querySelector(".menu-item_login");
    const loginStr = "login";
    const exit = document.querySelector(".menu-item_logout");

    function openModal(name) {
      const modal = App.getModal(`${name}`);
      modal.open();
    }
    
    regist.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(registStr)
    });

    entry.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(loginStr)
    });
    
    exit.addEventListener("click", (e) => {
      e.preventDefault();
      User.logout({}, (err, response) => {
        if (response.success === true) {
          User.unsetCurrent();
          App.setState( "init" );
        }
      });
    });
  }
}
