$(function() {
    var resultCollector = Quagga.ResultCollector.create({
        capture: true,
        capacity: 20,
        filter: function(codeResult) {
            // only store results which match this constraint
            // e.g.: codeResult
            return true;
        }
    });
    var App = {
        init: function() {
            var self = this;

            Quagga.init(this.state, function(err) {
                if (err) {
                    return self.handleError(err);
                }
                //Quagga.registerResultCollector(resultCollector);
                App.attachListeners();
                App.checkCapabilities();
                Quagga.start();
            });
        },
        handleError: function(err) {
            console.log(err);
        },
        checkCapabilities: function() {
            var track = Quagga.CameraAccess.getActiveTrack();
            var capabilities = {};
            if (typeof track.getCapabilities === 'function') {
                capabilities = track.getCapabilities();
            }
            this.applySettingsVisibility('zoom', capabilities.zoom);
            this.applySettingsVisibility('torch', capabilities.torch);
        },
        applySettingsVisibility: function(setting, capability) {
            // depending on type of capability
            if (typeof capability === 'boolean') {
                var node = document.querySelector('input[name="settings_' + setting + '"]');
                if (node) {
                    node.parentNode.style.display = capability ? 'block' : 'none';
                }
                return;
            }
            if (window.MediaSettingsRange && capability instanceof window.MediaSettingsRange) {
                var node = document.querySelector('select[name="settings_' + setting + '"]');
                if (node) {
                    this.updateOptionsForMediaRange(node, capability);
                    node.parentNode.style.display = 'block';
                }
                return;
            }
        },
        initCameraSelection: function(){
            var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

            return Quagga.CameraAccess.enumerateVideoDevices()
            .then(function(devices) {
                function pruneText(text) {
                    return text.length > 30 ? text.substr(0, 30) : text;
                }
            });
        },
        attachListeners: function() {
            var self = this;
            self.initCameraSelection();
        },
        _accessByPath: function(obj, path, val) {
            var parts = path.split('.'),
                depth = parts.length,
                setter = (typeof val !== "undefined") ? true : false;

            return parts.reduce(function(o, key, i) {
                if (setter && (i + 1) === depth) {
                    if (typeof o[key] === "object" && typeof val === "object") {
                        Object.assign(o[key], val);
                    } else {
                        o[key] = val;
                    }
                }
                return key in o ? o[key] : {};
            }, obj);
        },
        _convertNameToState: function(name) {
            return name.replace("_", ".").split("-").reduce(function(result, value) {
                return result + value.charAt(0).toUpperCase() + value.substring(1);
            });
        },
        detachListeners: function() {
            $(".controls").off("click", "button.stop");
            $(".controls .reader-config-group").off("change", "input, select");
        },
        applySetting: function(setting, value) {
            var track = Quagga.CameraAccess.getActiveTrack();
            if (track && typeof track.getCapabilities === 'function') {
                switch (setting) {
                case 'zoom':
                    return track.applyConstraints({advanced: [{zoom: parseFloat(value)}]});
                case 'torch':
                    return track.applyConstraints({advanced: [{torch: !!value}]});
                }
            }
        },
        setState: function(path, value) {
            var self = this;

            if (typeof self._accessByPath(self.inputMapper, path) === "function") {
                value = self._accessByPath(self.inputMapper, path)(value);
            }

            if (path.startsWith('settings.')) {
                var setting = path.substring(9);
                return self.applySetting(setting, value);
            }
            self._accessByPath(self.state, path, value);

            console.log(JSON.stringify(self.state));
            App.detachListeners();
            Quagga.stop();
            App.init();
        },
        inputMapper: {
            inputStream: {
                constraints: function(value){
                    if (/^(\d+)x(\d+)$/.test(value)) {
                        var values = value.split('x');
                        return {
                            width: {min: parseInt(values[0])},
                            height: {min: parseInt(values[1])}
                        };
                    }
                    return {
                        deviceId: value
                    };
                }
            },
            numOfWorkers: function(value) {
                return parseInt(value);
            },
        },
        state: {
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: {min: 640},
                    height: {min: 480},
                    facingMode: "environment",
                    aspectRatio: {min: 1, max: 2}
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: false
            },
            numOfWorkers: 4,
            frequency: 10,
            decoder: {
                readers : [{
                    format: "upc_reader",
                    config: {}
                }]
            },
            locate: true
        },
        lastResult : null
    };

    App.init();
    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }
        }
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;

        var productBarCode = 0;
        productBarCode = result.codeResult.code;

        console.log(productBarCode);

        if (App.lastResult !== code) {
            App.lastResult = code;
            var $node = null, canvas = Quagga.canvas.dom.image;
            getProd(productBarCode)
        }
    });

    var $productsHTML = $('#products');
    onList = new Set();

    function getProd(barcode){
        $.ajax({
    	    type: "GET",
    	    url: "https://api.wegmans.io/products/barcodes/" + barcode + "?api-version=2018-10-18",
            //url: "https://api.wegmans.io/products/barcodes/024100122615?api-version=2018-10-18",

    	    success: function(products) {
    	    	console.log(products);
                //console.log(products.name + ' h ')
                console.log(products.name);
                if (!onList.has(products.name)){
                    onList.add(products.name);
                    getDetails(products._links[0].href)
                    
                }else{
                    console.log("Repeat Item Scanned");
                } 
    	    },

    	    // Request headers
    	    beforeSend: function(xhrObj) {
    	        xhrObj.setRequestHeader("Cache-Control", "no-cache");
    	        xhrObj.setRequestHeader("Subscription-Key", "8cf98519d2c84a34a8c71035f18421f6");
    	    },
    	})
    	.done(function (data) {
        	console.log("Success")
    	})
    	.fail(function () {
        	console.log("Item not found, try scanning again");
    	});
    }

    $('#manualEntryForm').submit(function(event) {
        event.preventDefault();
        $("input").prop("disabled", true);

        formData = {
            productName : $(this).find('input[type="text"]').val()
        };
        console.log(formData.productName);
        if(!onList.has(formData.productName)){
            onList.add(formData.productName);
            $productsHTML.append('<li>Product Name: ' + formData.productName + '</li>');
        }else{
            console.log("Repeated item")
        }
        $('input[name=productName]').val('')
        $("input").prop("disabled", false)
    });

    $( "#submitButton" ).click(function() {
        onListArr = Array.from(onList)
        rets = doQuery(onListArr)

        var $resultsHTML = $('#resultsDisplay');

        $resultsHTML.empty()

        $resultsHTML.append('<li>' + rets[0] + '</li>')
        $resultsHTML.append('<li>' + rets[1] + '</li>')
    });

    function getDetails(prodCode){
        $.ajax({
            type: "GET",
            url: "https://api.wegmans.io/" + prodCode,

            success: function(products) {
                $productsHTML.append('<li>Product Name: ' + products.descriptions.receipt + '</li>');
            },

            // Request headers
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Cache-Control", "no-cache");
                xhrObj.setRequestHeader("Subscription-Key", "8cf98519d2c84a34a8c71035f18421f6");
            },
        })
        .done(function (data) {
            alert("success");
        })
        .fail(function () {
            alert("error");
        });
    }
});
