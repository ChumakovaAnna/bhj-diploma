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
		urlXhr = `${options.url}?mail=${options.data.mail}&password${options.data.password}`;
	} else if(options.data) {
		formData = new FormData;
		for (let key in options.data) {
			console.log(key, options.data[key])
			formData.append(key, options.data[key]);
		}

		urlXhr = options.url;
	} else {
		formData = null
	}

	xhr.addEventListener("load", () => {
		if (xhr.status !== 200) {
			options.callback(err, xhr.response)
			console.log(err);
		} else {
			options.callback(null, xhr.response)
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
