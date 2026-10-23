// import { useState } from "react";

// function Contact(){
//    const [formData,setFormData]=useState({
// fullName:"", email:"", phone:"",subject:"",message:""
//    });
   
// const handlechange=(e)=>{
// setFormData({
// ...formData,
// [e.target.name]:e.target.value
// });
// };
// const handleSubmit=(e)=>{
// e.preventDefault();
// console.log(formData);
// alert("for has been submitted")

// };


//    return(
// <div>
//     <h1 className="text-center mb-3" > Contact US</h1>
//     <p className="text-center mb-4">Do you have any question so contact us </p>

// <div className="row justify-content-center " >
// <div className="col-md-8">
// <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//     <label for="" className="form-label">Full name</label>
//     <input type="text" name="fullname" className="form-control" value={formData.fullName} onChange={handlechange}  />
//   </div>
//     <div className="mb-3">
//     <label for="" className="form-label">Email</label>
//     <input type="text" name="email" className="form-control" value={formData.email} onChange={handlechange}  required />
//   </div>

//     <div className="mb-3">
//     <label for="" className="form-label">Phone</label>
//     <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handlechange}  required />
//   </div>
//     <div className="mb-3">
//     <label for="" className="form-label">Subject</label>
//     <input type="text" name="subject" className="form-control" value={formData.subject} onChange={handlechange}  required />
//   </div>
//   <div className="mb-3">
//     <label for="" className="form-label">Message</label>
//     <input type="text" name="message" className="form-control" value={formData.message} onChange={handlechange}  required />
//   </div>
// </form>
//  <button type="submit" className="btn btn-primary">Submit</button>  
// </div>

// </div>

 
// </div>
//     );
// }

// export default Contact;

import { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to submit form"
                );
            }

            alert("Contact form submitted successfully!");

            setFormData({
                fullname: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });

        } catch (error) {
            console.error("Submission error:", error);
            alert(error.message || "Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h1 className="text-center mb-3">
                Contact Us
            </h1>

            <p className="text-center mb-4">
                Do you have any questions? Contact us.
            </p>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="fullname"
                                className="form-label"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                className="form-control"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="phone"
                                className="form-label"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="subject"
                                className="form-label"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="form-control"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="message"
                                className="form-label"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-control"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;