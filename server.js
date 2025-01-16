const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use environment variable for better security
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your email password from .env
  },
});

// Basic route
app.get('/', (req, res) => {
  // Get success and error statuses from session
  const success = req.session.success || false;
  const error = req.session.error || false;

  // Clear the flags after reading them
  req.session.success = false;
  req.session.error = false;

  res.render('index', { success, error });
});

// Route to handle form submission
app.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      req.session.error = 'All fields are required.';
      return res.redirect('/#contact');
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'kanishkamaingi21+portfolio@gmail.com', // Replace with the email where you want to receive messages
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Set success flag in session
    req.session.success = true;
    res.redirect('/#contact');
  } catch (error) {
    console.error('Error sending email:', error);
    req.session.error = 'Failed to send message. Please try again later.';
    res.redirect('/#contact');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
