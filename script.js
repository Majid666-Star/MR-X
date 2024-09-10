// Load Google Pay API
const googlePayClient = new google.payments.api.PaymentsClient({environment: 'TEST'});

const googlePayButton = document.getElementById('google-pay-button');
googlePayButton.addEventListener('click', onGooglePayButtonClicked);

function onGooglePayButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
            // Handle the payment data
            processPayment(paymentData);
        })
        .catch(error => {
            console.error('Google Pay Error: ', error);
        });
}

function getGooglePaymentDataRequest() {
    return {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleMerchantId'
                }
            }
        }],
        merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Example Merchant'
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '10.00',
            currencyCode: 'USD',
            countryCode: 'US'
        }
    };
}

function processPayment(paymentData) {
    console.log('Payment Data: ', paymentData);
    alert('Payment successful!');
}
