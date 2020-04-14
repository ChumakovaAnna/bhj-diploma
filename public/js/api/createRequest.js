/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest();
	let formData;
	xhr.withCredentials = true;
	xhr.responseType = "json";
	let urlXhr;

	if (options.method === "GET" && options.data) {
		let newUrlXhr = `${options.url}?`;
		for (let key in options.data) {
			newUrlXhr += `${key}=${options.data[key]}&`;
		}
		urlXhr = newUrlXhr.slice(0, -1);
	} else if (options.data) {
		formData = new FormData;
		for (let key in options.data) {
			formData.append(key, options.data[key]);
		}

		urlXhr = options.url;
	}

	if (options.headers) {
		xhr.headers = options.headers;
	}

	xhr.addEventListener("load", () => {
		if (xhr.status === 200) {
			options.callback(null, xhr.response)
		} else {
			if (xhr.response) {
				options.callback(err, xhr.response)
				console.log(`Ошибка createRequest`);
				console.log(err);
			} else {
				console.log(`Что-то пошло не так! xhr.response = undefined`);
			}
		}
	});


	try {
		xhr.open(options.method, urlXhr);
		if (formData) {
			xhr.send(formData);
		} else {
			xhr.send();
		}
	}
	catch (err) {
		callback(err);
	}

	return xhr;
};
