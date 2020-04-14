/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response) {
        if (response.success === true && response.data) {
          const selectList = this.element.querySelector(".accounts-select");
          selectList.innerHTML = "";
          response.data.forEach(e => {
            const item = `<option value="${e.id}">${e.name}</option>`;
            selectList.insertAdjacentHTML("beforeEnd", item);
          });
        }
      }
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response.success === true && response) {
        this.element.reset();
        App.update()
        let nameModal;
        if (options.type === "income") {
          nameModal = "newIncome";
        } else {
          nameModal = "newExpense";
        }
        const modal = App.getModal(nameModal);
        modal.close();
      }
    });
  }
}
