const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });

const sendEmail = async (email) => {
  try {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'Email confirmation done!',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Confirm you Email',
        },
      },
      Source: process.env.VERIFY_EMAIL,
      ReplyToAddresses: [process.env.VERIFY_EMAIL],
    };

    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(
      params
    );

    await sendPromise.promise();

    return 'Email Sended';
  } catch (error) {
    return error.statusCode;
  }
};

const verifyEmail = async (email) => {
  try {
    const verifyEmailPromise = new AWS.SES({
      apiVersion: '2010-12-01',
    }).verifyEmailIdentity({ EmailAddress: email });

    await verifyEmailPromise.promise();

    return 'Email verification initiated';
  } catch (error) {
    return error.statusCode;
  }
};

module.exports = { sendEmail, verifyEmail };
