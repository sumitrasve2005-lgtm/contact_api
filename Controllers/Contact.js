import { Contact } from "../Model/Contactdb.js";

// ✅ CREATE   select post method url :- http://localhost:3000/api/contact/new
export const newContact = async (req, res) => {
    try {
        const { name, email, phone, type } = req.body;
        if (!name || !email || !phone || !type)
            return res.json({ message: "All fields are required", success: false });

        const userId = req.user.id;
        const saveContact = await Contact.create({ name, email, phone, type, user: userId });
        console.log({ message: "Contact saved Successfully!", saveContact, success: true })
        res.json({ message: "Contact saved Successfully!", saveContact, success: true });
    } catch (err) {
        console.error("❌ newContact error:", err);
        res.status(500).json({ message: "Server error", success: false });
    }
};
77
// ✅ READ ALL  select get method url :-  http://localhost:3000/api/contact
export const getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    console.log({ essage: "All Contacts fetched", contacts, success: true })
    res.json({ message: "All Contacts fetched", contacts, success: true });
};


// ✅ READ SINGLE   select get method url :- http://localhost:3000/api/contact/690de5bbaadb3d10db8eab10
export const getContactById = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return res.json({ message: "No contact found", success: false });
    }
    console.log({ message: "Contact fetched", contact, success: true })
    res.json({ message: "Contact fetched", contact, success: true });
};

// ✅ UPDATE  select put  method url :-  http://localhost:3000/api/contact/690d915f713240710e2ccc4e
export const updateContactById = async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { name, email, phone, type }, { new: true });
    console.log({ message: "Contact updated", contact, success: true })
    res.json({ message: "Contact updated", contact, success: true });
};

// ✅ DELETE  select delete  method url :- http://localhost:3000/api/contact/690d93d0713240710e2ccc58
export const deleteContactById = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    console.log({ message: "Contact deleted", success: true })
    res.json({ message: "Contact deleted", success: true });
};
