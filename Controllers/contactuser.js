import { Contact } from "../Model/Contactdb.js";

// CREATE
export const newContact = async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    if (!name || !email || !phone || !type) {
      return res.status(400).json({ message: "All fields required", success: false });
    }

    const contact = await Contact.create({ name, email, phone, type, user: req.user.id });

    console.log({ message: "Contact saved successfully", success: true, data: contact })
    return res.status(201).json({ message: "Contact saved successfully", success: true, data: contact });


  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// GET ALL
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log({ message: "Contacts fetched", success: true, data: contacts })
    return res.json({ message: "Contacts fetched", success: true, data: contacts });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// GET SINGLE
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById({ _id: req.params.id, user: req.user.id });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found", success: false });
    }
    console.log({ message: "Contact fetched", success: true, data: contact })
    return res.json({ message: "Contact fetched", success: true, data: contact });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// UPDATE
export const updateContactById = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found", success: false });
    }
    console.log({message: "Updated successfully", success: true, data: contact})
    return res.json({ message: "Updated successfully", success: true, data: contact });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// DELETE
export const deleteContactById = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found", success: false });
    }
    return res.json({ message: "Deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
