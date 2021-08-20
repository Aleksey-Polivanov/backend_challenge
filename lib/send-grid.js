const
    client = require( '@sendgrid/client' ),

    env = require( './env' ),
    credentials = require( '../credentials' ),
    request = require ('request');

// client.setApiKey( credentials.sendGrid[env.getEnv()].apiKey );

const envVars = {
    sender: env.getEnv() === 'development' ? 'testing@gantri.com' : 'hello@gantri.com'
};

switch (env.getEnv()) {
    case 'production':
        // envVars.root = 'https://www.test.com';
        break;
    case 'staging':
        // envVars.root = 'https://staging.test.com';
        break;
    case 'development':
        envVars.root = 'http://localhost:3000';
        break;
}

const send = async ( emailData ) => {
    try {
        if (~[ 'test', 'staging', 'development' ].indexOf( env.getEnv() )) {
            emailData.to = [{ 'email': 'agios6662@gmail.com' }];
            emailData.from.email = 'agios6661@gmail.com';
        }

        let request = {
            method: 'POST',
            url: 'v3/mail/send',
            body: {
                subject: emailData.subject,
                from: {
                    email: emailData.from.email,
                    name: emailData.from.name
                },
                personalizations: [
                    {
                        to: emailData.to,
                        dynamic_template_data: emailData.templateData
                    }
                ],
                template_id: emailData.templateId
            }
        };

        let response = await client.request( request );
        console.log( 'send to:', emailData.to[0].email, 'status:', response[0].statusCode, response[0].statusMessage );
        return '';
    } catch (err) {
        throw (err);
    }
};

const sendForUsers = async ( type, data ) => {
    try {
        console.log('TBD')
        // let emailData = {};
        //
        // switch (type) {
        //     case 'resetPassword':
        //         emailData = {
        //             templateId: 'd-bef9c03cd0ff4c70ace23c35f7c12276',
        //             templateData: {
        //                 subject: 'Reset password',
        //                 link: `${envVars.root}${data.link}`
        //             },
        //             from: {
        //                 email: envVars.sender,
        //                 name: 'CampsAndScouts'
        //             },
        //             to: [ {
        //                 'email': data.email,
        //             } ]
        //         };
        //         break;
        // }
        //
        // await send( emailData );
    } catch (err) {
        throw (err);
    }
};

module.exports = {
    sendForUsers: sendForUsers,

    send: send
};
