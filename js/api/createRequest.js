/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest();
	const formData = new FormData;
	xhr.withCredentials = true;
	xhr.responseType = "json";
	let urlXhr;

	if (options.method === "GET") {
		urlXhr = `${options.url}?mail=${options.data.mail}&password${options.data.password}`;
	} else {
		for (let key in options.data) {
			formData.append(key, options.data[key]);
		}

		urlXhr = options.url;
	}

	xhr.addEventListener("load", () => {
		if (xhr.status != 200) {
			options.callback(err, xhr.response)
			console.log(err);
		} else {
			options.callback(null, xhr.response)
			console.log(xhr.response);
		}
	});

	xhr.open(options.method, urlXhr);
	
	try {
		xhr.send(formData);
	}
	catch (err) {
		callback(err);
	}

	return xhr;
};
