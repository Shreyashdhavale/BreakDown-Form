// controllers/breakdownController.js
const Breakdown = require('./Breakdown');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Set up the nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createBreakdown = async (req, res) => {
  try {
    const { date, shift, machineNo, problem } = req.body;

    // Create and save the breakdown report
    const breakdown = new Breakdown({ date, shift, machineNo, problem });
    await breakdown.save();

    // Prepare email message, including the submission timestamp (createdAt)
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO, // comma-separated list if more than one recipient
      subject: 'New Machine Breakdown Report',
      text: `A new breakdown report has been submitted:
Date: ${date}
Shift: ${shift}
Machine No: ${machineNo}
Problem: ${problem}
Submitted At: ${breakdown.createdAt}`,
      html: `<p>A new breakdown report has been submitted:</p>
             <ul>
               <li><strong>Date:</strong> ${date}</li>
               <li><strong>Shift:</strong> ${shift}</li>
               <li><strong>Machine No:</strong> ${machineNo}</li>
               <li><strong>Problem:</strong> ${problem}</li>
               <li><strong>Submitted At:</strong> ${breakdown.createdAt}</li>
             </ul>`
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Breakdown report submitted successfully.', breakdown });
  } catch (error) {
    console.error('Error processing breakdown report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllBreakdowns = async (req, res) => {
  try {
    const breakdowns = await Breakdown.find();
    res.status(200).json(breakdowns);
  } catch (error) {
    console.error('Error fetching breakdowns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
