const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  try {
    // Parse and validate the incoming request body
    const data = JSON.parse(event.body);
    const { name, email, telefon, nachricht } = data;

    if (!email || !validateEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid email address' }),
      };
    }

    // Create the transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: 'smtps.udag.de', // Replace with your SMTP server host
      port: 465, // SMTP port (465 for SSL/TLS)
      secure: true, // Use TLS (true for port 465)
      auth: {
        user: process.env.SMTP_USERNAME, // SMTP username from environment variables
        pass: process.env.SMTP_PASSWORD, // SMTP password from environment variables
      },
    });

    // Define email options
    const mailOptions = {
      from: '"Kontaktformular" <info@senphysio.de>', // E-Mail-Adresse des Absenders
      to: 'info@senphysio.de', // E-Mail-Adresse des Empfängers
      subject: `Neue Anfrage von ${name}`, // Betreff der E-Mail
      text: `Sie haben eine neue Anfrage vom Kontaktformular erhalten:\n\nName: ${name}\nE-Mail: ${email}\nTelefon: ${telefon}\nNachricht: ${nachricht}`, // E-Mail-Text im Klartext
      html: `<h1>Neue Anfrage vom Kontaktformular</h1><p><strong>Name:</strong> ${name}</p><p><strong>E-Mail:</strong> ${email}</p><p><strong>Telefon:</strong> ${telefon}</p><p><strong>Nachricht:</strong> ${nachricht}</p>`, // E-Mail-Text im HTML-Format
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', response }),
    };
  } catch (error) {
    console.error('Error sending email:', error); // Log error for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message }),
    };
  }
};

// Function to validate email address format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
