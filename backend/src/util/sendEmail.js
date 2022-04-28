import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ to, from, subject, html }) => {
    const msg = { to, from, subject, html };

    return sendgrid.send(msg);
}