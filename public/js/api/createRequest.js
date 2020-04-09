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
			formData.append(key, options.data[key]);
		}

		urlXhr = options.url;
	}

	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			options.callback(null, xhr.response)
			console.log(xhr.response);
		} else {
			if(xhr.response) {
				options.callback(err, xhr.response)
				console.log(err);
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
