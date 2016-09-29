var request = require('request');
var fs = require('fs');
var config = require('../../config/configuration.json');
var VisaAPIClient = require('../../libs/visaapiclient.js');
var assert = require('chai').assert;
var randomstring = require('randomstring');

console.log(__dirname);

var userId = config.userId ;
var password = config.password;
var keyFile = config.key;
var certificateFile = config.cert;

describe('Visa Direct Pull Funds Transactions test', function() {
	var visaAPIClient = new VisaAPIClient();
	var strDate = new Date().toISOString().replace(/\..+/, '');
	var pullFundsRequest = JSON.stringify({
		  "acquirerCountryCode": "840",
		  "acquiringBin": "408999",
		  "amount": "124.02",
		  "businessApplicationId": "AA",
		  "cardAcceptor": {
		    "address": {
		      "country": "USA",
		      "county": "San Mateo",
		      "state": "CA",
		      "zipCode": "94404"
		    },
		    "idCode": "ABCD1234ABCD123",
		    "name": "Visa Inc. USA-Foster City",
		    "terminalId": "ABCD1234"
		  },
		  "cavv": "0700100038238906000013405823891061668252",
		  "foreignExchangeFeeTransaction": "11.99",
		  "localTransactionDateTime": "2016-09-29T16:52:03",
		  "retrievalReferenceNumber": "330000550000",
		  "senderCardExpiryDate": "2015-10",
		  "senderCurrencyCode": "USD",
		  "senderPrimaryAccountNumber": "4895142232120006",
		  "surcharge": "11.99",
		  "systemsTraceAuditNumber": "451001",
			"merchantCategoryCode": 6012
		});

	it('Pull Funds Transaction Test',function(done) {
		this.timeout(10000);
		var baseUri = 'visadirect/';
		var resourcePath = 'fundstransfer/v1/pullfundstransactions';
		visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, pullFundsRequest, 'POST', {},
		function(err, responseCode) {
			if(!err) {
				assert.equal(responseCode, 200);
			} else {
				assert(false);
			}
		    done();
		});
	});
});

describe('Visa Direct Push Funds Transactions test', function() {
	var visaAPIClient = new VisaAPIClient();
	var strDate = new Date().toISOString().replace(/\..+/, '');
	var pushFundsRequest = JSON.stringify({
		  "systemsTraceAuditNumber": 350420,
		  "retrievalReferenceNumber": "401010350420",
		  "localTransactionDateTime": strDate,
		  "acquiringBin": 409999,
		  "acquirerCountryCode": "101",
		  "senderAccountNumber": "1234567890123456",
		  "senderCountryCode": "USA",
		  "transactionCurrencyCode": "USD",
		  "senderName": "John Smith",
		  "senderAddress": "44 Market St.",
		  "senderCity": "San Francisco",
		  "senderStateCode": "CA",
		  "recipientName": "Adam Smith",
		  "recipientPrimaryAccountNumber": "4957030420210454",
		  "amount": "112.00",
		  "businessApplicationId": "PP",
		  "transactionIdentifier": 234234322342343,
		  "merchantCategoryCode": 6012,
		  "sourceOfFundsCode": "03",
		  "cardAcceptor": {
		    "name": "John Smith",
		    "terminalId": "13655392",
		    "idCode": "VMT200911026070",
		    "address": {
		      "state": "CA",
		      "county": "081",
		      "country": "USA",
		      "zipCode": "94105"
		    }
		  },
		  "feeProgramIndicator": "123"
		});

	it('Push Funds Transaction Test',function(done) {
		this.timeout(10000);
		var baseUri = 'visadirect/';
		var resourcePath = 'fundstransfer/v1/pushfundstransactions';
		visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, pushFundsRequest, 'POST', {},
		function(err, responseCode) {
			if(!err) {
				assert.equal(responseCode, 200);
			} else {
				assert(false);
			}
		    done();
		});
	});
});
