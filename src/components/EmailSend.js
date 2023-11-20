import emailjs from '@emailjs/browser';

import {
  serviceID,
  templateID,
  publicKey,
  emailUserid,
  accessToken,
} from '../../utils/email-configuration';



export const emailSend = (data) => {
  let templateParams = {
    to_name: `${values.name}`,
    to_email: `${values.email}`,
    from_name: 'Juan',
    message: `${values.description}`,
  };
  console.log('ENVIADOS: ', JSON.stringify(templateParams));

  emailjs.send(serviceID, templateID, templateParams, publicKey).then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
    },
    function (error) {
      console.log('FAILED...', error);
    }
  );
};