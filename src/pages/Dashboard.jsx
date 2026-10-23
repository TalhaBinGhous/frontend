// import { useEffect,useState } from "react";

// function Dashboard(){
// const [contacts,setContacts]=useState([])
// const [loading,setloading]=useState(true);

// const getContacts=async()=>{
//    try {
//     const response=await fetch(
//         "http://localhost:5000/api/contact"
//     );
//     const data=await response.json();
//     setContacts(data);

//    } catch (error) {
//     console.log(error);
//    } finally{
//     setloading(false);
//    }
// };
// useEffect(()=>{
// getContacts();
// });

//     return(
// <div>
//     <h1 className="text-center mb-4" >Dashboard</h1>
//     {loading ?(
//         <p className="text-center">
//             Loading.....
//         </p>
//     ):(
//         <div className="table-responsive">

//             <table class="table">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Name</th>
//       <th scope="col">Email</th>
//       <th scope="col">Phone</th>
//             <th scope="col">Subject</th>
//                   <th scope="col">Message</th>
//     </tr>
//   </thead>
//   <tbody>

//     {contacts.map((contact) =>(

    
//     <tr key={(contact._id)}>
    
//      <td>{contact.fullname}</td>
//      <td>{contact.email}</td>
//      <td>{contact.phone}</td>
//      <td>{contact.subject}</td>
//      <td>{contact.message}</td>
//     </tr>
// ))}
//   </tbody>
// </table>
//         </div>
//     )

//     }
// </div>
//     );
// }

// export default Dashboard;



//     import { useEffect, useState } from "react";

//     function Dashboard() {
//         const [contacts, setContacts] = useState([]);
//         const [loading, setLoading] = useState(true);
//         const [error, setError] = useState("");

//         const getContacts = async () => {
//             try {
//                 const response = await fetch(
//                     "http://localhost:5000/api/contact"
//                 );

//                 // if (!response.ok) {
//                 //     throw new Error(
//                 //         `HTTP Error: ${response.status}`
//                 //     );
//                 // }

//                 const data = await response.json();

//                 console.log("API Response:", data);

//                 // Supports either an array or { contacts: [...] }
//                 const contactList = Array.isArray(data)
//                     ? data
//                     : data.contacts;

//                 if (!Array.isArray(contactList)) {
//                     throw new Error(
//                         "API did not return a contacts array."
//                     );
//                 }

//                 setContacts(contactList);
//             } catch (error) {
//                 console.error("Error fetching contacts:", error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const deleteContact=async(id)=>{
//             const confirmDelete=window.confirm("Are you sure do you want to delete");
//             if(!confirmDelete){
//                 return;
//             }
//             try {
//                 const response=await fetch(
//                     `http://localhost:5000/api/contact/${id}`,
//                     {
//                         method:"DELETE"
//                     }
//                 );

//                 const data=await response.json();
// if(response.ok){
//     alert(data.message);
//     getContacts();
// }else{
//     alert("failed to delete the data");
// }
//             } catch (error) {
//                 console.log(error);
//                 alert("something went wrong");
//             }
//         };



//         useEffect(() => {
//             getContacts();
//         }, []);

//         return (
//             <div className="container mt-4">
//                 <h1 className="text-center mb-4">
//                     Dashboard
//                 </h1>

//                 {loading ? (
//                     <p className="text-center">
//                         Loading...
//                     </p>
//                 ) : error ? (
//                     <p className="text-danger text-center">
//                         {error}
//                     </p>
//                 ) : contacts.length === 0 ? (
//                     <p className="text-center">
//                         No contacts found.
//                     </p>
//                 ) : (
//                     <div className="table-responsive">
//                         <table className="table table-bordered table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Phone</th>
//                                     <th>Subject</th>
//                                     <th>Message</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {contacts.map((contact, index) => (
//                                     <tr key={contact._id || index}>
//                                         <td>{index + 1}</td>
//                                         <td>
//                                             {contact.fullname ?? contact.name}
//                                         </td>
//                                         <td>{contact.email}</td>
//                                         <td>{contact.phone}</td>
//                                         <td>{contact.subject}</td>
//                                         <td>{contact.message}</td>
//                                         <td>
//                                             <button className="btn btn-danger btn-sm" onClick={()=> deleteContact(contact._id)} >Delete</button>
//                                         </td>
//                                          <td>
//                                             <button className="btn btn-sucess btn-sm" onClick={()=> deleteContact(contact._id)} >Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     export default Dashboard;


import { useEffect, useState } from "react";

function Dashboard() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [updating, setUpdating] = useState(false);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    // 1. Fetch all contacts
    const getContacts = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/contact"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch contacts.");
            }

            const data = await response.json();

            const contactList = Array.isArray(data)
                ? data
                : data.contacts;

            if (!Array.isArray(contactList)) {
                throw new Error("Contacts data is invalid.");
            }

            setContacts(contactList);
            setError("");
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 2. Delete a contact
    const deleteContact = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/contact/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete contact."
                );
            }

            alert(data.message || "Contact deleted successfully.");

            setContacts((previousContacts) =>
                previousContacts.filter(
                    (contact) => contact._id !== id
                )
            );
        } catch (error) {
            console.error("Delete error:", error);
            alert(error.message);
        }
    };

    // 3. Open the edit form
    const editContact = (contact) => {
        setSelectedContact(contact);

        setFormData({
            fullname: contact.fullname || contact.name || "",
            email: contact.email || "",
            phone: contact.phone || "",
            subject: contact.subject || "",
            message: contact.message || ""
        });
    };

    // 4. Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // 5. Update the contact
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!selectedContact) return;

        setUpdating(true);

        try {
            const response = await fetch(
                `http://localhost:5000/api/contact/${selectedContact._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update contact."
                );
            }

            // Update the row without refreshing the page
            setContacts((previousContacts) =>
                previousContacts.map((contact) =>
                    contact._id === selectedContact._id
                        ? data.contact
                        : contact
                )
            );

            alert(data.message || "Contact updated successfully.");

            setSelectedContact(null);
        } catch (error) {
            console.error("Update error:", error);
            alert(error.message);
        } finally {
            setUpdating(false);
        }
    };

    // 6. Fetch contacts when the component loads
    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className="container mt-4 mb-5">
            <h1 className="text-center mb-4">
                Contact Dashboard
            </h1>

            {/* Edit Form */}
            {selectedContact && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Edit Contact</h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleUpdate}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">
                                        Message
                                    </label>

                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success me-2"
                                disabled={updating}
                            >
                                {updating
                                    ? "Updating..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    setSelectedContact(null)
                                }
                                disabled={updating}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Loading, Error and Contacts Table */}
            {loading ? (
                <p className="text-center">Loading contacts...</p>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : contacts.length === 0 ? (
                <div className="alert alert-info text-center">
                    No contacts found.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr key={contact._id}>
                                    <td>{index + 1}</td>

                                    <td>
                                        {contact.fullname || contact.name}
                                    </td>

                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.subject}</td>
                                    <td>{contact.message}</td>

                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    editContact(contact)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteContact(
                                                        contact._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
