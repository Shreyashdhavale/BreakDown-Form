import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    date: '',
    shift: '',
    machineNo: '',
    problem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const shifts = ['A SHIFT', 'B SHIFT', 'C SHIFT'];
  const machines = [
    'BK 801', 'BK 802', 'BK 803', 'BK 804', 'BK 805', 'BK 806', 'BK 807', 'BK 808',
    'BK 809', 'BK 810', 'BK 811', 'BK 812', 'BK 813', 'BK 814', 'BK 816', 'BK 817',
    'BK 818', 'BK 819', 'BK 820', 'BK 821', 'BK 822', 'BK 823', 'BK 824', 'BK 825',
    'BK 827', 'BK 828', 'BK 829', 'BK 830', 'BK 831', 'BK 832', 'BK 833', 'BK 834',
    'BK 835', 'BK 836', 'BK 837', 'BK 838', 'BK 839', 'BK 840', 'BK 841', 'BK 842',
    'BK 843', 'BK 844', 'OTHERS'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success('Breakdown report submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Reset form after successful submission
        setFormData({
          date: '',
          shift: '',
          machineNo: '',
          problem: ''
        });
      } else {
        toast.error('Error: ' + (result.error || 'Submission failed'), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error submitting breakdown report:', error);
      toast.error('An error occurred while submitting the report.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='out-container'>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="tata-breakdown-container">
      <div className="form-wrapper">
        <div className="form-header">
          <img 
            src="./tata-logo.png" 
            alt="Tata Motors Logo" 
            className="tata-logo"
          />
          <h1>Machine Breakdown Report</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="breakdown-form">
          <div className="form-grid">
            {/* Date Field */}
            <div className="form-group">
              <label>Date <span className="required">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Shift Field */}
            <div className="form-group">
              <label>Shift <span className="required">*</span></label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">Select Shift</option>
                {shifts.map(shift => (
                  <option key={shift} value={shift}>{shift}</option>
                ))}
              </select>
            </div>

            {/* Machine Number Field */}
            <div className="form-group">
              <label>Machine No. <span className="required">*</span></label>
              <select
                name="machineNo"
                value={formData.machineNo}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">Select Machine</option>
                {machines.map(machine => (
                  <option key={machine} value={machine}>{machine}</option>
                ))}
              </select>
            </div>

            {/* Problem Field */}
            <div className="form-group full-width">
              <label>Problem Description <span className="required">*</span></label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                required
                className="form-control"
                rows="4"
                placeholder="Describe the machine breakdown in detail..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default App;