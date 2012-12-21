/**
	* Copyright (c) 2012 Karel Crombecq
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in
	* all copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	* THE SOFTWARE.
	*/
(function(Array, undefined) {
	
	function flattenData(data, template, array) {
		if (typeof(data) != typeof(template)) {
			console.log("Found mismatch between template type " + typeof(template) + " and data type " + typeof(data) + " during flatten");
		}
		else if (typeof(template) == "number" || typeof(template) == "string" || typeof(template) == "boolean") {
			array.push(data);
		}
		else if (typeof(template) == "object") {
			if (template instanceof Array) {
				array.push(data.length);
				for (var i = 0; i < data.length; ++i) {
					arguments.callee(data[i], template[0], array);
				}
			}
			else if (template.constructor && template.constructor === Object) {
				for (var key in template) {
					if (typeof(data[key]) == "undefined") arguments.callee(template[key], template[key], array);
					else arguments.callee(data[key], template[key], array);
				}
			}
		}
	}

	function unflattenData(array, template, data, templateKey, dataKey, idx) {
		console.log(templateKey + " = " + typeof(template[templateKey]));
		if (typeof(template[templateKey]) == "number" || typeof(template[templateKey]) == "string" || typeof(template[templateKey]) == "boolean") {
			data[dataKey] = array[idx++];
		}
		else if (typeof(template[templateKey]) == "object") {
			if (template[templateKey] instanceof Array) {
				console.log(templateKey + " = array");
				var n = array[idx++];
				data[dataKey] = new Array();
				data[dataKey].length = n;
				for (var i = 0; i < n; ++i) {
					idx = arguments.callee(array, template[templateKey], data[dataKey], 0, i, idx);
				}
			}
			else if (template[templateKey].constructor && template[templateKey].constructor === Object) {
				console.log(templateKey + " = object");
				data[dataKey] = {};
				for (var key in template[templateKey]) {
					console.log("add key " + key);
					idx = arguments.callee(array, template[templateKey], data[dataKey], key, key, idx);
				}
			}
		}
		return idx;
	}

	function flatten(data, template) {
		var array = [];
		this.flattenData(data, template, array);
		return array;
	}

	function unflatten(array, template) {
		var container = {};
		this.unflattenData(array, {data: template}, container, "data", "data", 0);
		return container.data;
	}

	// Exports
	if (typeof window === 'undefined') {
		exports.flatten = flatten;
		exports.unflatten = unflatten;

	} else {
		window.PacketFlattener = {
			flatten: flatten,
			unflatten: unflatten
		};
	}

})(Array);