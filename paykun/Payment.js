"use strict";
const Crypto = require('./Crypto');
//require('locutus/php/array/array_filter')
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Payment =
    /*#__PURE__*/
    function () {
        function Payment(merchantID, accessToken, enckey) {
            var isLive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            _classCallCheck(this, Payment);

            _defineProperty(this, "GATEWAY_URL_PROD", "https://checkout.paykun.com/payment");

            _defineProperty(this, "GATEWAY_URL_DEV", "https://sandbox.paykun.com/payment");

            _defineProperty(this, "PAGE_TITLE", "Processing Payment...");

            _defineProperty(this, "merchantId", void 0);

            _defineProperty(this, "accessToken", void 0);

            _defineProperty(this, "encryptionKey", void 0);

            _defineProperty(this, "orderId", void 0);

            _defineProperty(this, "purpose", void 0);

            _defineProperty(this, "amount", void 0);

            _defineProperty(this, "successUrl", void 0);

            _defineProperty(this, "failureUrl", void 0);

            _defineProperty(this, "country", void 0);

            _defineProperty(this, "state", void 0);

            _defineProperty(this, "city", void 0);

            _defineProperty(this, "pinCode", void 0);

            _defineProperty(this, "addressString", void 0);

            _defineProperty(this, "billingCountry", void 0);

            _defineProperty(this, "billingState", void 0);

            _defineProperty(this, "billingCity", void 0);

            _defineProperty(this, "billingPinCode", void 0);

            _defineProperty(this, "billingAddressString", void 0);

            _defineProperty(this, "twig", void 0);

            _defineProperty(this, "isLive", void 0);

            _defineProperty(this, "isPassedValidationForConstructor", false);

            _defineProperty(this, "isPassedValidationForInitOrder", false);

            _defineProperty(this, "isPassedValidationForCustomer", false);

            _defineProperty(this, "isPassedValidationForShipping", false);

            _defineProperty(this, "isPassedValidationForBilling", false);

            _defineProperty(this, "isCustomRenderer", false);

            _defineProperty(this, "udf_1", void 0);

            _defineProperty(this, "udf_2", void 0);

            _defineProperty(this, "udf_3", void 0);

            _defineProperty(this, "udf_4", void 0);

            _defineProperty(this, "udf_5", void 0);

            this.merchantID = merchantID;
            this.accessToken = accessToken;
            this.enckey = enckey;
            this.isLive = isLive;
        }

        _createClass(Payment, [{
            key: "initOrder",
            value: function initOrder(orderId, purpose, amount, successUrl, failureUrl) {
                this.orderId = orderId;
                this.purpose = purpose;
                this.amount = amount;
                this.successUrl = successUrl;
                this.failureUrl = failureUrl; //this.isPassedValidationForInitOrder = true;
            }
        }, {
            key: "addCustomer",
            value: function addCustomer(customerName, customerEmail, customerMoNo) {
                this.customerName = customerName;
                this.customerEmail = customerEmail;
                this.customerMoNo = customerMoNo;
            }
        }, {
            key: "addShippingAddress",
            value: function addShippingAddress(country, state, city, pinCode, addressString) {
                this.country = country;
                this.state = state;
                this.city = city;
                this.pinCode = pinCode;
                this.addressString = addressString;
            }
        }, {
            key: "addBillingAddress",
            value: function addBillingAddress(country, state, city, pinCode, addressString) {
                this.billingCountry = country;
                this.billingState = state;
                this.billingCity = city;
                this.billingPinCode = pinCode;
                this.billingAddressString = addressString;
            }
        }, {
            key: "setCustomFields",
            value: function setCustomFields(customFields) {
                if (customFields.hasOwnProperty('udf_1')) {
                    this.udf_1 = customFields.udf_1;
                }

                if (customFields.hasOwnProperty('udf_2')) {
                    this.udf_2 = customFields.udf_2;
                }

                if (customFields.hasOwnProperty('udf_3')) {
                    this.udf_3 = customFields.udf_3;
                }

                if (customFields.hasOwnProperty('udf_4')) {
                    this.udf_4 = customFields.udf_4;
                }

                if (customFields.hasOwnProperty('udf_5')) {
                    this.udf_5 = customFields.udf_5;
                }
            }
        }, {
            key: "submit",
            value: function submit() {
                let dataArray = [];
                dataArray['order_no'] = this.orderId;
                dataArray['product_name'] = this.purpose;
                dataArray['amount'] = this.amount;
                dataArray['success_url'] = this.successUrl;
                dataArray['failure_url'] = this.failureUrl;
                dataArray['customer_name'] = this.customerName;
                dataArray['customer_email'] = this.customerEmail;
                dataArray['customer_phone'] = this.customerMoNo;
                dataArray['shipping_address'] = this.addressString;
                dataArray['shipping_city'] = this.city;
                dataArray['shipping_state'] = this.state;
                dataArray['shipping_country'] = this.country;
                dataArray['shipping_zip'] = this.pinCode;
                dataArray['billing_address'] = this.billingAddressString;
                dataArray['billing_city'] = this.billingCity;
                dataArray['billing_state'] = this.billingState;
                dataArray['billing_country'] = this.billingCountry;
                dataArray['billing_zip'] = this.billingPinCode;
                dataArray['udf_1'] = this.udf_1 ? this.udf_1 : '';
                dataArray['udf_2'] = this.udf_2 ? this.udf_2 : '';
                dataArray['udf_3'] = this.udf_3 ? this.udf_3 : '';
                dataArray['udf_4'] = this.udf_4 ? this.udf_4 : '';
                dataArray['udf_5'] = this.udf_5 ? this.udf_5 : '';
                let encryptedData = this.encryptData(dataArray);
                let requestData = {
                    action: (this.isLive) ? this.GATEWAY_URL_PROD : this.GATEWAY_URL_DEV,
                    encrypted_request: encryptedData,
                    merchant_id: this.merchantID,
                    access_token: this.accessToken
                };
                return requestData;
                //return this.createForm(encryptedData);
            }
        },
        {
            key:"getStatus",
            value: function(payment_id, callback) {
                var request = require('request');
                var config = require('../config/config.global');
                var url = 'https://api.paykun.com/v1/merchant/transaction/'+payment_id;
                if(config.IS_LIVE == false) {
                    url = 'https://sandbox.paykun.com/api/v1/merchant/transaction/'+payment_id;
                }
                var options = {
                    'method': 'GET',
                    'url': url,
                    'headers': {
                        'MerchantId': config.MERCHANT_ID,
                        'AccessToken': config.ACCESS_TOKEN
                    }
                };
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    callback(JSON.parse(response.body));
                });
            }
        },
        {
            key: "encryptData",
            value: function encryptData(data) {

                //data = data.array_filter; //ksort($data);
                //console.log(data);    
                var orderData = {};
                Object.keys(data).sort().forEach(function (key) {
                    orderData[key] = data[key];
                });
                let dataToPostToPG = "";
                Object.keys(orderData).forEach(function (k) {
                    if(orderData[k] !== undefined &&  orderData[k].trim() !== "") {
                        dataToPostToPG = dataToPostToPG + k + "::" + orderData[k] + ";";
                    }
                });

                dataToPostToPG = dataToPostToPG.substring(0, dataToPostToPG.length - 2);
                let encryptedData = Crypto.encrypt(dataToPostToPG, this.enckey);
                //let encryptedData = testingEncrypt.testingEncrypt(dataToPostToPG, this.enckey);

                return encryptedData;

                //return Crypto:: encrypt($dataToPostToPG, $this -> encryptionKey);
            }
            },
            {
                key: "createForm",
                value: function createForm(encData) {
                    console.log(this.isLive);
                    let htmlEntity = `
                        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                            <html lang="en">
                                <head>
                                    <title>Processing Payment</title>
                                    <meta http-equiv="content-type" content="text/html;charset=utf-8">
                                </head>
                                    <body>
                                        <div>
                                            Processing your payment, please wait...
                                        </div>
                                        <form action="${(this.isLive) ? this.GATEWAY_URL_PROD : this.GATEWAY_URL_DEV}" method="post" name="server_request" target="_top" >
                                            <table width="80%" align="center" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td><input type="hidden" name="encrypted_request" id="encrypted_request" value="${encData}" /></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="hidden" name="merchant_id" id="merchant_id" value="${this.merchantID}" /></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="hidden" name="access_token" id="access_token" value="${this.accessToken}"></td>
                                                </tr>
                                            </table>
                                        </form>
                                    </body>
                                    <script type="text/javascript">
                                        document.server_request.submit();
                                    </script>
                            </html>`;

                                return htmlEntity;
                                        }
                                    }

        ]);
            return Payment;
        }();
                        //var _default = Payment;
module.exports = { Payment};