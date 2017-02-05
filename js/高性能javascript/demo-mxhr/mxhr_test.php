<?php
	/**
	 * Functions for combining payloads into a single stream that the
	 * JS will unpack on the client-side, to reduce the number of HTTP requests.
	 * 这里的payloads可以理解为一个流（stream）中的单元，包含信息和控制符，mxhr_stream函数将每一个
	 * payload（复数加s）合并成一个“流”，在客户端，Javascript将会解析这些payload，进而减少HTTP请求的数量。
	 * Takes an array of payloads and combines them into a single stream, which is then
	 * sent to the browser.
	 * 此函数以payload为元素的数组作为参数，并把它们合并成一个单独的“流”，这个“流”将会发送回浏览器。
	 * Each item in the input array should contain the following keys:
	 * 参数数组的每一个单元，应该包含如下keys:
	 * data         - the image or text data. image data should be base64 encoded.
	 * data - 图片或者文本的data，图片的data是经过base64编码的。
	 * content_type - the mime type of the data
	 * xontent_type - data 的 mime 类型
	 */
	function mxhr_stream($payloads) {
		
		$stream = array();
		
		$version = 1;
		//使用特殊的符号来作为分隔符和边界符（它们都属于控制符）
		$sep = chr(1); // control-char SOH/ASCII 1
		$newline = chr(3); // control-char ETX/ASCII 3
		
		foreach ($payloads as $payload) {
			$stream[] = $payload['content_type'] . $sep . (isset($payload['id']) ? $payload['id'] : '') . $sep . $payload['data'];
		}
		echo $version . $newline . implode($newline, $stream) . $newline;
		/*
		此例中$stream中的一个元素的展现			                        						     image/png0iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAMAAADkSAzAAAAAQlBMVEWZmZmenp7m5ubKysq/v7+ysrLy8vLHx8fb29uvr6/v7++pqan39/empqbT09Pq6urX19dtkDObvkpLbSmLsDX///8MOm2bAAAAFnRSTlP///////////////////////////8AAdLA5AAAAIdJREFUKM910NkSwyAIBVDM0iVdUrnk/381wdLUBXlgRo7D6KXNLUA7+RYjeogoIvAxmSp1zcW/tZhZg7nVWFiFpX0RcC0h7IjIhSmCmXXQ2IEQVo22MrMT04XK0lrpmD3IN/uKuGYhQDz7JQTPzvjg2EbL8Bmn+REAOiqE132eruP7NqyX5w49di+cmF4NJgAAAABJRU5ErkJggg==
		*/
	}
	
	// Package image data into a payload（将一个图片的data打包成一个payload）
	
	function mxhr_assemble_image_payload($image_data, $id=null, $mime='image/jpeg') {
		return array(
			'data' => base64_encode($image_data),
			'content_type' => $mime,
			'id' => $id
		);
	}
	
	// Package html text into a payload（将一个html文件打包成一个payload，这个例子中没有用到）

	function mxhr_assemble_html_payload($html_data, $id=null) {
		return array(
			'data' => $html_data,
			'content_type' => 'text/html',
			'id' => $id
		);
 	}

	// Package javascript text into a payload（将一个javascript文件打包成一个payload，这个例子中没有用到）

	function mxhr_assemble_javascript_payload($js_data, $id=null) {
		return array(
			'data' => $js_data,
			'content_type' => 'text/javascript',
			'id' => $id
		);
 	}

	// Send the multipart stream（发送“流”）

	if ($_GET['send_stream']) {
		//设置重复次数
		$repetitions = 300;
		$payloads = array();

		// JS files（可以略去）

		$js_data = 'var a = "JS execution worked"; console.log(a, ';

		for ($n = 0; $n < $repetitions; $n++) {
			//$payloads[] = mxhr_assemble_javascript_payload($js_data . $n . ', $n);');
		}

		// HTML files（可以略去）

		$html_data = '<!DOCTYPE HTML><html><head><title>Sample HTML Page</title></head><body></body></html>';

		for ($n = 0; $n < $repetitions; $n++) {
			//$payloads[] = mxhr_assemble_html_payload($html_data, $n);
		}

		// Images（这里使用的是测试图片）

		$image = 'icon_check.png';
		$image_fh = fopen($image, 'r');
		//将此图片read进$image_data变量
		$image_data = fread($image_fh, filesize($image));
		fclose($image_fh);

		for ($n = 0; $n < $repetitions; $n++) {
			//生成特定的payload数组
			$payloads[] = mxhr_assemble_image_payload($image_data, $n, 'image/png');
		}

		// Send off the multipart stream（发送）
		mxhr_stream($payloads);
		exit;
	}

?>