/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== 'production'

module.exports = {
	assetPrefix: !debug ? '' : '',
	trailingSlash: true,
	future: {
		webpack5: true
	}
}
