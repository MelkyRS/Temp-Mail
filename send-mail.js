const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Hanya mendukung POST request
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { tempEmail, domain } = req.body;

    if (!tempEmail || !domain) {
        return res.status(400).json({ error: 'Email or domain is missing' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: tempEmail,
            subject: 'Temporary Email Created',
            text: `This is your temporary email address: ${tempEmail}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Temporary email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
    }
};
