const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('views', __dirname + '/views');
// Set view engine to EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  
  
  res.render('index');
});

// // Route to handle form submission
// app.post('/send-message', async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//       return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//       // Configure your email transporter
//       const transporter = nodemailer.createTransport({
//           service: 'Gmail',
//           auth: {
//               user: 'kanish21@gmail.com', // Replace with your email
//               pass: 'K',       // Replace with your email password
//           },
//       });

//       // Email options
//       const mailOptions = {
//           from: email,
//           to: 'kanishkamaingi21@gmail.com', 
//           subject: `Message from ${name}`,
//           text: message,
//       };

//       // Send email
//       await transporter.sendMail(mailOptions);

//       res.json({ success: 'Message sent successfully!' });
//   } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Failed to send message' });
//   }
// });



// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
