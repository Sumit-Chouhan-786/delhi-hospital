const Appointment = require("../models/appointmentModel");

const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, services, doctor, age } = req.body;

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      services,
      doctor,
      age,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the appointment." });
  }
};

const getAllAppointmentForIndex = async () => {
  try {
    return await Appointment.find(); 
  } catch (err) {
    throw new Error("Error fetching appointments");
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the appointment by its ID
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Fetch all remaining appointments after deletion
    const appointments = await Appointment.find();

    // Render the updated appointments page with a success message
    res.render("../views/all_appointment.ejs", {
      appointments,
      title: "Hospital",
      message: {
        type: "success",
        message: "Appointment deleted successfully.",
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the appointment." });
  }
};


module.exports = {
  createAppointment,
  getAllAppointmentForIndex,
  deleteAppointment,
};
