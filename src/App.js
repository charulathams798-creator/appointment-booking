import { useState } from "react";
import "./App.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Raj Kumar",
    specialist: "Cardiologist",
    experience: "10 Years",
    rating: 4.8,
    time: "10:00 AM - 2:00 PM",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialist: "Dermatologist",
    experience: "7 Years",
    rating: 4.7,
    time: "2:00 PM - 6:00 PM",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Dr. Arjun Reddy",
    specialist: "Dentist",
    experience: "8 Years",
    rating: 4.6,
    time: "9:00 AM - 1:00 PM",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    date: "",
    time: "",
    problem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookAppointment = (e) => {
    e.preventDefault();

    if (!selectedDoctor || !form.name || !form.mobile || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      ...form,
    };

    setAppointments([...appointments, newAppointment]);

    setForm({
      name: "",
      mobile: "",
      date: "",
      time: "",
      problem: "",
    });

    setSelectedDoctor("");
    alert("Appointment booked successfully!");
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((item) => item.id !== id));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>BookCare</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#doctors">Doctors</a>
          <a href="#booking">Book</a>
          <a href="#appointments">Appointments</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div>
          <h1>Book Your Doctor Appointment Online</h1>
          <p>
            Find trusted doctors and book appointments easily from your home.
          </p>
          <a href="#doctors" className="btn">Find Doctors</a>
        </div>
        <img
          src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
          alt="doctor"
        />
      </section>

      <section id="doctors" className="section">
        <h2>Available Doctors</h2>

        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <img src={doctor.img} alt={doctor.name} />
              <h3>{doctor.name}</h3>
              <p>{doctor.specialist}</p>
              <p>Experience: {doctor.experience}</p>
              <p>⭐ {doctor.rating}</p>
              <p>{doctor.time}</p>
              <a
                href="#booking"
                className="btn"
                onClick={() => setSelectedDoctor(doctor.name)}
              >
                Book Appointment
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="section booking-section">
        <h2>Book Appointment</h2>

        <form className="booking-form" onSubmit={bookAppointment}>
          <input
            type="text"
            value={selectedDoctor}
            placeholder="Selected Doctor"
            readOnly
          />

          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <select name="time" value={form.time} onChange={handleChange}>
            <option value="">Select Time Slot</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>2:00 PM</option>
            <option>4:00 PM</option>
          </select>

          <textarea
            name="problem"
            placeholder="Describe your problem"
            value={form.problem}
            onChange={handleChange}
          ></textarea>

          <button className="btn" type="submit">
            Confirm Booking
          </button>
        </form>
      </section>

      <section id="appointments" className="section">
        <h2>My Appointments</h2>

        {appointments.length === 0 ? (
          <p className="empty">No appointments booked yet.</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((item) => (
              <div className="appointment-card" key={item.id}>
                <h3>{item.doctor}</h3>
                <p><b>Patient:</b> {item.name}</p>
                <p><b>Mobile:</b> {item.mobile}</p>
                <p><b>Date:</b> {item.date}</p>
                <p><b>Time:</b> {item.time}</p>
                <p><b>Problem:</b> {item.problem}</p>
                <button
                  className="cancel-btn"
                  onClick={() => cancelAppointment(item.id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>© 2026 BookCare Appointment Booking System</p>
      </footer>
    </div>
  );
}

export default App;
